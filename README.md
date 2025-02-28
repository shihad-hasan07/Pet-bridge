# Pet Adoption Platform

## Project Overview

This is a MERN stack-based pet adoption platform that connects pet lovers with pets in need of a home. The platform allows users to browse pets, submit adoption requests, create and manage donation campaigns, and interact with the community. Admins have additional privileges for managing users, pets, and donations.

## Live Site

[Live Demo](#) (https://pet-bridge.web.app)

## Features

- **Authentication & Authorization:** Secure login and registration using Firebase authentication (Email/Password, Google, GitHub, etc.)
- **Pet Listing:** Users can browse available pets with search and filtering options
- **Pet Adoption:** Users can request to adopt a pet via a form
- **Donation System:** Users can create and participate in donation campaigns using Stripe
- **User Dashboard:** Manage added pets, adoption requests, and donations
- **Admin Dashboard:** Manage users, pets, and donations with elevated privileges
- **Responsive Design:** Fully responsive for mobile, tablet, and desktop
- **Dark Mode Support:** Toggle between light and dark mode
- **Protected Routes:** Role-based access control for users and admins

## Technologies Used

### Frontend

- React.js (Vite)
- React Router DOM
- TanStack Query (React Query)
- Tailwind CSS & ShadCN UI
- React Hook Form & Formik

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- Firebase Authentication
- JWT for secure authentication
- Stripe for Payment Integration
- dotenv for environment variables

## Installation & Setup

### Prerequisites

- Node.js and npm installed
- MongoDB database setup
- Firebase project created with authentication enabled

### Setup Instructions

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/pet-adoption-platform.git
   cd pet-adoption-platform
   ```
2. **Install Dependencies:**
   ```sh
   npm install  # for frontend
   cd server && npm install  # for backend
   ```
3. **Create Environment Variables:**
   - Create a `.env` file in both `client` and `server` directories
   - Add Firebase and MongoDB credentials
   - Secure API keys
4. **Run the Application:**
   ```sh
   npm run dev  # for frontend
   cd server && npm run start  # for backend
   ```

## API Endpoints

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| GET    | /api/pets      | Fetch all available pets     |
| GET    | /api/pets/\:id | Fetch pet details            |
| POST   | /api/pets      | Add a new pet                |
| PUT    | /api/pets/\:id | Update pet details           |
| DELETE | /api/pets/\:id | Remove a pet                 |
| POST   | /api/adopt     | Submit an adoption request   |
| GET    | /api/donations | Fetch all donation campaigns |
| POST   | /api/donate    | Make a donation              |
| GET    | /api/users     | Fetch user list (Admin)      |

## Deployment

- **Frontend:** Firebae hosting
- **Backend:** Vercel
- **Database:** MongoDB Atlas

---

Feel free to modify as needed! 🚀
