# Audiophile E-commerce Website

## Overview
The Audiophile E-commerce Website is a sophisticated, full-featured frontend application built with **Next.js**, **React**, and **TypeScript**. It offers a premium shopping experience for audio gear, complete with product browsing, a dynamic shopping cart, and a secure checkout flow. User authentication is seamlessly integrated using **Clerk**, while **Redux Toolkit** manages global state, and **Tailwind CSS** provides a highly responsive and modern design.

## Features
-   **Comprehensive Product Catalog**: Browse a wide array of premium headphones, speakers, and earphones with dedicated category pages.
-   **Detailed Product Views**: Access in-depth product information, including high-resolution images, elaborate descriptions, key features, and included accessories.
-   **Interactive Shopping Cart**: Effortlessly add, remove, and adjust quantities of items in the cart, with real-time price calculations.
-   **Secure User Authentication**: Seamless sign-in and sign-up processes powered by Clerk, ensuring a secure and personalized shopping experience.
-   **Streamlined Checkout Process**: A multi-step checkout form with robust client-side validation using React Hook Form, integrating with a backend for Stripe payments.
-   **Responsive Design**: A meticulously crafted user interface that adapts flawlessly to various screen sizes, from mobile devices to large desktops, utilizing Tailwind CSS.
-   **Smooth Animations**: Enhanced user experience with elegant transitions and animations implemented using Framer Motion.
-   **Global State Management**: Efficient and predictable state management across the application through Redux Toolkit, ensuring data consistency.
-   **Real-time Notifications**: Provides instant user feedback for actions like adding to cart or authentication events using React Hot Toast.

## Getting Started

### Installation
To get a local copy up and running, follow these simple steps.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Isaacayomi/Audiophile-Ecommerce-Website.git
    ```
2.  **Navigate to Project Directory**:
    ```bash
    cd Audiophile-Ecommerce-Website
    ```
3.  **Install Dependencies**:
    Choose your preferred package manager:
    ```bash
    npm install
    # OR
    yarn install
    # OR
    pnpm install
    ```

### Environment Variables
This project requires specific environment variables for authentication and API communication. Create a `.env.local` file in the root of the project and populate it with the following:

```env
# Clerk Authentication (Refer to Clerk documentation for setup)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_live_YOUR_CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/checkout?auth=sign_in_success
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/checkout?auth=sign_in_success

# Backend API Base URL (for product data and payment processing)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1 # Example: Replace with your actual backend API URL
```

## Usage
After completing the installation and setting up environment variables, you can run the development server to explore the Audiophile E-commerce Website.

1.  **Run the Development Server**:
    ```bash
    npm run dev
    # OR
    yarn dev
    # OR
    pnpm dev
    ```
2.  **Access the Application**:
    Open your browser and navigate to `http://localhost:3000`.

**Exploring the Application:**

*   **Homepage**: Discover featured products and category links.
*   **Category Pages**: Browse products by category (Headphones, Speakers, Earphones). Each category page dynamically fetches and displays relevant products.
*   **Product Detail Pages**: Click on any product to view its detailed description, features, items included in the box, and a full image gallery.
*   **Adding to Cart**: On product detail pages, use the quantity selector and "Add to cart" button to add items. A toast notification confirms the action.
*   **Shopping Cart**: Click the cart icon in the header to view your selected items. You can adjust quantities, remove individual items, or clear the entire cart.
*   **Authentication**: Use the "Sign In" or "Sign Up" links (via Clerk) to authenticate. Protected routes like checkout require a signed-in user.
*   **Checkout Process**: After adding items to your cart, proceed to checkout. Fill in your contact and shipping information in the validated form. Upon submission, the application integrates with a backend service to initiate a Stripe Checkout session, redirecting the user for secure payment.

## Technologies Used

| Technology         | Description                                     |
| :----------------- | :---------------------------------------------- |
| Next.js            | React framework for production                  |
| React              | JavaScript library for building user interfaces |
| TypeScript         | Typed superset of JavaScript                    |
| Tailwind CSS       | Utility-first CSS framework                     |
| Clerk              | User authentication and management              |
| Redux Toolkit      | Efficient Redux development                     |
| Framer Motion      | Production-ready motion library for React       |
| React Hook Form    | Flexible forms with validation                  |
| React Hot Toast    | Lightweight and customizable notifications      |
| React Icons        | Collection of popular icon packs                |

## License
All Rights Reserved.

## Author
**Isaac Ayomide**
*   LinkedIn: [linkedin.com/in/yourusername](https://linkedin.com/in/yourusername) *(Please replace with your actual LinkedIn URL)*
*   X (Twitter): [twitter.com/yourusername](https://twitter.com/yourusername) *(Please replace with your actual X/Twitter URL)*

---
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6644FF?style=for-the-badge&logo=clerk&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/React%20Hot%20Toast-0D0D0D?style=for-the-badge&logo=react-hot-toast&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)