# Nats Automations - Modern Website & CRM

A modern, feature-rich website for Nats Electric & Automations with an integrated CRM system for managing customer inquiries and leads.

## Features

### Public Website
- 🎨 Modern, responsive design with dark mode support
- ⚡ Fast performance with Next.js 15
- 🎭 Smooth animations using Framer Motion
- 📱 Fully mobile-responsive
- 🔍 SEO optimized with metadata and structured data
- 📧 Contact form with lead capture
- 🎯 Interactive service showcases
- 📸 Portfolio gallery with filtering
- 💬 Live chat integration (Tawk.to)
- ⭐ Customer testimonials slider

### Services Featured
- CCTV Systems
- Electric Fencing
- Solar Solutions
- Automatic Gates
- Video Intercoms
- Biometric Systems

### CRM Dashboard
- 📊 Lead management system
- 👥 Customer tracking
- 📈 Analytics and statistics
- 🔐 Secure authentication
- 📝 Notes and activity tracking
- 🎯 Priority and status management
- 🔔 Real-time notifications

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Icons:** Emoji-based (can be replaced with icon library)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
cd nats-automations-modern
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your configuration:
\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nats_crm"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Live Chat (optional)
NEXT_PUBLIC_TAWK_PROPERTY_ID=""
NEXT_PUBLIC_TAWK_WIDGET_ID=""
\`\`\`

4. Set up the database:
\`\`\`bash
npm run prisma:push
\`\`\`

5. Create an admin user (run in Prisma Studio or directly in database):
\`\`\`bash
npm run prisma:studio
\`\`\`

Create a user with:
- Email: admin@natsautomations.co.ke
- Password: (hash of "admin123" using bcrypt)
- Name: Admin
- Role: admin

Or use this SQL:
\`\`\`sql
INSERT INTO users (id, email, password, name, role)
VALUES (
  gen_random_uuid(),
  'admin@natsautomations.co.ke',
  '$2a$10$YourBcryptHashHere',
  'Admin',
  'admin'
);
\`\`\`

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
nats-automations-modern/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── contact/        # Contact form handler
│   │   └── leads/          # CRM lead management
│   ├── crm/                # CRM dashboard pages
│   │   ├── dashboard/      # Main CRM interface
│   │   └── login/          # Login page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/              # React components
│   ├── sections/           # Page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── ui/                 # UI components
│   │   └── ServiceModal.tsx
│   ├── ThemeProvider.tsx   # Dark mode provider
│   └── LiveChat.tsx        # Live chat widget
├── lib/                    # Utility functions
│   ├── prisma.ts          # Prisma client
│   ├── auth.ts            # NextAuth config
│   └── utils.ts           # Helper functions
├── prisma/                 # Database schema
│   └── schema.prisma
├── public/                 # Static assets
│   └── images/
├── .env.example           # Environment template
├── next.config.ts         # Next.js config
├── tailwind.config.ts     # Tailwind config
├── tsconfig.json          # TypeScript config
└── package.json           # Dependencies
\`\`\`

## Key Features Explained

### Dark Mode
The site supports automatic dark mode based on system preferences, with manual toggle available in the navbar.

### CRM System
Access the CRM at `/crm/login` with credentials:
- Email: admin@natsautomations.co.ke
- Password: admin123 (change in production!)

### Contact Form
All form submissions are automatically saved to the database as leads in the CRM.

### Live Chat
To enable live chat:
1. Sign up at [Tawk.to](https://www.tawk.to/)
2. Get your Property ID and Widget ID
3. Add them to `.env`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Database Setup for Production

### Option 1: Supabase (Free PostgreSQL)
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

### Option 2: Railway
1. Sign up at [railway.app](https://railway.app)
2. Create a PostgreSQL database
3. Copy the connection string to `DATABASE_URL`

### Option 3: Self-hosted PostgreSQL
Set up PostgreSQL on your server and configure `DATABASE_URL`

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
\`\`\`typescript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ },
}
\`\`\`

### Content
- Update company info in `lib/utils.ts`
- Modify services in `lib/utils.ts`
- Add real images to `public/images/`
- Update contact details in components

### Branding
- Replace logo in `Navbar.tsx` and `Footer.tsx`
- Update favicon in `app/layout.tsx`
- Modify metadata in `app/layout.tsx`

## Security Notes

⚠️ **Important for Production:**

1. Change default admin password
2. Use strong `NEXTAUTH_SECRET`
3. Enable HTTPS
4. Set up proper CORS policies
5. Implement rate limiting
6. Add email verification
7. Enable database backups
8. Use environment-specific configs

## Support

For issues or questions:
- Email: info@natsautomations.co.ke
- Phone: +254 726 259 977

## License

MIT License - feel free to use for your projects!

## Credits

Built with ❤️ for Nats Electric & Automations
