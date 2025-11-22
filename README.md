# Noble Mission School Website

A custom-built, dependency-free website template for Noble Mission - A School for Kids with Special Needs.

## Features

✅ **Zero External Dependencies**
- Pure HTML5, CSS3, and Vanilla JavaScript
- No frameworks, no libraries, no external CDNs
- Fast loading and lightweight

✅ **Fully Responsive**
- Mobile-first design
- Works on all devices (phones, tablets, desktops)
- Adaptive navigation menu

✅ **Modern Design**
- Clean, professional layout
- Smooth animations and transitions
- Accessible and SEO-friendly

✅ **Custom Features**
- Sticky header with scroll effects
- Smooth scrolling navigation
- Floating sidebar actions
- Scroll-to-top button
- Parallax hero section
- Animated feature cards

## File Structure

```
NewSchool/
├── noble-mission.html      # Main HTML file
├── css/
│   └── styles.css         # All styling (no external CSS)
├── js/
│   └── main.js           # All functionality (vanilla JS)
├── images/               # Image assets (currently using web sources)
└── README.md            # This file
```

## Setup & Usage

### Quick Start

1. Open `noble-mission.html` in any modern web browser
2. That's it! No build process, no installation required

### Customization

#### Change Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --primary-yellow: #FFC629;  /* Main accent color */
    --primary-cyan: #4DD0D6;    /* Secondary color */
    --dark-text: #333333;       /* Main text color */
    --light-text: #666666;      /* Secondary text */
}
```

#### Replace Images

Currently using temporary web images. To use your own:

1. Place images in the `images/` folder
2. Update image paths in `noble-mission.html`:
   - Hero image: Line 76
   - Feature cards: Lines 116, 131, 146

Recommended image sizes:
- Hero: 1920x600px (landscape)
- Feature cards: 800x600px (landscape)

#### Update Content

All content is in `noble-mission.html`. Edit text directly in the HTML:
- School name: Line 25-27 (logo)
- Hero title: Lines 81-84
- Feature descriptions: Lines 119-122, 134-137, 149-152
- About section: Lines 163-169

#### Add More Sections

1. Add new section HTML before the footer
2. Style it in `css/styles.css`
3. Add navigation link in header (Line 38-47)

## Browser Support

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Color Scheme

- **Primary Yellow**: `#FFC629` - Buttons, accents, highlights
- **Primary Cyan**: `#4DD0D6` - Feature section background
- **Dark Text**: `#333333` - Headings, main text
- **Light Text**: `#666666` - Descriptions, secondary text

## Typography

Using system fonts for maximum compatibility:
- `Segoe UI` (Windows)
- `San Francisco` (macOS/iOS)
- Fallbacks: Tahoma, Geneva, Verdana, sans-serif

## Performance

- **Page Weight**: < 50KB (HTML + CSS + JS)
- **Load Time**: < 1 second (excluding images)
- **Zero external requests** (when using local images)

## Sections Included

1. **Header** - Sticky navigation with logo, menu, phone, donate button
2. **Hero** - Large banner with call-to-action
3. **Features** - Three-column cards (Educate, Engage, Inspire)
4. **About** - Description section
5. **Footer** - Copyright and social links
6. **Sidebar** - Floating action buttons (Shop, Gallery, Contact)

## Future Enhancements

To add later (if needed):
- Programs/Services page
- News & Events section
- Photo gallery
- Contact form
- Donation integration
- Team/Staff section
- Testimonials
- FAQ section

## Notes

- Images currently load from `unsplash.com` (free open-source stock photos)
- Replace with your own school images before going live
- No tracking scripts included (privacy-friendly)
- No cookies or external analytics
- Unsplash images are free to use under the Unsplash License

## License

Custom built for Noble Mission School. All rights reserved.

---

**Built with ❤️ using pure HTML, CSS, and JavaScript**
