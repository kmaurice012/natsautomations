# 🚀 Quick Database Setup Guide

## Option 1: Get Prisma Console Direct URL

1. Visit: https://console.prisma.io
2. Sign in to your account
3. Select your project
4. Find "Connection Strings" or "Database" section
5. Copy the **Direct Database URL** (starts with postgresql://)
6. Update `.env` file:
   ```bash
   DIRECT_DATABASE_URL="postgresql://your-actual-url-here"
   ```

---

## Option 2: Create Free Neon Database (2 minutes)

### Step 1: Create Neon Account
1. Go to: https://neon.tech
2. Sign up with GitHub/Google (free)
3. Create a new project: "Nats Automations"

### Step 2: Get Connection Strings
After creating the project, you'll see:
- **Pooled Connection** (for queries)
- **Direct Connection** (for migrations)

### Step 3: Update .env
```bash
# Use the Pooled connection for DATABASE_URL (if not using Accelerate)
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/natsdb?sslmode=require"

# Use the Direct connection for DIRECT_DATABASE_URL
DIRECT_DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/natsdb?sslmode=require"
```

### Step 4: Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 5: Restart Dev Server
```bash
npm run dev
```

---

## Option 3: Supabase Database (Alternative)

1. Go to: https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Update .env with both URLs
5. Run migrations

---

## Troubleshooting

**Error: Can't reach database server at localhost:5432**
- Your DIRECT_DATABASE_URL is still pointing to localhost
- Update it with the real database URL from your provider

**Error: P1001**
- Database server is not accessible
- Check if connection string is correct
- Ensure SSL mode is set if required

---

## Test Connection

After updating .env, test the connection:
```bash
# Test database connection
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

If successful, you'll see your database tables in Prisma Studio! 🎉
