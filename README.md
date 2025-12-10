# Ward-robe - Clothing Selling Site

A raw, semantic HTML and pure CSS clothing e-commerce site with no styling frameworks.

## Project Structure

```
Ward-robe/
├── templates/
│   ├── index.html              # Home page
│   ├── products.html           # Product listing page
│   ├── product-detail.html     # Single product detail page
│   ├── cart.html              # Shopping cart page
│   └── checkout.html          # Checkout page
├── static/
│   └── css/
│       ├── styles.css          # Main styles (buttons, hero, cards, etc.)
│       ├── variables.css       # CSS custom properties (colors, spacing, typography)
│       └── components/
│           ├── navigation.css  # Navigation bar styling
│           ├── footer.css      # Footer styling
│           └── ui-components.css # Additional UI components (alerts, badges, tabs, etc.)
└── README.md                   # This file
```

## Features

### Pages

1. **Home Page (`index.html`)**
   - Hero section with CTA button
   - Featured products grid
   - Navigation header
   - Footer

2. **Products Page (`products.html`)**
   - Product listing with grid layout
   - Sidebar filters (category, size, price)
   - Product cards with quick add to cart
   - Links to product details

3. **Product Detail Page (`product-detail.html`)**
   - Large product image with thumbnails
   - Product information and pricing
   - Size and color options
   - Quantity selector
   - Tabbed content (details, shipping, reviews)
   - Related products section

4. **Shopping Cart (`cart.html`)**
   - List of cart items with images
   - Quantity adjustment
   - Item removal
   - Order summary sidebar
   - Coupon code input
   - Proceed to checkout button

5. **Checkout Page (`checkout.html`)**
   - Multi-step checkout process visualization
   - Shipping address form
   - Shipping method selection
   - Payment information form
   - Order summary with totals
   - Security information

### Components

#### Navigation
- Sticky header with logo
- Navigation menu with links
- Responsive design for mobile

#### Footer
- Multi-column layout
- About, Support, and Legal sections
- Copyright information
- Responsive design

#### Buttons
- `.btn-primary` - Primary action buttons (black)
- `.btn-secondary` - Secondary action buttons (white with border)
- Hover and active states
- Disabled state support

#### Product Cards
- Image container
- Product title
- Price display
- Action buttons
- Hover effects with elevation

#### Form Elements
- Text inputs
- Email inputs
- Select dropdowns
- Number inputs with increment/decrement
- Checkboxes and radio buttons
- Focus and validation states

#### UI Components (in `ui-components.css`)
- Alerts (success, error, warning, info)
- Badges
- Pagination
- Breadcrumbs
- Tabs
- Modals/Dialogs
- Loading spinners
- Skeleton loaders
- Utility classes

## CSS Architecture

### Variables (`variables.css`)

Uses CSS custom properties for:
- **Colors**: Primary, secondary, accent, text, border, background
- **Spacing**: 8px base unit (xs to 2xl)
- **Typography**: Font family, sizes (xs to 2xl)
- **Border Radius**: Small, medium, large
- **Shadows**: Small, medium, large
- **Transitions**: Fast, base, slow

### Responsive Design

All components use mobile-first approach:
- Tablet breakpoint: 768px
- Desktop: 1200px+

## Design Principles

1. **Pure CSS** - No styling frameworks or preprocessors
2. **Semantic HTML** - Proper HTML elements for accessibility
3. **CSS Variables** - Easy theming and maintenance
4. **Responsive** - Works on all screen sizes
5. **Accessible** - Keyboard navigation, focus states, semantic markup
6. **Performance** - Minimal CSS, no unnecessary styling

## Color Scheme

- **Primary**: #000000 (Black)
- **Secondary**: #ffffff (White)
- **Accent**: #888888 (Gray)
- **Text**: #333333 (Dark Gray)
- **Border**: #dddddd (Light Gray)
- **Background**: #fafafa (Off White)

## Typography

- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)
- **Sizes**: 12px to 32px for different heading and body levels

## Spacing System

Based on 8px unit:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

1. Open `templates/index.html` in a web browser
2. All CSS is already linked and ready to use
3. Customize colors in `variables.css`
4. Add functionality with JavaScript as needed

## Customization

### Change Colors
Edit the color variables in `static/css/variables.css`:

```css
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    /* ... other colors */
}
```

### Modify Spacing
Adjust the spacing variables to change padding/margins throughout the site:

```css
--spacing-md: 16px;
--spacing-lg: 24px;
/* ... other spacing */
```

### Add New Components
1. Create a new CSS file in `static/css/components/`
2. Import it in the HTML head
3. Follow the naming conventions and use CSS variables

## License

This project is for educational purposes.
