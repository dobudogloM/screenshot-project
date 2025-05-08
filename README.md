# Screenshot Tool 🌄

A powerful web screenshot utility built with nodeJS. Capture, customize, and download screenshots directly from your browser with ease.


## Key Features ✨

- 🖥️ Full-page screenshot capture
- 📁 Multiple export formats 
- 🚀 Built with NodeJS
- 🔄 Undo/redo functionality
- 📱 Responsive design for all devices

## Tech Stack 🛠️
- NodeJs
- body-parser
- express
- puppeteer

## How It Works 🔧
### 1. Input URLs
- Enter single or multiple website addresses in the input field
- URL validation to ensure correct formatting

### 2. Configure Capture Settings
- **Multiple resolutions**:
  - Select from preset device sizes (Mobile, Tablet, Desktop)
  - Batch capture in all selected resolutions
- **Capture options**:
  - Full page screenshots
  - Delay before capture (for loading dynamic content)

### 3. Capture Process
- Automated sequential screenshotting:
  1. Opens each URL in headless browser
  2. Captures in all selected resolutions
  3. Applies consistent styling across all screenshots
- Real-time progress tracking

### 4. Save Results
- **Download options**:
  - Individual screenshots 
  - Organized by URL > Resolution structure
- **Auto-naming**:
  - `{website-name}_{resolution}_{timestamp}.png`
  - Customizable naming template



## Quick Start 🚀

```bash
# Install dependencies
npm install

# Run development server
node server.js
