# EventX Management App

EventX is a full-stack web application for managing and attending events. Users can browse, book, and pay for events, while admins can manage events, view analytics, and export/import data.


## Features

- User authentication and role-based access (Admin/User)
- Browse and book events with ticketing system
- QR code generation for tickets
- Admin dashboard with analytics (attendees, revenue, top events)
- Export and import data (users & events) via Excel
- Responsive UI with sidebar navigation


---

## Tech Stack

- **Frontend:** React 18, React Router 7, Recharts, XLSX, FileSaver
- **Backend:** Node.js 22.x, Express 5, MongoDB, Mongoose 8, bcryptjs, JWT
- **Other:** concurrently, dotenv, cors


---

## Prerequisites

- Node.js >= 22.x
- npm >= 9.x
- MongoDB running locally (default port 27017)


---

## Project Structure

react-final-project/
├─ backend/
│ ├─ models/ # Mongoose models
│ ├─ routes/ # API routes
│ ├─ seed.js # Seed database
│ ├─ exportDB.js # Export database
│ ├─ seedDB.js # takes the exported database file and inserts it
│ ├─ server.js # Express server
│ ├─ db.js # connects you to the database which is mongoDB in this case
│ ├─ middleware/
│ ├─    └─ auth.js # for authentication functions
│ └─ package.json
├─ frontend/
│ ├─public # has the main html file that react works from
│ ├─ src/
│ │ ├─ components/ # React components
│ │ ├─ pages/ # React pages
│ │ ├─ materials # svg and icons needed in the frontEnd
│ │ ├─ index.js
│ │ └─ App.js
│ └─ package.json
└─ package.json # Project root (concurrently setup)


---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/react-final-project.git
cd react-final-project
```


### 2. Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd ../frontend
npm install
```



### 3. Environment Variables

Create a .env file inside backend/ with the following:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/EventX
JWT_SECRET=your_secret_key_here
REACT_APP_API_URL=http://localhost:5000
```


### 4. Running the Application

From the project root (runs both backend and frontend concurrently):


```bash
npm run dev
```

Backend: http://localhost:5000
Frontend: http://localhost:3000


#### Database Scripts

Seeding Database
Seeds default users and events (if not already present):

```bash
cd backend
npm run seed
```

#### Exporting Database

Exports all users and events to /backend/seed-data/database.json:

```bash
cd backend
node exportDB.js
```

#### Importing Data

Admins can import previously exported Excel files via the Export Data page in the frontend.

#### Scripts Reference

```bash
"scripts": {
  "dev": "concurrently \"npm run start --prefix backend\" \"npm start --prefix frontend\""
}
```

#### Backend package.json


```bash
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seed.js"
}
```

#### Frontend package.json

```bash
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## Notes

Tested with Node.js 22.x, npm 9.x, MongoDB 6.x, React 18.3.

Make sure MongoDB is running locally before starting the app.

Excel import/export only supports .xlsx files.


