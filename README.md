# HardTenn Industries, LLC Website

A modern, professional website for HardTenn Industries, LLC - a construction company.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Scrolling**: Navigation with smooth scroll effects
- **Interactive Elements**: Hover effects, animations, and interactive forms
- **Professional Sections**:
  - Hero section with call-to-action
  - About section with company information
  - Services showcase
  - Service examples gallery
  - Contact form

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive functionality and animations
- `privacy-policy.html` - Privacy policy page
- `README.md` - This file

## Local Development

Simply open `index.html` in a web browser to view the website. No build process or dependencies required.

Or use a local server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`

## GitHub Pages Deployment

This site is optimized for GitHub Pages deployment.

### Automatic Deployment

The site will automatically deploy to GitHub Pages when you push to the `main` branch using the included GitHub Actions workflow.

### Manual Setup

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select:
   - **Deploy from a branch**: Choose `main` branch
   - **Folder**: Select `/hard10` (or `/` if files are in root)
4. Click **Save**

Your site will be available at:
- `https://rdleonhard.github.io/hardtenn/hard10/` (if in subdirectory)
- `https://rdleonhard.github.io/hardtenn/` (if in root)

### Custom Domain (Optional)

To use a custom domain:
1. Create a `CNAME` file in the root with your domain name
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

## Customization

You can easily customize:

- Colors: Edit CSS variables in `styles.css` (--primary-color, etc.)
- Content: Update text in `index.html`
- Contact information: Modify contact details in the contact section
- Images: Replace placeholder SVGs with actual project images

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).
