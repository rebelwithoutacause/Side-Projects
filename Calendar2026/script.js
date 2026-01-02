// Retro QA Calendar 2026 - JavaScript

const qaQuotes = {
    0: "January: 'It works on my machine!' - The eternal QA mantra",
    1: "February: 'Love is temporary, but bugs are forever (unless we fix them)'",
    2: "March: 'In like a lamb, out like a critical production bug'",
    3: "April: 'April Fools! That wasn't a joke, it was a real bug'",
    4: "May: 'May your tests be green and your deployments smooth'",
    5: "June: 'Summer of QA - Sun's out, Bugs out!'",
    6: "July: 'Independence Day from bugs (we wish!)'",
    7: "August: 'Hot weather, hotter bug reports'",
    8: "September: 'Back to testing! New season, same old regression bugs'",
    9: "October: 'The only scary thing should be Halloween, not your test results'",
    10: "November: 'Thankful for... automated tests that actually work'",
    11: "December: 'All I want for Christmas is... zero bugs in production'"
};

// Bulgarian Holidays for 2026
const qaEvents = {
    // January
    '2026-01-01': 'New Year',

    // March
    '2026-03-03': 'Liberation',

    // April - Easter (Orthodox)
    '2026-04-10': 'Good Friday',
    '2026-04-12': 'Easter',
    '2026-04-13': 'Easter Mon',

    // May
    '2026-05-01': 'Labour Day',
    '2026-05-06': 'St. George\'s',
    '2026-05-24': 'Education Day',

    // September
    '2026-09-06': 'Unity Day',
    '2026-09-22': 'Indep. Day',

    // December
    '2026-12-24': 'Christmas Eve',
    '2026-12-25': 'Christmas',
    '2026-12-26': 'Christmas'
};

let currentMonth = 0; // January 2026
const currentYear = 2026;
let currentSelectedDate = null;
let showNumbering = false;

// Storage helper functions
function getNotesForDate(dateKey) {
    const notesData = localStorage.getItem(`notes_${dateKey}`);
    return notesData ? JSON.parse(notesData) : [];
}

function saveNotesForDate(dateKey, notes) {
    localStorage.setItem(`notes_${dateKey}`, JSON.stringify(notes));
}

function getAttachmentsForDate(dateKey) {
    const attachmentsData = localStorage.getItem(`attachments_${dateKey}`);
    return attachmentsData ? JSON.parse(attachmentsData) : [];
}

function saveAttachmentsForDate(dateKey, attachments) {
    localStorage.setItem(`attachments_${dateKey}`, JSON.stringify(attachments));
}

function hasNotes(dateKey) {
    const notes = getNotesForDate(dateKey);
    const attachments = getAttachmentsForDate(dateKey);
    return notes.length > 0 || attachments.length > 0;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️', 'bmp': '🖼️',
        'pdf': '📄', 'doc': '📝', 'docx': '📝',
        'xls': '📊', 'xlsx': '📊',
        'txt': '📃'
    };
    return icons[ext] || '📎';
}

function generateYearView(year) {
    const yearView = document.getElementById('yearView');
    yearView.innerHTML = '';

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Generate all 12 months
    for (let month = 0; month < 12; month++) {
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';

        // Month header
        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.textContent = monthNames[month].toUpperCase();
        monthContainer.appendChild(monthHeader);

        // Calendar grid for this month
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid-compact';

        // Add day headers
        const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        dayNames.forEach(day => {
            const header = document.createElement('div');
            header.className = 'day-header-compact';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Get first day of month and number of days
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get today's date for highlighting
        const today = new Date();
        const isCurrentMonth = (today.getMonth() === month && today.getFullYear() === year);
        const todayDate = today.getDate();

        // Add empty cells for days before the month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell-compact empty-cell';
            calendarGrid.appendChild(emptyCell);
        }

        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isWeekend = (date.getDay() === 0 || date.getDay() === 6);
            const isToday = (isCurrentMonth && day === todayDate);
            const dayCell = createDayCell(day, false, isWeekend, month, year, true);

            if (isToday) {
                dayCell.classList.add('today');
            }

            // Add QA events
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (qaEvents[dateString]) {
                dayCell.classList.add('holiday');
                dayCell.title = qaEvents[dateString]; // Add tooltip
            }

            calendarGrid.appendChild(dayCell);
        }

        monthContainer.appendChild(calendarGrid);
        yearView.appendChild(monthContainer);
    }
}

