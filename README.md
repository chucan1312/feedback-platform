# BlindFeed

AI-powered anonymous feedback platform built with Next.js, TypeScript, Prisma, PostgreSQL, and OpenAI. Try it out [here](https://feedback-platform-theta.vercel.app/).

## Features

- Anonymous survey and feedback collection
- AI-powered semantic feedback analysis
- Vector embeddings with pgvector
- Cosine similarity clustering for insight discovery
- AI moderation pipeline
- Authentication with Clerk
- Real-time analytics dashboard
- Responsive UI with Tailwind CSS

---

## Tech Stack

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS

**Backend**
- Prisma ORM
- PostgreSQL
- pgvector

**Authentication**
- Clerk

**AI**
- OpenAI API

---

## Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=

CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

DATABASE_URL=
DATABASE_URL_UNPOOLED=
```

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/chucan1312/feedback-platform.git
cd feedback-platform
```

Install dependencies:

```bash
npm install
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```
---

## Authour

[Chuc An Trinh](https://www.linkedin.com/in/an-trinh-891462332/)
