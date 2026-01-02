# Quality Assurance Calendar 2026

A retro-styled interactive calendar application for 2026 with QA-themed quotes, task management, and file attachment capabilities.

## Features

### Calendar Display
- **Full Year View**: Displays all 12 months of 2026 in a compact grid layout
- **Retro Design**: Classic computer terminal aesthetic with monospace fonts and green-on-black color scheme
- **Today Highlighting**: Current day is automatically highlighted for easy reference
- **Weekend Indicators**: Saturdays and Sundays are visually distinguished
- **Holiday Support**: Pre-configured with Bulgarian holidays for 2026

### Task Management
- **Daily Notes**: Click on any day to add, view, and manage notes/tasks
- **Todo List Format**: Notes function as a checklist with completion tracking
- **Task Numbering**: Optional numbered list view for better organization
- **Completion Tracking**: Check off completed tasks with visual strikethrough
- **Note Indicators**: Small dots appear on days with notes or attachments

### File Attachments
- **Multi-File Support**: Attach images, PDFs, documents, and spreadsheets to any day
- **Supported Formats**:
  - Images: JPG, JPEG, PNG, GIF, BMP
  - Documents: PDF, DOC, DOCX, TXT
  - Spreadsheets: XLS, XLSX
- **Image Preview**: Click on image thumbnails for full-screen preview
- **File Management**: View file names, sizes, and delete attachments as needed

### Data Persistence
- **Local Storage**: All notes and attachments are saved locally in your browser
- **Automatic Saving**: Changes are instantly saved without manual intervention
- **No Server Required**: Works completely offline once loaded

### QA-Themed Quotes
Monthly humorous quotes related to Quality Assurance:
- January: "It works on my machine! - The eternal QA mantra"
- April: "April Fools! That wasn't a joke, it was a real bug"
- December: "All I want for Christmas is... zero bugs in production"

## Installation

1. Clone or download this repository
2. Open [index.html](index.html) in any modern web browser
3. No build process or dependencies required

## Usage

### Adding Notes
1. Click on any day in the calendar
2. A modal will open showing that day's details
3. Type your note in the input field
4. Click "ADD" or press Enter to save
5. Use checkboxes to mark tasks as complete
6. Click "DEL" to remove notes

### Attaching Files
1. Open a day's modal by clicking on it
2. Click the "📎 ATTACH FILE" button
3. Select one or multiple files from your computer
4. Files will be stored and displayed in the attachments section
5. Click on image thumbnails to preview them full-screen
6. Use "DEL" to remove attachments

### Keyboard Shortcuts
- **Escape**: Close open modals
- **Enter**: Add note (when input field is focused)

### Options
- **Show task numbers**: Toggle numbered list view for better task organization

## File Structure

```
Calendar2026/
├── index.html          # Main HTML structure
├── style.css          # Retro styling and layout
├── script.js          # Calendar logic and interactivity
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic structure and modal dialogs
- **CSS3**: Retro styling with grid layouts and animations
- **Vanilla JavaScript**: No frameworks or libraries
- **LocalStorage API**: Client-side data persistence
- **FileReader API**: File upload and preview functionality

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid
- LocalStorage
- FileReader API

Tested on:
- Chrome/Edge (Chromium)
- Firefox
- Safari

## Pre-configured Holidays (2026)

- January 1: New Year
- March 3: Liberation Day
- April 10-13: Easter (Orthodox)
- May 1: Labour Day
- May 6: St. George's Day
- May 24: Education and Culture Day
- September 6: Unification Day
- September 22: Independence Day
- December 24-26: Christmas

## Customization

### Adding Your Own Holidays
Edit the `qaEvents` object in [script.js](script.js):

```javascript
const qaEvents = {
    '2026-01-01': 'New Year',
    '2026-12-25': 'Christmas',
    // Add more dates here
};
```

### Changing the Theme
Modify the CSS variables in [style.css](style.css) to customize colors:

```css
:root {
    --primary-color: #00ff41;
    --bg-color: #0d0d0d;
    --secondary-bg: #1a1a1a;
}
```

## Limitations

- **Storage Limits**: LocalStorage typically has a 5-10MB limit per domain
- **Large Files**: Storing many large files may impact performance
- **Single Year**: Currently configured for 2026 only
- **Browser-Specific**: Data is stored per browser and cannot sync across devices

## Future Enhancements

Potential features for future versions:
- Multi-year support
- Export/import functionality
- Cloud synchronization
- Recurring events
- Color-coded categories
- Search functionality

## License

This project is free to use and modify for personal or commercial purposes.

## Credits

Created with retro computing aesthetics in mind. Inspired by classic terminal interfaces and QA engineering culture.

---

**"Quality is not an act, it is a habit"** - Aristotle
