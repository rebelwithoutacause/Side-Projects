// Configuration
const API_BASE = 'https://api.mail.gw';
// Fallback provider used when mail.gw is unreachable. Guerrilla Mail's API sends
// Access-Control-Allow-Origin: * (verified), unlike some other "public" temp-mail
// APIs which look reachable with curl but silently block browser fetches via CORS.
const FALLBACK_API_BASE = 'https://api.guerrillamail.com/ajax.php';
const BOOT_LINES = [
    '> booting secure_mail_protocol...',
    '> establishing anonymous connection...',
    '> generating disposable identity...',
    '> ready.'
];
let currentEmail = '';
let currentDomain = '';
let currentPassword = '';
let authToken = '';
let currentProvider = 'mailgw'; // 'mailgw' or 'guerrilla'
let sidToken = ''; // guerrilla mail session token
let timerInterval = null;
let expirationTime = null;
let checkEmailsInterval = null;
let selectedDuration = 10; // Default 10 minutes
let seenEmailIds = new Set();
let readEmailIds = new Set();

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    Promise.all([playBootSequence(), initializeApp()]).then(hideBootScreen);
});

async function initializeApp() {
    await generateNewEmail();
    startTimer(selectedDuration);
    startEmailChecking();
}

// Type out the boot lines, then resolve once the sequence has finished
function playBootSequence() {
    const bootTextEl = document.getElementById('bootText');
    if (!bootTextEl) return Promise.resolve();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return new Promise(resolve => {
        if (reduced) {
            bootTextEl.textContent = BOOT_LINES.join('\n');
            setTimeout(resolve, 400);
            return;
        }

        let lineIndex = 0;
        let charIndex = 0;
        let display = '';

        function typeNext() {
            if (lineIndex >= BOOT_LINES.length) {
                setTimeout(resolve, 500);
                return;
            }

            const line = BOOT_LINES[lineIndex];

            if (charIndex < line.length) {
                display += line[charIndex];
                bootTextEl.textContent = display;
                charIndex++;
                setTimeout(typeNext, 18 + Math.random() * 22);
            } else {
                display += '\n';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeNext, 220);
            }
        }

        typeNext();
    });
}

function hideBootScreen() {
    const bootScreenEl = document.getElementById('bootScreen');
    if (!bootScreenEl) return;

    bootScreenEl.classList.add('boot-hidden');
    setTimeout(() => {
        bootScreenEl.style.display = 'none';
    }, 500);
}

function setupEventListeners() {
    // Copy email button
    document.getElementById('copyBtn').addEventListener('click', copyEmail);

    // Refresh email button
    document.getElementById('refreshBtn').addEventListener('click', async () => {
        await generateNewEmail();
        resetTimer();
    });

    // Refresh inbox button
    document.getElementById('refreshInboxBtn').addEventListener('click', checkEmails);

    // Duration buttons
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            selectedDuration = parseInt(e.target.dataset.minutes);
            resetTimer();
        });
    });

    // Modal close
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('emailModal').addEventListener('click', (e) => {
        if (e.target.id === 'emailModal') closeModal();
    });
}

// Generate random email
async function generateNewEmail() {
    authToken = '';
    sidToken = '';

    if (await generateNewEmailViaMailGw()) {
        currentProvider = 'mailgw';
    } else if (await generateNewEmailViaGuerrilla()) {
        currentProvider = 'guerrilla';
        console.warn('mail.gw unavailable, fell back to Guerrilla Mail');
    } else {
        console.error('Error generating email: all providers unavailable');
        showNotification('Error generating email. Check console for details.', 'error');

        // Last resort: show a placeholder address (inbox checks are skipped without a live provider)
        currentProvider = 'none';
        const username = generateRandomString(10);
        currentEmail = `${username}@unavailable.invalid`;
        document.getElementById('emailAddress').value = currentEmail;
        return;
    }

    document.getElementById('emailAddress').value = currentEmail;
    showNotification('New email address generated!', 'success');
    resetInboxUi();
}

