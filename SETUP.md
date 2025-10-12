# Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ (`node --version`)
- ✅ npm or yarn (`npm --version`)
- ✅ PostgreSQL database (or use Supabase/Railway)

## 5-Minute Setup

### 1. Environment Configuration

Copy the example env file:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` with your actual values:
\`\`\`env
# Required: Database
DATABASE_URL="postgresql://user:password@localhost:5432/nats_crm"

# Required: Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Optional: Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Optional: Live Chat
NEXT_PUBLIC_TAWK_PROPERTY_ID=""
NEXT_PUBLIC_TAWK_WIDGET_ID=""
\`\`\`

### 2. Install Dependencies

If not already done:
\`\`\`bash
npm install
\`\`\`

### 3. Database Setup

Initialize your database:
\`\`\`bash
npm run prisma:push
\`\`\`

### 4. Create Admin User

Generate a password hash:
\`\`\`bash
# Install bcryptjs globally if needed
npm install -g bcryptjs-cli

# Generate hash (replace YOUR_PASSWORD)
bcrypt-cli hash YOUR_PASSWORD
\`\`\`

Then run Prisma Studio:
\`\`\`bash
npm run prisma:studio
\`\`\`

Create a user in the `users` table:
- id: (auto-generated)
- email: `admin@natsautomations.co.ke`
- password: `<paste_your_bcrypt_hash_here>`
- name: `Admin`
- role: `admin`

Or use SQL directly:
\`\`\`sql
-- First, generate hash of your password using bcrypt
-- Then insert user with that hash
INSERT INTO users (email, password, name, role, "createdAt", "updatedAt")
VALUES (
  'admin@natsautomations.co.ke',
  '$2a$10$YOUR_BCRYPT_HASH_HERE',
  'Admin',
  'admin',
  NOW(),
  NOW()
);
\`\`\`

### 5. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit:
- **Website:** http://localhost:3000
- **CRM Login:** http://localhost:3000/crm/login

## Common Issues & Solutions

### Issue: "Cannot find module 'next'"
**Solution:** Run `npm install` again and wait for it to complete.

### Issue: "Prisma Client not generated"
**Solution:** Run `npm run prisma:generate`

### Issue: "Database connection failed"
**Solution:** Check your DATABASE_URL in .env. Make sure PostgreSQL is running.

### Issue: "NextAuth configuration error"
**Solution:** Ensure NEXTAUTH_SECRET is set in .env

### Issue: "Cannot login to CRM"
**Solution:**
1. Check admin user exists in database
2. Verify password hash is correct
3. Check browser console for errors

## Production Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy on Vercel:**
   - Import repository
   - Add environment variables
   - Deploy

3. **Database:**
   - Use Supabase (free PostgreSQL)
   - Or Railway
   - Or Vercel Postgres

### Environment Variables for Production

Don't forget to set in your hosting platform:
- DATABASE_URL (from your database provider)
- NEXTAUTH_URL (your production domain)
- NEXTAUTH_SECRET (generate new one for production)
- SMTP_* (if using email)
- NEXT_PUBLIC_TAWK_* (if using live chat)

## Testing the Site

### Test Contact Form
1. Go to http://localhost:3000
2. Scroll to Contact section
3. Fill out form
4. Check CRM dashboard for new lead

### Test CRM
1. Go to http://localhost:3000/crm/login
2. Login with admin credentials
3. View leads
4. Update lead status
5. Test filters

## Customization Tips

### Change Brand Colors
Edit `tailwind.config.ts`:
\`\`\`typescript
colors: {
  primary: {
    500: '#YOUR_PRIMARY_COLOR',
  },
  secondary: {
    500: '#YOUR_SECONDARY_COLOR',
  },
}
\`\`\`

### Update Company Info
Edit `lib/utils.ts` - update:
- Services array
- Stats
- Contact information

### Add Real Images
1. Add images to `public/images/`
2. Update portfolio projects array
3. Replace emoji icons with real images/icons

### Enable Live Chat
1. Sign up at [Tawk.to](https://www.tawk.to)
2. Get Property ID and Widget ID
3. Add to `.env`:
   \`\`\`
   NEXT_PUBLIC_TAWK_PROPERTY_ID="your_property_id"
   NEXT_PUBLIC_TAWK_WIDGET_ID="your_widget_id"
   \`\`\`

## Need Help?

- Check the main README.md for detailed documentation
- Contact: info@natsautomations.co.ke
- Phone: +254 726 259 977

## Next Steps

After setup:
1. ✅ Customize colors and branding
2. ✅ Add real images
3. ✅ Update content
4. ✅ Test all features
5. ✅ Set up database backups
6. ✅ Enable HTTPS
7. ✅ Deploy to production
8. ✅ Change default admin password!
