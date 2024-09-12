const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const runMigrations = () => {
  const migrationCommand = 'pnpm run migrate:up'; // Adjust this to your actual migration command
  const migrationPath = path.join(__dirname, 'backend');

  console.log(`Executing migration command: ${migrationCommand}`);
  console.log(`In directory: ${migrationPath}`);

  console.log('PATH:', process.env.PATH);
  console.log('Current directory:', process.cwd());
  console.log('Directory contents:', fs.readdirSync('.'));

  try {
    const pnpmVersion = execSync('pnpm --version').toString();
    console.log('pnpm version:', pnpmVersion);
  } catch (error) {
    console.error('Error checking pnpm version:', error.message);
  }

  try {
    const child = execSync('pnpm run migration:run:local');
    console.log('Migration:run:local output:', child.toString());
  } catch (error) {
    console.error('Error running migration:run:local:', error.message);
  }

  try {
    const child = execSync('export NODE_ENV=migrations && pnpm run migration:run');
    console.log('Migration:run output:', child.toString());
  } catch (error) {
    console.error(`Migration error: ${error.message}`);
    throw error;
  }
};

const waitForDb = () => {
  return new Promise((resolve) => {
    const checkDb = () => {
      const { Client } = require('pg');
      const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      client.connect((err) => {
        if (err) {
          console.log('DB not ready, retrying in 5 seconds...');
          console.log(`Connection error: ${err.message}`);
          setTimeout(checkDb, 5000);
        } else {
          console.log('DB is ready');
          client.end();
          resolve();
        }
      });
    };

    checkDb();
  });
};

const main = async () => {
  try {
    await waitForDb();
    await runMigrations();
  } catch (error) {
    console.error('Migration script failed:', error);
    process.exit(1);
  }
};

main();