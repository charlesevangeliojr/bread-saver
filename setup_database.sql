-- Connect to PostgreSQL and run these commands in psql

-- 1. Create the database for Bread Saver
CREATE DATABASE bread_saver_db;

-- 2. Create a dedicated user for the application
CREATE USER bread_saver_user WITH PASSWORD 'bread_saver_2024';

-- 3. Grant all privileges to the user on the database
GRANT ALL PRIVILEGES ON DATABASE bread_saver_db TO bread_saver_user;

-- 4. Connect to the new database and grant schema privileges
-- (Run these commands after connecting to bread_saver_db)
\c bread_saver_db;

-- 5. Grant schema privileges
GRANT ALL ON SCHEMA public TO bread_saver_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO bread_saver_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO bread_saver_user;

-- 6. Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO bread_saver_user;

-- 7. Verify the database was created
\l

-- 8. Verify the user was created
\du

-- Exit psql when done
\q
