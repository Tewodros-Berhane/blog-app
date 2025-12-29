# Modern Blog Platform

A next-generation blogging platform built with performance, scalability, and real-time interaction in mind.

## 🚀 Overview

This application is a modern, full-stack blog platform designed to provide a seamless reading and writing experience. It leverages the power of **Next.js 16** for the frontend and **Convex** for a real-time serverless backend.

### Key Features

- **⚡ Lightning Fast**: Built on Next.js 16 with React Server Components for optimal performance.
- **🔒 Secure Authentication**: Integrated with Better Auth for robust and secure user management.
- **🔍 Real-time Search**: Instant search capabilities powered by Convex search indexes.
- **💬 Interactive Comments**: Engage with content through a real-time commenting system.
- **🎨 Beautiful UI**: Crafted with Tailwind CSS v4 and Shadcn/UI for a premium, accessible design.
- **🌗 Dark Mode**: Full theme support (Light/Dark) via `next-themes`.
- **📱 Responsive**: Fully responsive design that looks great on all devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Backend & Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) (Radix UI)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
├── app/
│   ├── (shared-layout)/    # Public routes (Home, Blog, About) with shared navbar
│   ├── auth/              # Authentication pages (Login, Sign-up)
│   ├── layout.tsx         # Root layout
│   └── actions.ts         # Server actions
├── components/
│   ├── ui/                # Reusable UI components (Shadcn)
│   └── web/               # App-specific components (NavBar, Search, etc.)
├── convex/
│   ├── schema.ts          # Database schema definition
│   ├── blogs.ts           # Blog-related backend logic
│   ├── auth.ts            # Authentication configuration
│   └── ...
└── public/                # Static assets
```

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd blog-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Setup Convex**
    Initialize your Convex backend project:

    ```bash
    npx convex dev
    ```

    This command will guide you through logging in and setting up your project. It will also generate the necessary environment variables in `.env.local`.

4.  **Run the development server**
    In a new terminal window (keep `npx convex dev` running):

    ```bash
    npm run dev
    ```

5.  **Open the app**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Scripts

- `npm run dev`: Starts the Next.js development server.
- `npx convex dev`: Runs the Convex development environment (syncs schema and functions).
- `npm run build`: Builds the application for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

