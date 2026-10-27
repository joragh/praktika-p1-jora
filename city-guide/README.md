This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Business owner CRUD

- Visit `/auth` to register or log in as a business owner.
- The owner dashboard at `/dashboard` can create, read, update, and delete businesses.
- The free plan allows one business. The Premium monthly-plan demo unlocks multiple businesses and marks the owner's businesses as promoted in `/places`.
- Account and business data are stored in MySQL. Import `database/city_guide.sql` in MySQL Workbench, then copy `.env.example` to `.env.local` and enter your MySQL credentials.
- The database name is `city_guide`. The app reads businesses from the database on the `Places` page, so a newly added business is visible to every visitor.

> The Premium button is a demo activation, not a real payment processor. A real subscription needs a payment provider and a server-side API; never store real passwords in browser storage in a production app.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
