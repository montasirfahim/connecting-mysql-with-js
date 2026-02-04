# MySQL + Node.js User Registration Example

Features:
- Register a user (name, email, password)
- View list of all users

Prereqs:
- Node.js installed
- MySQL server running (Default port on 3306 OR port on 3307)


Details Guideline: Find the pdf file inside this repository
- Guideline-MySQL-NodeJs.pdf

Setup:

1. Install dependencies

```bash
npm install
```

2. Create the database and table (replace `-u root` and `-p` with your credentials). This uses port 3306:

```bash
mysql -u root -P 3306 -p -e "CREATE DATABASE IF NOT EXISTS myappdb; USE myappdb; CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
```

Or, run the mysql client then paste the SQL:

```sql
CREATE DATABASE IF NOT EXISTS myappdb;
USE myappdb;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Create a `.env` file from `.env.example` and adjust credentials.

4. Start the app

```bash
npm start
# or
node index.js
```

Open http://localhost:3000 and register users. The app connects to MySQL on port 3307 by default (see `.env.example`).
