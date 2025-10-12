// Simple script to create an admin user
// Run with: node scripts/create-admin.js

const bcrypt = require('bcryptjs');

async function createHash() {
  const password = 'admin123'; // Change this!
  const hash = await bcrypt.hash(password, 10);

  console.log('\n=== Admin User Setup ===\n');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nCopy this SQL to create admin user:\n');

  console.log(`
INSERT INTO users (email, password, name, role, "createdAt", "updatedAt")
VALUES (
  'admin@natsautomations.co.ke',
  '${hash}',
  'Admin',
  'admin',
  NOW(),
  NOW()
);
  `);

  console.log('\nOr use Prisma Studio: npm run prisma:studio\n');
}

createHash().catch(console.error);
