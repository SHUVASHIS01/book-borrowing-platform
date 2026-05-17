# BookBorrow - Online Book Borrowing Platform

A modern, responsive web application where users can browse, search, filter, and borrow books online. Built with Next.js App Router, MongoDB, Tailwind CSS, and BetterAuth for authentication.

## Live URL

[Live Demo](https://book-borrowing-platform.vercel.app)

## GitHub Repository

[https://github.com/SHUVASHIS01/book-borrowing-platform.git](https://github.com/SHUVASHIS01/book-borrowing-platform.git)

## Purpose

This platform allows users to discover and borrow books from a curated online collection. Users can browse by categories (Story, Tech, Science), search by title, view detailed book information, and borrow books — all with a seamless, modern user experience.

## Key Features

- Browse and search books by title
- Filter books by category (Story, Tech, Science)
- View detailed book information
- Borrow books (requires authentication)
- User authentication (Email/Password + Google OAuth)
- User profile management with update functionality
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations using Animate.css and SwiperJS
- Toast notifications for user feedback
- Protected routes for authenticated content

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 + DaisyUI
- **Database:** MongoDB Atlas (via Mongoose)
- **Authentication:** BetterAuth
- **Animations:** Animate.css + SwiperJS
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

## NPM Packages Used

| Package | Purpose |
|---------|---------|
| next | React framework with App Router |
| react / react-dom | UI library |
| tailwindcss | Utility-first CSS |
| daisyui | Tailwind CSS component library |
| mongoose | MongoDB ODM |
| mongodb | MongoDB driver |
| better-auth | Authentication library |
| animate.css | CSS animations |
| swiper | Touch slider/carousel |
| react-hot-toast | Toast notifications |
| typescript | Type safety |

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SHUVASHIS01/book-borrowing-platform.git
   cd book-borrowing-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_secret_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. **Seed the database:**
   Visit `http://localhost:3000/api/seed` after starting the dev server.

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/   # BetterAuth handler
│   │   ├── books/           # Books CRUD API
│   │   └── seed/            # Database seeder
│   ├── all-books/           # All books page
│   ├── books/[id]/          # Book details (protected)
│   ├── login/               # Login page
│   ├── register/            # Register page
│   ├── my-profile/          # User profile (protected)
│   ├── update-profile/      # Update profile page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── BookCard.tsx
└── lib/
    ├── auth.ts              # BetterAuth server config
    ├── auth-client.ts       # BetterAuth client
    ├── mongodb.ts           # MongoDB connection
    └── models/
        └── Book.ts          # Book model
```

## Deployment

This project is configured for deployment on Vercel:

1. Push to GitHub
2. Import the repo on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

All routes work correctly on page refresh (no hydration errors).