function createDayCell(dayNumber, isOtherMonth, isWeekend, month, year, isCompact = false) {
    const cell = document.createElement('div');
    cell.className = isCompact ? 'day-cell-compact' : 'day-cell';

    if (isOtherMonth) {
        cell.classList.add('other-month');
    }
    if (isWeekend && !isOtherMonth) {
        cell.classList.add('weekend');
    }

    if (!isOtherMonth) {
        // Create unique key for this date
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;

        // Add note and attachment indicators
        const notes = getNotesForDate(dateKey);
        const attachments = getAttachmentsForDate(dateKey);

        if (isCompact) {
            // For compact view, just show the day number
            cell.textContent = dayNumber;

            // Add has-notes class for indicator dot
            if (notes.length > 0 || attachments.length > 0) {
                cell.classList.add('has-notes');
            }

            // Add click event to open modal
            cell.addEventListener('click', () => {
                openNoteModal(dateKey, dayNumber, month, year);
            });

            return cell;
        }

        // Regular (non-compact) view below
        const dayNum = document.createElement('div');
        dayNum.className = 'day-number';
        dayNum.textContent = dayNumber;
        cell.appendChild(dayNum);

        if (notes.length > 0 || attachments.length > 0) {
            const indicator = document.createElement('div');
            indicator.className = 'note-indicator';
            cell.appendChild(indicator);
        }

        // Add preview container
        const preview = document.createElement('div');
        preview.className = 'note-preview';

        // Add note previews
        if (notes.length > 0) {
            notes.slice(0, 2).forEach(note => {
                const noteItem = document.createElement('div');
                noteItem.className = 'preview-item';
                if (note.completed) {
                    noteItem.classList.add('completed');
                }
                noteItem.textContent = note.text;
                preview.appendChild(noteItem);
            });

            if (notes.length > 2) {
                const more = document.createElement('div');
                more.className = 'preview-more';
                more.textContent = `+${notes.length - 2} more notes`;
                preview.appendChild(more);
            }
        }

        // Add attachment previews
        if (attachments.length > 0) {
            const attachmentPreview = document.createElement('div');
            attachmentPreview.className = 'attachment-preview-cell';

            attachments.slice(0, 2).forEach(attachment => {
                const attachItem = document.createElement('div');
                attachItem.className = 'preview-attachment-item';

                if (attachment.type.startsWith('image/')) {
                    const imgThumb = document.createElement('img');
                    imgThumb.className = 'preview-attachment-thumb';
                    imgThumb.src = attachment.data;
                    imgThumb.alt = attachment.name;
                    attachItem.appendChild(imgThumb);
                } else {
                    const icon = document.createElement('span');
                    icon.className = 'preview-attachment-icon';
                    icon.textContent = getFileIcon(attachment.name);
                    attachItem.appendChild(icon);
                }

                const fileName = document.createElement('span');
                fileName.className = 'preview-attachment-name';
                fileName.textContent = attachment.name;
                attachItem.appendChild(fileName);

                attachmentPreview.appendChild(attachItem);
            });

            if (attachments.length > 2) {
                const moreAttach = document.createElement('div');
                moreAttach.className = 'preview-more';
                moreAttach.textContent = `+${attachments.length - 2} more files`;
                attachmentPreview.appendChild(moreAttach);
            }

            preview.appendChild(attachmentPreview);
        }

        if (notes.length > 0 || attachments.length > 0) {
            cell.appendChild(preview);
        }

        // Add click event to open modal
        cell.addEventListener('click', () => {
            openNoteModal(dateKey, dayNumber, month, year);
        });
    }

    return cell;
}

