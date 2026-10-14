# Lost & Found Campus Portal

A campus lost-and-found website with an Express API, faculty authentication, and JSON-file persistence.

## Requirements

- Node.js
- npm

## Run locally

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Create a local environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Set `JWT_SECRET` in `.env` to a private, randomly generated value. For example:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. Start the server:

   ```powershell
   npm start
   ```

Open <http://localhost:3000>. The API health endpoint is <http://localhost:3000/api/health>.

The server creates its data and uploads directories as needed. Local `.env` files, uploaded files, and JSON records are ignored by Git so secrets and user data are not published.
