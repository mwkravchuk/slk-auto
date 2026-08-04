# SLK Auto Repair Website

A production website built for a local mobile auto repair business to support customer outreach and streamline quote requests.

## Overview

This project provides a simple, fast, and SEO-friendly website where customers can learn about services and submit quote requests. The goal was to create a practical tool for a real business, focusing on usability and direct communication.

## Tech Stack

- Next.js (App Router)
- Vercel (deployment)
- Resend (email API)

## Key Features

- Informational pages for services and business details
- Quote request form with structured customer input
- Real-time email notifications sent to the business owner
- Fast, server-rendered pages for improved performance and SEO

## Design Focus

- **Simplicity:** Clear and direct user flow for submitting requests  
- **Practicality:** Built to support a real business need  
- **Performance:** Leveraging Next.js server features for fast load times  

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## SLK Deployment Setup

This repo supports two Vercel production projects through `SLK_SITE_VARIANT`:

- `slk-auto`: real production, serving `slkautorepair.com` and `www.slkautorepair.com`. Set `SLK_SITE_VARIANT=holding` so it shows the building-page placeholder and disables quote requests.
- `slk-auto-demo`: demo production, serving `demo.slkautorepair.com`. Set `SLK_SITE_VARIANT=full` so it shows the full current website and quote flow.

Local development defaults to the full site:

```bash
npm run dev
```

Preview the holding page locally with:

```bash
SLK_SITE_VARIANT=holding npm run dev
```

The demo project also needs these Vercel production env vars for the quote form:

```bash
RESEND_API_KEY
SLK_QUOTE_TO_EMAIL
SLK_QUOTE_FROM_EMAIL
```