function openNoteModal(dateKey, day, month, year) {
    currentSelectedDate = dateKey;

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const modal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = `Notes for ${monthNames[month]} ${day}, ${year}`;

    // Restore numbering preference
    const numberingCheckbox = document.getElementById('showNumbering');
    numberingCheckbox.checked = showNumbering;

    renderNotesList(dateKey);
    renderAttachmentsList(dateKey);
    modal.classList.add('active');

    // Focus on input
    document.getElementById('newNoteInput').focus();
}

function closeNoteModal() {
    const modal = document.getElementById('noteModal');
    modal.classList.remove('active');
    document.getElementById('newNoteInput').value = '';
    currentSelectedDate = null;

    // Refresh calendar to update indicators
    generateYearView(currentYear);
}

function renderNotesList(dateKey) {
    const notesList = document.getElementById('notesList');
    const notes = getNotesForDate(dateKey);

    if (notes.length === 0) {
        notesList.innerHTML = '<div class="empty-state">No notes yet. Add one above!</div>';
        return;
    }

    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        if (note.completed) {
            noteItem.classList.add('completed');
        }

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'note-checkbox';
        checkbox.checked = note.completed;
        checkbox.addEventListener('change', () => {
            toggleNoteCompletion(dateKey, index);
        });

        // Number (if enabled)
        if (showNumbering) {
            const noteNumber = document.createElement('span');
            noteNumber.className = 'note-number';
            noteNumber.textContent = `${index + 1}.`;
            noteItem.appendChild(noteNumber);
        }

        // Note text
        const noteText = document.createElement('span');
        noteText.className = 'note-text';
        noteText.textContent = note.text;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'note-delete';
        deleteBtn.textContent = 'DEL';
        deleteBtn.addEventListener('click', () => {
            deleteNote(dateKey, index);
        });

        noteItem.appendChild(checkbox);
        noteItem.appendChild(noteText);
        noteItem.appendChild(deleteBtn);
        notesList.appendChild(noteItem);
    });
}

function renderAttachmentsList(dateKey) {
    const attachmentsList = document.getElementById('attachmentsList');
    const attachments = getAttachmentsForDate(dateKey);

    if (attachments.length === 0) {
        attachmentsList.innerHTML = '';
        attachmentsList.style.display = 'none';
        return;
    }

    attachmentsList.style.display = 'block';
    attachmentsList.innerHTML = '<h4>📎 Attachments</h4>';

    attachments.forEach((attachment, index) => {
        const attachmentItem = document.createElement('div');
        attachmentItem.className = 'attachment-item';

        // Show preview for images
        if (attachment.type.startsWith('image/')) {
            const preview = document.createElement('img');
            preview.className = 'attachment-preview';
            preview.src = attachment.data;
            preview.alt = attachment.name;
            preview.addEventListener('click', () => {
                showImagePreview(attachment.data);
            });
            attachmentItem.appendChild(preview);
        } else {
            const icon = document.createElement('span');
            icon.className = 'attachment-icon';
            icon.textContent = getFileIcon(attachment.name);
            attachmentItem.appendChild(icon);
        }

        // Attachment info
        const info = document.createElement('div');
        info.className = 'attachment-info';

        const name = document.createElement('div');
        name.className = 'attachment-name';
        name.textContent = attachment.name;

        const size = document.createElement('div');
        size.className = 'attachment-size';
        size.textContent = formatFileSize(attachment.size);

        info.appendChild(name);
        info.appendChild(size);
        attachmentItem.appendChild(info);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'attachment-delete';
        deleteBtn.textContent = 'DEL';
        deleteBtn.addEventListener('click', () => {
            deleteAttachment(dateKey, index);
        });

        attachmentItem.appendChild(deleteBtn);
        attachmentsList.appendChild(attachmentItem);
    });
}