// Primary provider: mail.gw. Returns true on success, false if it should fall back.
async function generateNewEmailViaMailGw() {
    try {
        // Get available domains
        const domainsResponse = await fetch(`${API_BASE}/domains`);

        if (!domainsResponse.ok) {
            throw new Error(`HTTP error! status: ${domainsResponse.status}`);
        }

        const domainsData = await domainsResponse.json();
        const domains = (domainsData['hydra:member'] || [])
            .filter(d => d.isActive)
            .map(d => d.domain);

        if (!domains || domains.length === 0) {
            throw new Error('No domains available');
        }

        const username = generateRandomString(10);
        currentDomain = domains[Math.floor(Math.random() * domains.length)];
        currentEmail = `${username}@${currentDomain}`;
        currentPassword = generateRandomString(20);

        // Register the mailbox
        const accountResponse = await fetch(`${API_BASE}/accounts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: currentEmail, password: currentPassword })
        });

        if (!accountResponse.ok) {
            throw new Error(`Account creation failed! status: ${accountResponse.status}`);
        }

        // Log in to get an access token for reading the inbox
        const tokenResponse = await fetch(`${API_BASE}/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: currentEmail, password: currentPassword })
        });

        if (!tokenResponse.ok) {
            throw new Error(`Login failed! status: ${tokenResponse.status}`);
        }

        const tokenData = await tokenResponse.json();
        authToken = tokenData.token;

        return true;
    } catch (error) {
        console.error('mail.gw error generating email:', error);
        return false;
    }
}

// Fallback provider: Guerrilla Mail. No signup/login step - the server assigns
// an address immediately and hands back a sid_token used for all later requests.
async function generateNewEmailViaGuerrilla() {
    try {
        const response = await fetch(`${FALLBACK_API_BASE}?f=get_email_address`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.email_addr || !data.sid_token) {
            throw new Error('Invalid response from Guerrilla Mail');
        }

        currentEmail = data.email_addr;
        currentDomain = data.email_addr.split('@')[1] || '';
        sidToken = data.sid_token;

        return true;
    } catch (error) {
        console.error('Guerrilla Mail error generating email:', error);
        return false;
    }
}

function resetInboxUi() {
    // Reset inbox tracking for the new mailbox
    seenEmailIds = new Set();
    readEmailIds = new Set();

    // Clear inbox
    document.getElementById('emailList').innerHTML = `
        <div class="empty-inbox">
            <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
            </svg>
            <p>No emails yet</p>
            <small>Emails will appear here when received</small>
        </div>
    `;
}

function generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Timer functionality
function startTimer(minutes) {
    expirationTime = Date.now() + (minutes * 60 * 1000);
    updateTimerDisplay();

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const remaining = expirationTime - Date.now();

        if (remaining <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').textContent = '00:00';
            showNotification('Email expired! Generate a new one.', 'warning');
            stopEmailChecking();
        } else {
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const remaining = Math.max(0, expirationTime - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    document.getElementById('timer').textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resetTimer() {
    startTimer(selectedDuration);
}

// Copy email to clipboard
async function copyEmail() {
    const emailInput = document.getElementById('emailAddress');

    try {
        await navigator.clipboard.writeText(emailInput.value);
        showNotification('Email copied to clipboard!', 'success');

        // Visual feedback
        const btn = document.getElementById('copyBtn');
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1000);
    } catch (error) {
        // Fallback for older browsers
        emailInput.select();
        document.execCommand('copy');
        showNotification('Email copied to clipboard!', 'success');
    }
}

// Check for emails
async function checkEmails() {
    if (!currentEmail) return;

    try {
        const emails = currentProvider === 'guerrilla'
            ? await fetchMessagesGuerrilla()
            : await fetchMessagesMailGw();

        if (emails && emails.length > 0) {
            displayEmails(emails);
        }
    } catch (error) {
        console.error('Error checking emails:', error);
    }
}

async function fetchMessagesMailGw() {
    if (!authToken) return [];

    const response = await fetch(`${API_BASE}/messages`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return (data['hydra:member'] || []).map(m => ({
        id: m.id,
        from: (m.from && m.from.address) || 'unknown sender',
        subject: m.subject,
        date: m.createdAt
    }));
}

async function fetchMessagesGuerrilla() {
    if (!sidToken) return [];

    const response = await fetch(`${FALLBACK_API_BASE}?f=check_email&seq=0&sid_token=${encodeURIComponent(sidToken)}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return (data.list || []).map(m => ({
        id: m.mail_id,
        from: m.mail_from || 'unknown sender',
        subject: m.mail_subject,
        date: m.mail_timestamp ? m.mail_timestamp * 1000 : Date.now()
    }));
}

function displayEmails(emails) {
    const emailList = document.getElementById('emailList');

    if (emails.length === 0) return;

    // Track which of these messages weren't in the inbox on the last check
    const arrivedIds = new Set(
        emails.map(email => email.id).filter(id => !seenEmailIds.has(id))
    );
    arrivedIds.forEach(id => seenEmailIds.add(id));

    emailList.innerHTML = emails.map(email => {
        const classes = ['email-item'];
        if (arrivedIds.has(email.id)) classes.push('email-item--new');
        if (!readEmailIds.has(email.id)) classes.push('email-item--unread');

        return `
        <div class="${classes.join(' ')}" data-id="${email.id}">
            <div class="email-header">
                <strong>${escapeHtml(email.from)}</strong>
                <span class="email-date">${formatDate(email.date)}</span>
            </div>
            <div class="email-subject">${escapeHtml(email.subject) || '(No Subject)'}</div>
        </div>
    `;
    }).join('');

    // Add click listeners
    emailList.querySelectorAll('.email-item').forEach(item => {
        item.addEventListener('click', () => {
            const emailId = item.dataset.id;
            readEmailIds.add(emailId);
            item.classList.remove('email-item--unread', 'email-item--new');
            openEmail(emailId);
        });
    });
}

async function openEmail(emailId) {
    if (!currentEmail) return;

    try {
        const email = currentProvider === 'guerrilla'
            ? await fetchMessageGuerrilla(emailId)
            : await fetchMessageMailGw(emailId);

        if (!email) return;

        document.getElementById('modalSubject').textContent = email.subject || '(No Subject)';
        document.getElementById('modalFrom').textContent = email.from;
        document.getElementById('modalDate').textContent = formatDate(email.date);

        // Display email body (prefer HTML, fallback to text)
        const bodyContent = email.html || email.text || 'No content';
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = email.html
            ? sanitizeHtml(email.html)
            : `<pre>${escapeHtml(bodyContent)}</pre>`;

        // Shrink the font for long messages so they're easier to scan
        const LONG_MESSAGE_THRESHOLD = 1200;
        modalBody.classList.toggle('email-body--long', bodyContent.length > LONG_MESSAGE_THRESHOLD);

        document.getElementById('emailModal').style.display = 'flex';
    } catch (error) {
        console.error('Error opening email:', error);
        showNotification('Error loading email', 'error');
    }
}

async function fetchMessageMailGw(emailId) {
    if (!authToken) return null;

    const response = await fetch(`${API_BASE}/messages/${emailId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const email = await response.json();
    const htmlBody = Array.isArray(email.html) ? email.html.join('') : email.html;

    return {
        subject: email.subject,
        from: (email.from && email.from.address) || 'unknown sender',
        date: email.createdAt,
        html: htmlBody,
        text: email.text
    };
}

async function fetchMessageGuerrilla(emailId) {
    if (!sidToken) return null;

    const response = await fetch(
        `${FALLBACK_API_BASE}?f=fetch_email&email_id=${encodeURIComponent(emailId)}&sid_token=${encodeURIComponent(sidToken)}`
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const email = await response.json();

    return {
        subject: email.mail_subject,
        from: email.mail_from || 'unknown sender',
        date: email.mail_timestamp ? email.mail_timestamp * 1000 : Date.now(),
        html: email.mail_body,
        text: null
    };
}

function closeModal() {
    document.getElementById('emailModal').style.display = 'none';
}

// Auto-check emails
function startEmailChecking() {
    checkEmails(); // Check immediately

    if (checkEmailsInterval) clearInterval(checkEmailsInterval);

    checkEmailsInterval = setInterval(() => {
        checkEmails();
    }, 5000); // Check every 5 seconds
}

function stopEmailChecking() {
    if (checkEmailsInterval) {
        clearInterval(checkEmailsInterval);
        checkEmailsInterval = null;
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;

    return date.toLocaleString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sanitizeHtml(html) {
    // Basic sanitization - remove scripts and dangerous attributes
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Remove script tags
    temp.querySelectorAll('script').forEach(el => el.remove());

    // Remove event handlers
    temp.querySelectorAll('*').forEach(el => {
        Array.from(el.attributes).forEach(attr => {
            if (attr.name.startsWith('on')) {
                el.removeAttribute(attr.name);
            }
        });
    });

    return temp.innerHTML;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
