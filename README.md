# kuburin 🪦

**R.I.P. Long URLs.**

kuburin is a simple, dark-themed URL shortener. It "buries" your long links and gives them a shorter alias.

## Why I made this

I use link shorteners all the time and got curious about how they actually work under the hood. So, I decided to build one myself to learn the process—from database design to handling redirects.

## Features

- **Graveyard Theme:** Dark aesthetic with subtle animations.
- **Custom Aliases:** Create your own custom short links (e.g., `/my-link`).
- **Expiration:** Links can be set to expire automatically (from 8 hours to 30 days).
- **Tech:** Built with Next.js 16 (App Router), PostgreSQL, and Tailwind CSS.

## Running it locally

1.  **Clone the repo**
    ```bash
    git clone https://github.com/fajarnaufal/kuburin-next.git
    cd kuburin-next
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Database Setup**
    This project uses PostgreSQL.
    Rename `.env.example` to `.env` and add your database connection string (local PostgreSQL or a cloud provider like Supabase).
    ```bash
    cp .env.example .env
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` to start burying links.

## Tech Stack

- **Framework:** Next.js 16
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Credit

Created by [nphew](https://naufalfajar.com).
Code is open source, feel free to look around if you're learning too.
