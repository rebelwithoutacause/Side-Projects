# 10 Minute Mail - Anonymous Temporary Email System

A retro-themed temporary email service with vintage hacker aesthetic. Get instant disposable email addresses without registration.

## Features

- **Instant Email Generation**: Random disposable email addresses
- **10-Minute Duration**: Fixed validity period
- **Real-time Inbox**: Auto-checks every 5 seconds
- **Copy to Clipboard**: One-click email copying
- **Retro Hacker Theme**: Matrix green with CRT effects
- **Anonymous Mask Background**: Vintage styling
- **Fully Responsive**: Desktop, tablet, and mobile support

## Quick Start

**Windows (Easiest):**
```bash
# Double-click START_SERVER.bat
```

**Python:**
```bash
python server.py
```

**Node.js:**
```bash
node server.js
```

Then open: http://localhost:8000

## Design Theme

- **Matrix Green (#00ff41)**: Primary color
- **Cyan Accents (#00d4ff)**: Secondary highlights
- **Courier New**: Terminal font
- **CRT Effects**: Flicker and scanline animations
- **Square Borders**: Authentic terminal look

## Technical Stack

- Pure HTML5, CSS3, JavaScript (ES6+)
- mail.gw API
- Python/Node.js local server
- No backend or database required

## Privacy & Security

- No registration or personal data required
- All emails auto-delete after 10 minutes
- Nothing saved locally
- **Not for sensitive information**

## Use Cases

- Testing email functionality
- Temporary service registrations
- One-time verification codes
- Avoiding spam in primary inbox

## Limitations

- Receive only (cannot send)
- 10-minute fixed duration
- No email recovery after expiration
- Depends on third-party API

## Troubleshooting

See `TROUBLESHOOTING.md` for detailed help.

**Quick fixes:**
- CORS errors: Use web server, not direct file open
- No emails: Check browser console
- Port in use: Ensure port 8000 is available

## Author

Created by **rebelwithoutacause**
- GitHub: [@rebelwithoutacause](https://github.com/rebelwithoutacause)
- Repository: [Side-Projects/docs/10minMail](https://github.com/rebelwithoutacause/Side-Projects/tree/main/docs/10minMail)
- Live app: [rebelwithoutacause.github.io/Side-Projects/10minMail](https://rebelwithoutacause.github.io/Side-Projects/10minMail/)

## Credits

- **API Service**: mail.gw
- **Design Inspiration**: Retro terminal aesthetics

## License

MIT License - Free for educational and personal use.

---

**⚠️ Disclaimer**: This is a temporary email service. Do not use for important communications or sensitive information. All emails are public and automatically deleted.
