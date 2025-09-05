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

---


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


---


# App report 



## 1. /Signup → <Signup />

Purpose: Allows new users to SignUp.

Content: Form for name, email, password, role needs to be adjusted from the database, admins can make others admin in a different page, and other profile info.

Access: Public.


---


## 2. /Login → <Login />

Purpose: Authentication page for users to log in.

Content: Form for username and password.redirect after login.

Access: Public.



## 3. / → <Index />

Purpose: This is the dashboard or home page for admins (protected by PrivateRoute).

Content: Shows key statistics (total events, revenue, bookings) and charts (ticket sales, top events). also shows upcoming events in a side.

Access: Admins only


---

## 4. / AddEvent → <AddEvent />

Purpose: Admin page to create a new event.

Content: Form with fields like name, date, time, venue, ticket price, seat count, description, and tags.

Access: Admin only.


---


## 5. EventDetails

Purpose: Shows detailed info about a specific event.

Content: Event description, date/time, venue, ticket info, participants, and maybe admin controls for editing and inspecting

Access: Admin only.


---


## 6. EditEvent

Purpose: Admin page to edit an existing event.

Content: Pre-filled form for updating event info.

Access: Admin.




## 7. ManageEvent

Purpose: Allows admins to manage all events.

Content: A list of events with options to edit, delete, or view details. includes filtering/search features.

Access: Admin only.


---


## 8. AttendeesDetails


Purpose: Shows detailed info about attendees for a specific event.

Content: table listing attendees, with booking status.

Access: Admin only.


---



## 9. AttendeesInsight

Purpose: Displays analytics about attendees.

Content: Charts or summaries showing attendee demographics, event popularity, or ticket sales.

Access: Admin only.

---

## 10. /ManageUsers → <ManageUsers />

Purpose: Admin page to manage users.

Content: List of users with roles, option to edit roles and their details, or see user details.

Access: Admin only.

---

## 11. BookingTickets

Purpose: Page where users can book tickets for events.

Content: List of available events with ticket prices, seat availability, and join button.

Access: All logged-in users.


---


## 12. MyBooking

Purpose: Lets a user view their booked events.

Content: Shows tickets they have purchased, with QR codes, dates, and event details.

Access: Logged-in users.


---


## 13. ExportData

Purpose: Allows admin to export or import user and event data.

Content: Buttons to download users/events as Excel or upload Excel to import data.

Access: Admin only.










