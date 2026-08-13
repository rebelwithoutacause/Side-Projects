# Troubleshooting Guide

## Common Issues and Solutions

### 1. CORS Errors (Cross-Origin Resource Sharing)

**Symptoms:**
- Console shows errors like "has been blocked by CORS policy"
- Email generation fails
- API requests don't work

**Solution:**
You MUST run the app through a web server, not by opening the HTML file directly.

**Easy Fix:**
- Double-click `START_SERVER.bat` (Windows)
- Or run: `python server.py`
- Or run: `node server.js`
- Then open http://localhost:8000 in your browser

### 2. "Error generating email" Message

**Causes:**
- Not running from a web server
- API is temporarily unavailable
- Internet connection issues

**Solutions:**
1. Make sure you're running from http://localhost:8000 (not file://)
2. Check your internet connection
3. Try refreshing the page
4. The app will use fallback domains if API fails

### 3. No Emails Appearing

**Possible Reasons:**
- Emails haven't been sent to the address yet
- Auto-refresh is checking every 5 seconds
- The email might be delayed

**Solutions:**
1. Wait a few seconds - emails can take 10-30 seconds to arrive
2. Click the "Refresh" button in the inbox section manually
3. Check the email address is correct
4. Try sending a test email from another service

### 4. Timer Not Working

**Check:**
- Is JavaScript enabled in your browser?
- Are there any console errors?
- Try refreshing the page

### 5. Port Already in Use

**Error:** "Port 8000 is already in use"

**Solution:**
Edit the server file and change PORT to a different number (e.g., 8080, 3000, 8888)

### 6. Copy to Clipboard Not Working

**Older Browsers:**
If the copy button doesn't work, manually select the email text and press Ctrl+C (Cmd+C on Mac)

## Browser Requirements

### Supported Browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Required Browser Features:
- JavaScript enabled
- Fetch API support
- ES6+ support
- Local Storage

## Testing the API

To test if the API is working, open your browser console and run:

```javascript
fetch('https://www.1secmail.com/api/v1/?action=getDomainList')
    .then(r => r.json())
    .then(console.log)
```

If you see an array of domains, the API is working.

## Running from Different Servers

### Python 3:
```bash
python server.py
```

### Python 2:
```bash
python -m SimpleHTTPServer 8000
```

### Node.js:
```bash
node server.js
```

### PHP:
```bash
php -S localhost:8000
```

### Using npm's http-server:
```bash
npx http-server -p 8000
```

## Still Having Issues?

1. **Check Browser Console:**
   - Press F12
   - Go to "Console" tab
   - Look for red error messages
   - Share these errors if asking for help

2. **Check Network Tab:**
   - Press F12
   - Go to "Network" tab
   - Refresh the page
   - Look for failed requests (red)

3. **Clear Cache:**
   - Press Ctrl+Shift+Delete
   - Clear browser cache
   - Refresh the page

4. **Try Different Browser:**
   - Sometimes browser extensions can interfere
   - Try in Incognito/Private mode

## Security Notes

- This is a PUBLIC email service
- Do NOT use for sensitive information
- Emails are NOT encrypted
- Anyone with the address can read emails
- All emails expire after the timer runs out

## Performance Tips

- Close the app when not in use to stop API polling
- Don't run multiple instances simultaneously
- Refresh the email if experiencing issues
- Use standard duration (10 min) for best results
