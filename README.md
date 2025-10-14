# 📝 Todo App - Modern Task Management

A beautiful and modern todo application built with the latest web technologies. Stay organized and productive! ✨

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748?logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)

## 🌟 Features

- ✅ **Create, Read, Update, Delete** todos with ease
- 🎨 **Beautiful UI** with gradient designs and smooth animations
- 🌓 **Dark mode** support (automatic based on system preferences)
- 📱 **Fully responsive** - works perfectly on all devices
- ⚡ **Real-time updates** using Next.js Server Actions
- 🔒 **Type-safe** with TypeScript and Prisma ORM
- 🎯 **Organized view** - separate active and completed tasks
- 🕐 **Time tracking** - see when todos were created
- 🎭 **Smooth animations** and transitions
- 🔔 **Toast notifications** for user feedback

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.5** - App Router with Server Components
- **React 19.1.0** - Latest React with Server Actions
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Modern styling with gradient designs
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **date-fns** - Date formatting

### Backend
- **Prisma ORM** - Type-safe database client
- **Vercel Postgres** - Serverless PostgreSQL database
- **Zod** - Runtime validation

### Development
- **Turbopack** - Fast build tool
- **ESLint** - Code linting
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account (for Postgres database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd prisma-postgres
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your_database_url_here"
   DIRECT_URL="your_direct_url_here"
   ```

   You'll get these values from Vercel Postgres (see Database Setup below).

4. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com)
2. Navigate to your project (or create a new one)
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Copy the environment variables from the `.env.local` tab
7. Paste them into your local `.env` file

### Option 2: Local PostgreSQL

If you have PostgreSQL installed locally:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
DIRECT_URL="postgresql://user:password@localhost:5432/todo_db"
```

### Database Migration

After setting up your database, run:

```bash
# For development (creates migrations)
npm run prisma:migrate

# Or for quick prototyping (pushes schema directly)
npm run prisma:push
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Create and run migrations |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |
| `npm run prisma:push` | Push schema to database |

## 📁 Project Structure

```
prisma-postgres/
├── app/
│   ├── actions/
│   │   └── todo-actions.ts       # Server Actions
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET, POST endpoints
│   │       └── [id]/route.ts     # PATCH, DELETE endpoints
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── AddTodoForm.tsx
│   ├── EmptyState.tsx
│   ├── TodoItem.tsx
│   └── TodoList.tsx
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── types.ts                  # TypeScript types
│   ├── utils.ts                  # Utility functions
│   └── validations.ts            # Zod schemas
├── prisma/
│   └── schema.prisma             # Database schema
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment template
└── package.json
```

## 🎨 Features Breakdown

### Todo Management
- Create todos with title and optional description
- Mark todos as complete/incomplete
- Edit existing todos
- Delete todos with confirmation
- Automatic sorting (newest first)

### User Interface
- Gradient color schemes
- Smooth hover effects and transitions
- Responsive design (mobile, tablet, desktop)
- Empty state with helpful tips
- Loading states during operations
- Success/error toast notifications

### Technical Features
- Server-side rendering for better SEO
- Optimistic UI updates
- Type-safe API routes
- Validation on both client and server
- Automatic cache revalidation
- Error boundary handling

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set up Vercel Postgres**
   - In your Vercel project, go to **Storage**
   - Create a Postgres database
   - Environment variables will be automatically added

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in seconds!

5. **Run Database Migration**
   - After first deployment, go to your Vercel project
   - Go to **Settings** > **Functions**
   - Run: `npx prisma migrate deploy`

### Environment Variables on Vercel

Make sure these are set (automatically added by Vercel Postgres):
- `DATABASE_URL`
- `DIRECT_URL`

## 🐛 Troubleshooting

### "PrismaClient is not generated"
```bash
npm run prisma:generate
```

### "Can't reach database server"
- Check your `.env` file
- Verify database connection string
- Make sure your database is running

### Build fails on Vercel
- Check that environment variables are set
- Run `npm run build` locally first
- Check the build logs on Vercel

### Turbopack issues
If you encounter issues with Turbopack, you can disable it:
```json
"dev": "next dev",
"build": "next build",
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React 19](https://react.dev)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ to learn Next.js 15 and Vercel Postgres

---

**Happy Coding!** 🎉

If you find this project helpful, please give it a ⭐ on GitHub!
