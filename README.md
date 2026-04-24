# Audiophile E-commerce Website

## Overview

Alright, so what we've got here is an e-commerce platform specifically for audiophiles. It lets folks browse and buy awesome headphones, speakers, and earphones, and there's also a dedicated admin area. That admin part helps store owners easily keep track of their product catalog, stock levels, and incoming orders, making inventory management much simpler.

## Features

-   **Premium Product Catalog**: Browse and shop for high-end headphones, speakers, and earphones with detailed descriptions and images.
-   **Dynamic Product Pages**: Each product gets its own page with comprehensive features, items included in the box, and related product recommendations.
-   **Shopping Cart & Checkout**: A fully functional shopping cart to manage selected items, quantities, and a secure checkout flow.
-   **User Authentication**: Seamless sign-in and sign-up powered by Clerk for managing user accounts.
-   **Admin Dashboard**: A dedicated, secure dashboard for store administrators to manage the product catalog and monitor live store activity.
-   **Product Management**: Admin users can create new products, edit existing ones, duplicate products (e.g., to create drafts), and delete items from the catalog.
-   **Visibility Control**: Toggle product status between "Live" (visible on storefront), "Draft" (saved but not published), and "Hidden" (not shown on storefront).
-   **Real-time Insights**: The admin dashboard provides an overview of catalog value, live products, low stock alerts, and recent orders.
-   **Responsive Design**: The storefront and admin dashboard are designed to look great and function across various screen sizes, from mobile to desktop.
-   **Smooth Animations**: Enjoy a fluid and engaging user experience with subtle animations powered by Framer Motion.

## Getting Started

To get this project up and running on your local machine, follow these steps.

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Isaacayomi/Audiophile-Ecommerce-Website.git
    cd Audiophile-Ecommerce-Website
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

### Environment Variables

Before running the application, you'll need to set up your environment variables. Create a `.env.local` file in the root of the project and add the following:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_yourclerkpublishablekey
CLERK_SECRET_KEY=sk_live_yourclerksecretkey
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/checkout?auth=sign_in_success
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/checkout?auth=sign_in_success

# Backend API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Store-owner email notifications
ORDER_NOTIFICATION_EMAIL=orders@yourdomain.com
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_SECURE=false
MAIL_FROM="Audiophile <no-reply@yourdomain.com>"
```

-   **Clerk Variables**: These are essential for user authentication and authorization. You can get these keys from your [Clerk Dashboard](https://dashboard.clerk.com/).
-   **`NEXT_PUBLIC_API_BASE_URL`**: This frontend communicates with a backend API (assumed to be FastAPI, as mentioned in the project notes) for product data and payment processing. Set this to the URL where your backend API is running. If you're running the provided FastAPI backend locally, it might be `http://localhost:8000`.
-   **Store-owner email notifications**: Set the SMTP values above, then point your Stripe webhook to `https://your-domain.com/api/stripe/webhook` so the app can email you when a payment completes.

## Usage

1.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
2.  **Access the Application**:
    -   Open your browser and go to `http://localhost:3000` to explore the Audiophile storefront.
    -   To access the admin dashboard, navigate to `http://localhost:3000/admin`. You'll need to sign up or sign in using Clerk to access protected routes like the checkout page and the entire admin section.

3.  **Using the Admin Dashboard**:
    Once you're logged into the admin dashboard, you can:
    -   View a summary of your catalog's overall value, recent order activities, and inventory health.
    -   Head over to the "Products" section to manage your items: add new products, edit existing ones, duplicate a product as a draft copy, or delete products.
    -   When adding or editing a product, you can set its name, category, price, stock, description, and upload a product image for display in the admin catalog.
    -   Easily toggle product visibility between "Live", "Draft", and "Hidden" statuses to control what shows up on the public storefront.

## Technologies Used

| Technology         | Description                                        |
| :----------------- | :------------------------------------------------- |
| Next.js 15         | React Framework for production                     |
| TypeScript         | Statically typed JavaScript superset               |
| React              | JavaScript library for building user interfaces    |
| Redux Toolkit      | State management library                           |
| Clerk              | User authentication and authorization              |
| Framer Motion      | Production-ready motion library for React          |
| React Hook Form    | Flexible forms with easy-to-use validation         |
| React Hot Toast    | Lightweight and accessible toast notifications     |
| Tailwind CSS       | Utility-first CSS framework (via PostCSS)          |
| FastAPI            | Backend API (for product data & payments)          |

## License

This project is open-source.

## Author Info

-   LinkedIn: [Isaac Ayomide Okunlola](https://www.linkedin.com/in/isaac-ayomide-okunlola-3568b7275/)
-   X (formerly Twitter): [Prime-codes](https://x.com/_devPRIME)

---

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/react--hot--toast-%23FDA477.svg?style=for-the-badge&logo=react-hot-toast&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
