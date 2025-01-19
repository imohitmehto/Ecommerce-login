
# MERN E-Commerce Website with Google OAuth2 Authentication

This project is an e-commerce website built using the MERN stack (MongoDB, Express, React, Node.js). It implements a login and signup functionality with Google OAuth2 authentication. Users are authorized based on their roles, providing different views depending on their user type. If the user type is `user`, the product screen is accessible, and if the user type is `admin`, the admin dashboard is shown.

## Features

- **User Authentication:** Login and signup functionality.
- **Google OAuth2 Integration:** Users can log in using their Google accounts.
- **Role-Based Access Control:** 
  - `User`: Access the product screen.
  - `Admin`: Access the admin dashboard.
- **Secure Routes:** Only authorized users can access their respective dashboards.

## Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, Google OAuth2
- **Authorization:** Role-based access control

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-ecommerce
   cd mern-ecommerce
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the `backend` folder with the following keys:
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   JWT_SECRET=your-jwt-secret-key
   MONGO_URI=your-mongo-uri
   ```

5. Run the backend server:
   ```bash
   cd backend
   npm start
   ```

6. Run the frontend server:
   ```bash
   cd frontend
   npm start
   ```

7. Visit `http://localhost:3000` in your browser to view the application.

## How to Use

1. **Sign Up:** Use the signup form or Google login to create an account.
2. **Login:** Use the login form or Google login to authenticate.
3. **User Role:**
   - If you are assigned the role `user`, you will be redirected to the product screen.
   - If you are assigned the role `admin`, you will be redirected to the admin dashboard.

## API Endpoints

- `POST /api/auth/signup`: User sign-up endpoint.
- `POST /api/auth/login`: User login endpoint.
- `POST /api/auth/google`: Google OAuth2 login endpoint.

## Future Improvements

- Add password recovery feature.
- Implement more granular user roles and permissions.
- Improve UI/UX design.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
