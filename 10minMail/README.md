# 10 Minute Mail - Anonymous Temporary Email System

A retro-themed, browser-based temporary email service with a vintage hacker aesthetic. Receive emails instantly without registration using disposable email addresses.

## Features

- **Instant Email Generation**: Automatically creates a random disposable email address
- **10-Minute Validity**: Fixed 10-minute duration for each email session
- **Real-time Inbox**: Automatically checks for new emails every 5 seconds
- **Email Viewer**: Click any email to view full content in a modal window
- **Copy to Clipboard**: One-click email address copying
- **Countdown Timer**: Visual countdown showing time remaining
- **Refresh Email**: Generate new email addresses on demand
- **Retro Hacker Theme**: Matrix green terminal aesthetic with CRT effects
- **Anonymous Mask Background**: Vintage anonymous hacker styling
- **Fully Responsive**: Works on desktop, tablet, and mobile devices

## Quick Start

### Windows Users (Easiest Method)
1. Double-click `START_SERVER.bat`
2. Open your browser to http://localhost:8000

### Using Python
```bash
python server.py
```
Then navigate to: http://localhost:8000

### Using Node.js
```bash
node server.js
```
Then navigate to: http://localhost:8000

## How to Use

1. **Launch the Server**
   - Use one of the methods above to start the local web server
   - The app requires a server to avoid CORS issues

2. **Get Your Email Address**
   - A temporary email address is automatically generated
   - Click "Copy" to copy it to clipboard

3. **Receive Emails**
   - Use the email for registrations, verifications, etc.
   - Emails appear automatically in the inbox
   - Click any email to read the full content

4. **Generate New Email**
   - Click "Refresh" button to create a new email address
   - This resets the 10-minute timer and clears the inbox

## Design Theme

The application features a retro/vintage hacker aesthetic:
- **Matrix Green (#00ff41)**: Primary color for text and borders
- **Cyan Accents (#00d4ff)**: Secondary highlights
- **Terminal Font**: Courier New monospace
- **CRT Effects**: Screen flicker and scanline animations
- **Anonymous Mask**: Background image in empty inbox state
- **Square Borders**: No rounded corners for authentic terminal look

## Technical Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **No Backend Required**: Client-side only application
- **API**: 1secmail.com free temporary email service
- **Local Server**: Python HTTP server or Node.js Express
- **No Database**: All data is temporary and browser-based

## File Structure

```
10minMail/
├── index.html              # Main application interface
├── style.css               # Retro hacker theme styling
├── script.js               # Email functionality and API integration
├── server.py               # Python HTTP server
├── server.js               # Node.js HTTP server
├── START_SERVER.bat        # Windows quick start script
├── anon_.jpg               # Anonymous mask background image
├── README.md               # This documentation
├── QUICKSTART.txt          # Quick reference guide
├── TROUBLESHOOTING.md      # Common issues and solutions
└── .gitignore              # Git ignore rules
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Privacy & Security

- **No Registration**: No personal information required
- **Temporary Only**: All emails auto-delete after 10 minutes
- **No Data Storage**: Nothing is saved or logged locally
- **Direct API Calls**: Emails fetched directly from API provider
- **Not for Sensitive Data**: Use only for temporary, non-sensitive purposes

## Use Cases

- Testing email functionality during development
- Signing up for services without exposing real email
- Receiving one-time verification codes
- Avoiding spam in your primary inbox
- Temporary account registrations
- Quick email verification testing

## Limitations

- **Receive Only**: Cannot send emails from temporary addresses
- **10 Minutes Only**: Fixed duration, no extension possible
- **Auto-Delete**: All emails deleted after expiration
- **No Recovery**: No email history after expiration
- **API Dependent**: Relies on 1secmail.com availability
- **Public**: Emails are not private or secure

## Troubleshooting

Common issues and solutions can be found in `TROUBLESHOOTING.md`.

Quick fixes:
- **CORS Errors**: Always run from a web server, not by opening HTML directly
- **No Emails**: Check browser console for API errors
- **Server Won't Start**: Ensure port 8000 is not already in use
- **Python Not Found**: Install Python 3.x from python.org

## Credits

- **API Service**: 1secmail.com free temporary email API
- **Design Inspiration**: Retro terminal and hacker aesthetics
- **Anonymous Mask**: Background imagery for thematic styling

## License

This project is provided as-is for educational and personal use.

---

**Note**: This is a temporary email service. Do not use for important communications or sensitive information. All emails are public and automatically deleted after 10 minutes.
