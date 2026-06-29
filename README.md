# Romantic Proposal Website 💖

A fully working, ultra-premium, romantic multi-page proposal website built for Pratik. 
Built with React, Vite, Tailwind CSS, Framer Motion, and a Vercel Serverless Function for automatic email confirmations via Elastic Email.

## Features ✨

* **Premium UI**: Glassmorphism cards, glowing buttons, floating hearts, and sparkle particles.
* **Playful Proposal Page**: The "No" button runs away playfully on desktop and mobile.
* **Full Date Booking Flow**: Date, Location, Meal Type, and 70+ Food & Drink options.
* **Automatic Emails**: Sends beautifully formatted confirmation emails to both you and your date using Elastic Email.
* **WhatsApp Integration**: Opens a pre-filled WhatsApp message for quick confirmation.
* **Confetti Celebration**: Because she said yes! 🎉
* **Mobile-First**: Designed to look perfect on her phone.

---

## 1. How to create Elastic Email account
1. Go to [Elastic Email](https://elasticemail.com/) and click **Sign Up**.
2. Create a free account and verify your email address.
3. Log in to your new Elastic Email dashboard.

## 2. How to verify sender email/domain in Elastic Email
1. In the Elastic Email dashboard, go to **Settings** > **Domains**.
2. Click **Add Domain** and follow the DNS verification steps (SPF, DKIM, Tracking).
3. *Alternatively*, for quick testing, go to **Settings** > **Sender Emails**, click **Add Sender**, enter your email (e.g. `pratikmondal527@gmail.com`), and click the verification link sent to your inbox.
4. This verified email will be used as `ELASTIC_EMAIL_FROM_EMAIL`.

## 3. How to create Elastic Email API key
1. In the Elastic Email dashboard, go to **Settings** > **Manage API Keys**.
2. Click **Create API Key**.
3. Name it (e.g., "Proposal Website").
4. Under Permissions, ensure it has "Plugin/Email Send" access.
5. **Copy the API key safely**. You will only see it once! 
6. *Never put this API key inside your React frontend code.*

## 4. How to create `.env.local`
1. In the root of your project directory, create a file named `.env.local`.
2. Add your environment variables like this:
```env
ELASTIC_EMAIL_API_KEY=your_copied_api_key_here
ELASTIC_EMAIL_FROM_EMAIL=your_verified_sender_email@gmail.com
ELASTIC_EMAIL_FROM_NAME=Pratik
PRATIK_EMAIL=pratikmondal527@gmail.com
PRATIK_WHATSAPP=917047448557
```

## 5. How to add environment variables in Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Select your project.
3. Go to **Settings** → **Environment Variables**.
4. Add the following keys one by one with their corresponding values:
   - `ELASTIC_EMAIL_API_KEY`
   - `ELASTIC_EMAIL_FROM_EMAIL`
   - `ELASTIC_EMAIL_FROM_NAME`
   - `PRATIK_EMAIL`
   - `PRATIK_WHATSAPP`
5. Click **Save** for each, then redeploy your project (Deployments -> Redeploy).

## 6. How to run locally
Because this project uses a Vercel Serverless Function (`api/send-date.js`) to keep your API key secure, you must use the Vercel CLI to run it locally so the `/api` route works.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Vercel CLI globally (if you haven't already):
   ```bash
   npm install -g vercel
   ```
3. Link your project to Vercel:
   ```bash
   vercel link
   ```
4. Pull your environment variables (optional, or rely on `.env.local`):
   ```bash
   vercel env pull .env.local
   ```
5. Run the Vercel development server:
   ```bash
   vercel dev
   ```
   *Your app will now run at `http://localhost:3000` with both the React frontend and the `/api` backend working perfectly.*

## 7. How to deploy on Vercel
1. Push your code to a GitHub repository.
2. Go to Vercel and click **Add New Project**.
3. Import your GitHub repository.
4. In the configuration step, **add your Environment Variables** (from step 5).
5. Click **Deploy**. Vercel will automatically build the Vite app and set up the Serverless Function.

## 8. How to test the form
1. Once running (locally or on Vercel), click "Yes" on the first page.
2. Select a valid future date, location, meal, and at least one food item.
3. Enter a test name and email address on the final confirmation page.
4. Click **Confirm Date ❤️**.
5. Check the email inbox you provided to ensure the beautiful HTML confirmation email arrived.
6. Check Pratik's email inbox to ensure he received the notification.
7. Verify the Success Page shows up and the WhatsApp button works correctly.

## 9. Common errors and fixes
- **API route returns 405 Method Not Allowed**: Ensure you are making a `POST` request to `/api/send-date`.
- **API route returns 404 Not Found locally**: You are likely running `npm run dev` instead of `vercel dev`. You must use `vercel dev` to test serverless functions locally.
- **Emails are not sending (500 Error)**: 
  - Double-check that `ELASTIC_EMAIL_API_KEY` is correct.
  - Verify that `ELASTIC_EMAIL_FROM_EMAIL` is fully verified in your Elastic Email dashboard. Unverified senders will be rejected.
- **WhatsApp link doesn't format correctly**: Ensure `encodeURIComponent` is used in the frontend URL generator (already handled in code).
- **Environment variables are undefined in backend**: Make sure you added them to Vercel Settings and redeployed, or created `.env.local` correctly if testing locally.

## 10. WhatsApp Limitation Explanation
*This website opens WhatsApp with a pre-filled message. The user must tap send manually. Automatic WhatsApp sending requires WhatsApp Cloud API.*

---
*Made with endless love by Pratik 💝*
