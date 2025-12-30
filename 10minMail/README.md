# 10 Minute Mail - Temporary Disposable Email

A modern, browser-based temporary email service that allows users to receive emails without registration.

## Features

- **Temporary Email Generation**: Instantly creates a disposable email address
- **Flexible Duration Options**: Choose between 10, 15, or 30-minute validity periods
- **Real-time Inbox**: Automatically checks for new emails every 5 seconds
- **Email Viewer**: Click on any email to view its full content
- **Copy to Clipboard**: One-click copy of email address
- **Countdown Timer**: Visual timer showing remaining time
- **Refresh Email**: Generate a new email address anytime
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use

### Option 1: Using Local Web Server (Recommended)

The app requires a web server to avoid CORS issues. Choose one of these methods:

**Using Python (if installed):**
```bash
python server.py
```
Then open: http://localhost:8000

**Using Node.js (if installed):**
```bash
node server.js
```
Then open: http://localhost:8000

**Using Python's built-in server:**
```bash
python -m http.server 8000
```
Then open: http://localhost:8000

**Using VS Code Live Server:**
- Install "Live Server" extension in VS Code
- Right-click on `index.html` and select "Open with Live Server"

### Option 2: Direct File Open (Limited Functionality)

You can open `index.html` directly in your browser, but you may encounter CORS errors. The app will still work with fallback email addresses, but API features may be limited.

2. **Get Your Email Address**
   - A temporary email address is automatically generated when you open the app
   - Copy it using the "Copy" button

3. **Choose Duration**
   - Select 10, 15, or 30 minutes for how long the email should remain active
   - Default is 10 minutes

4. **Receive Emails**
   - Use the temporary email address for registrations, verifications, etc.
   - Emails will appear in the inbox automatically
   - Click on any email to read its full content

5. **Refresh Email**
   - Click "New Email" to generate a fresh email address
   - This resets the timer and clears the inbox

## Technical Details

- **Frontend Only**: Pure HTML, CSS, and JavaScript (no backend required)
- **API**: Uses the free 1secmail.com API service
- **No Data Storage**: All data is temporary and browser-based
- **Auto-refresh**: Inbox checks for new emails every 5 seconds

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Privacy & Security

- All emails are temporary and automatically deleted after expiration
- No personal information is collected or stored
- Emails are fetched directly from the API provider
- Use only for temporary purposes (not for sensitive information)

## Files

- `index.html` - Main application structure
- `script.js` - Application logic and API integration
- `style.css` - Styling and responsive design
- `README.md` - This file

## Use Cases

- Testing email functionality in applications
- Signing up for services without exposing real email
- Receiving one-time verification codes
- Temporary communications
- Avoiding spam in your primary inbox

## Limitations

- Emails cannot be sent from temporary addresses (receive only)
- All emails are deleted after expiration
- No email history or recovery after expiration
- Depends on third-party API availability

## Credits

Built using the 1secmail.com free temporary email API.
