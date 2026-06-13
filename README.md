# Mokha Coffee House

A modern, responsive, and fully functional website clone for Mokha Coffee House, built with React, Vite, Tailwind CSS, and Framer Motion.

## Overview

Mokha Coffee House is a premium coffee shop website that allows users to browse the menu, place orders, view gallery, read blog posts, leave reviews, and make reservations. The design emphasizes a warm, professional aesthetic with smooth animations and a mobile-first responsive layout.

## Features

- **Home Page:** Hero section with call-to-action, featured highlights, about section, gallery preview, testimonials, and CTA.
- **Menu:** Categorized menu (coffee, pastry, food, specialty) with images, search, filters (category, dietary, price), and a functional cart UI.
- **Ordering & Payment:** Seamless cart experience with checkout modal (demo). Simulated payment flow for demonstration.
- **Reviews & Ratings:** View and submit reviews with star ratings. Real-time updates.
- **Gallery:** Masonry-style image grid with lightbox modal for fullscreen viewing.
- **Blog:** Blog listing with individual post pages. Sample articles about coffee culture, menu updates, and sustainability.
- **Contact & Reservations:** Contact form and reservation booking with date/time selection and special requests.

## Tech Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS 4, Framer Motion 12
- **Routing:** React Router DOM 7
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Linting:** ESLint with React Hooks and Refresh plugins
- **Deployment Target:** Vercel (static build)

## Project Structure

```
src/
├── assets/            # Static assets (images, icons)
├── components/        # Reusable UI components
│   ├── Navbar.jsx     # Navigation bar with mobile menu
│   └── Footer.jsx     # Footer with contact info and social links
├── data/              # Mock data for menu, reviews, gallery, blog
│   └── mokha.js
├── pages/             # Page components
│   ├── Home.jsx
│   ├── Menu.jsx       # Menu with cart and checkout modal
│   ├── Gallery.jsx    # Image gallery with lightbox
│   ├── Blog.jsx       # Blog listing
│   ├── BlogPost.jsx   # Individual blog post
│   ├── Reviews.jsx    # Reviews and rating submission
│   └── Contact.jsx    # Contact and reservation form
├── hooks/             # (optional) Custom React hooks
├── App.jsx            # Main app with routing
├── main.jsx           # Entry point
└── index.css          # Tailwind imports + custom styles

public/                # Static public assets
dist/                  # Production build output
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Configuration

### Tailwind CSS

Tailwind is configured via `tailwind.config.js` (if needed) and the `@tailwindcss/vite` plugin. The theme defines custom colors like `coffee-*`, `gold`, `cream`.

### React Router

All routes are defined in `src/App.jsx`:

- `/` – Home
- `/menu` – Menu
- `/gallery` – Gallery
- `/blog` – Blog list
- `/blog/:id` – Blog post detail
- `/reviews` – Reviews
- `/contact` – Contact & Reservation

## Data & API

This version uses mock data from `src/data/mokha.js`. In a production environment, these would be fetched from a backend API.

### Planned Backend Integration

- **Database:** Neon (PostgreSQL) to store orders, contact_form submissions, reviews, and blog content.
- **Server:** Express.js (or similar) to provide RESTful endpoints.
- **Payments:** Stripe or PayPal integration for secure checkout.

## Security Considerations

- Input validation and sanitization are performed on form fields (frontend). Backend would require additional sanitization.
- SSL encryption is assumed at deployment (e.g., Vercel provides HTTPS).
- Payment details are handled by Stripe/PayPal in production; the demo modal does not store any sensitive data.
- Passwords are not stored on the frontend; if authentication is added, bcrypt or Argon2 hashing would be used on the backend.

## Accessibility

- Semantic HTML elements
- ARIA attributes where appropriate
- Keyboard navigation support
- Sufficient color contrast

## Deployment

The app is ready for deployment on Vercel:

```bash
vercel --prod
```

Alternatively, push to GitHub and connect the repository to Vercel for automatic deployments.

## Future Work

- Implement full backend with Express + Neon DB
- Add authentication and user accounts
- Complete Stripe/PayPal integration with webhook handling
- Add email notifications for reservations and orders
- Expand test coverage (unit & integration tests)
- Implement caching strategies and performance optimizations
- Add i18n support

## License

All rights reserved. This project is for demonstration purposes.
