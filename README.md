# Be Love - Event Registration System

An attractive, high-end registration website for the "Be Love" youth gathering.

## Features
- **Premium Design**: Valentines-themed aesthetics with glassmorphism, smooth animations (Framer Motion), and responsive layout.
- **Registration Form**: Fully functional form capturing all 10 required data points.
- **Automatic CSV Storage**: Data is saved to `server/registrations.csv` in real-time.
- **Admin Dashboard**: View all registrations, track counts, and view payment screenshots directly from the web interface.
- **UPI Integration**: Integrated QR code for easy ₹50 payment transfers.

## How to Make it Public (Access via Mobile)

### Option 1: Quick Tunnel (e.g., Localtunnel)
If you want to quickly show it to someone from your computer:
1. Ensure the server is running: `npm start`
2. In a new terminal, run:
   ```bash
   npx localtunnel --port 5000
   ```
3. It will give you a link (e.g., `https://random-words.loca.lt`). Anyone with this link can access your site from their mobile phone as long as your terminal is open.

### Option 2: Permanent Hosting (e.g., Render.com)
For a permanent public link:
1. Create a free account on [Render.com](https://render.com).
2. Create a "Web Service".
3. Connect your GitHub repository (or upload the code).
4. Set the build command to: `cd client && npm install && npm run build && cd ../server && npm install`
5. Set the start command to: `cd server && node server.js`
6. Render will provide a permanent `https://...onrender.com` link.

## Admin Access
To view the registration data:
- Click the **Admin Dashboard** button at the top right of the website.
- You can also view the data directly in `server/registrations.csv`.

## Folder Structure
- `client/`: React frontend source code and styles.
- `server/`: Express backend, registration handling, and CSV storage.
- `server/uploads/`: Folder where payment screenshots are stored.
- `server/registrations.csv`: The database file where all data is stored.
