# BookBorrow

An online book borrowing platform built with Next.js, MongoDB, and BetterAuth. Users can browse, search, and borrow books across different categories.

**Live Site:** [https://book-borrowing-platform-lilac.vercel.app](https://book-borrowing-platform-lilac.vercel.app)

## Features

- Browse books with category filtering (Story, Tech, Science) and title search
- Book details page with borrow functionality
- Email/password and Google OAuth authentication
- User profile with edit support
- Responsive across all devices
- Animations with Animate.css, React-Spring, and SwiperJS

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + DaisyUI
- MongoDB Atlas with Mongoose
- BetterAuth for authentication
- Vercel for deployment

## Getting Started

```bash
git clone https://github.com/SHUVASHIS01/book-borrowing-platform.git
cd book-borrowing-platform
npm install
```

Create a `.env.local` file:

```
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run the dev server:

```bash
npm run dev
```

Seed the database by visiting `http://localhost:3000/api/seed`.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/   # Auth handler
│   │   ├── books/           # Books API
│   │   └── seed/            # DB seeder
│   ├── all-books/           # Browse books
│   ├── books/[id]/          # Book details (private)
│   ├── login/
│   ├── register/
│   ├── my-profile/          # Profile (private)
│   ├── update-profile/
│   └── page.tsx             # Home
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── BookCard.tsx
└── lib/
    ├── auth.ts
    ├── auth-client.ts
    ├── mongodb.ts
    └── models/Book.ts
```

## Deploying to Vercel

1. Import repo on [vercel.com](https://vercel.com)
2. Add all env variables from `.env.local`
3. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel URL
4. Deploy and visit `/api/seed` to populate books
