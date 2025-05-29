This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist and Vazirmatn](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_PROJECT_FOLDER_NAME]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up your Supabase Project:**
    - Go to your Supabase project dashboard.
    - Navigate to the "Table Editor" and create the tables (`users`, `referrals`, `visitors`, `api_keys`) as described in the "Database Schema" section. Ensure proper foreign key relationships are established.
    - (Optional but Recommended) Set up Row Level Security (RLS) policies on your Supabase tables to secure your data.

### Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    # or
    pnpm run dev
    ```

2.  Open your browser and navigate to `http://localhost:3000` to see the application.

## Usage

### Generating Referrals

- Log in with your administrator credentials.
- Navigate to the "Referrals" section.
- Use the interface to create new referral entries, providing a `name`.
- Upon creation, the application will generate a unique referral link and a corresponding QR code for sharing.

### Tracking Views

- When a user visits a referral link, the `visitors` table will automatically record their `user_agent`, `ip_address`, and the `referral_id`.
- The management panel will display aggregated view counts for each referral, providing insights into their performance.
  `ip_address` is unique for tracking only new visiotrs.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist and Vazirmatn](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YOURUSERNAME/referral-tracking.git
    OR
    git clone git@github.com:YOURUSERNAME/referral-tracking.git
    cd referral-tracking
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up your Supabase Project:**
    - Go to your Supabase project dashboard.
    - Navigate to the "Table Editor" and create the tables (`users`, `referrals`, `visitors`, `api_keys`) as described in the "Database Schema" section. Ensure proper foreign key relationships are established.
    - (Optional but Recommended) Set up Row Level Security (RLS) policies on your Supabase tables to secure your data.

### Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    # or
    pnpm run dev
    ```

2.  Open your browser and navigate to `http://localhost:3000` to see the application.

## Usage

### Generating Referrals

- Log in with your administrator credentials.
- Navigate to the "Referrals" section.
- Use the interface to create new referral entries, providing a `name`.
- Upon creation, the application will generate a unique referral link and a corresponding QR code for sharing.

### Tracking Views

- When a user visits a referral link, the `visitors` table will automatically record their `user_agent`, `ip_address`, and the `referral_id`.
- The management panel will display aggregated view counts for each referral, providing insights into their performance.
  `ip_address` is unique for tracking only new visiotrs.