function showImagePreview(imageSrc) {
    const imageModal = document.getElementById('imageModal');
    const imageModalImg = document.getElementById('imageModalImg');
    imageModalImg.src = imageSrc;
    imageModal.classList.add('active');
}

function addAttachment(dateKey, file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const attachments = getAttachmentsForDate(dateKey);
        attachments.push({
            name: file.name,
            type: file.type,
            size: file.size,
            data: e.target.result,
            uploadedAt: new Date().toISOString()
        });
        saveAttachmentsForDate(dateKey, attachments);
        renderAttachmentsList(dateKey);
        // Refresh calendar to show indicator
        generateCalendar(currentMonth, currentYear);
    };
    reader.readAsDataURL(file);
}

function deleteAttachment(dateKey, index) {
    const attachments = getAttachmentsForDate(dateKey);
    attachments.splice(index, 1);
    saveAttachmentsForDate(dateKey, attachments);
    renderAttachmentsList(dateKey);
    // Refresh calendar to update indicator
    generateCalendar(currentMonth, currentYear);
}

function addNote(dateKey, text) {
    if (!text.trim()) return;

    const notes = getNotesForDate(dateKey);
    notes.push({
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    });
    saveNotesForDate(dateKey, notes);
    renderNotesList(dateKey);
}

function toggleNoteCompletion(dateKey, index) {
    const notes = getNotesForDate(dateKey);
    if (notes[index]) {
        notes[index].completed = !notes[index].completed;
        saveNotesForDate(dateKey, notes);
        renderNotesList(dateKey);
    }
}

function deleteNote(dateKey, index) {
    const notes = getNotesForDate(dateKey);
    notes.splice(index, 1);
    saveNotesForDate(dateKey, notes);
    renderNotesList(dateKey);
}

// Initialize calendar
document.addEventListener('DOMContentLoaded', () => {
    // Generate full year view
    generateYearView(currentYear);

    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeNoteModal);
    document.getElementById('addNoteBtn').addEventListener('click', () => {
        const input = document.getElementById('newNoteInput');
        if (currentSelectedDate && input.value.trim()) {
            addNote(currentSelectedDate, input.value);
            input.value = '';
            input.focus();
        }
    });

    // Add note on Enter key
    document.getElementById('newNoteInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('addNoteBtn').click();
        }
    });

    // Close modal on outside click
    document.getElementById('noteModal').addEventListener('click', (e) => {
        if (e.target.id === 'noteModal') {
            closeNoteModal();
        }
    });

    // File upload functionality
    document.getElementById('uploadFileBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0 && currentSelectedDate) {
            Array.from(files).forEach(file => {
                addAttachment(currentSelectedDate, file);
            });
            e.target.value = ''; // Reset file input
        }
    });

    // Numbering checkbox
    document.getElementById('showNumbering').addEventListener('change', (e) => {
        showNumbering = e.target.checked;
        if (currentSelectedDate) {
            renderNotesList(currentSelectedDate);
        }
    });

    // Image modal close
    document.getElementById('imageModalClose').addEventListener('click', () => {
        document.getElementById('imageModal').classList.remove('active');
    });

    document.getElementById('imageModal').addEventListener('click', (e) => {
        if (e.target.id === 'imageModal') {
            document.getElementById('imageModal').classList.remove('active');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('noteModal');
        const imageModal = document.getElementById('imageModal');
        const isModalOpen = modal.classList.contains('active');
        const isImageModalOpen = imageModal.classList.contains('active');

        if (isImageModalOpen && e.key === 'Escape') {
            imageModal.classList.remove('active');
        } else if (isModalOpen && e.key === 'Escape') {
            closeNoteModal();
        } else if (!isModalOpen) {
            if (e.key === 'ArrowRight') {
                nextMonth();
            } else if (e.key === 'ArrowLeft') {
                prevMonth();
            }
        }
    });
});
