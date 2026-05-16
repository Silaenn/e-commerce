# Project Overview

This is an e-commerce web application built with **Next.js 14 (App Router)** and **Tailwind CSS**. It is designed as a shop, featuring product categories, a product listing, shopping cart functionality, and checkout integration with Midtrans.

## Technologies & Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** JavaScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with `tailwind-merge` and `class-variance-authority`.
- **UI Components:** [Radix UI](https://www.radix-ui.com/) primitives.
- **Icons:** [Lucide React](https://lucide.dev/).
- **State Management:** React Context (see `app/_context/`).
- **Data Fetching:** [Axios](https://axios-http.com/).
- **Payment Integration:** [Midtrans](https://midtrans.com/) (`midtrans-client`) and [PayPal](https://www.paypal.com/).

## Building and Running

- **Development Server:** `npm run dev` (Access at `http://localhost:3000`)
- **Build:** `npm run build`
- **Start:** `npm run start`
- **Lint:** `npm run lint`

## Development Conventions

- **Directory Structure:**
  - `app/`: Main application routes and components.
  - `app/_components/`: Shared React components.
  - `app/_context/`: React context providers for global state (Auth, Cart, Search).
  - `app/_utils/`: Utility functions (including API services like `GlobalApi.jsx`).
  - `components/ui/`: Reusable UI primitives based on Radix UI.
- **Styling:** Use Tailwind CSS utility classes.
- **Components:** Functional components with React hooks.
- **API:** Backend routes are located under `app/api/`.
