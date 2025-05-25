# ToDo App with MERN Stack and JWT Authentication

A complete ToDo application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT authentication.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete tasks
- Filter tasks by status and priority
- Sort tasks by different criteria
- Mark tasks as completed
- Responsive design for mobile and desktop

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React.js
- React Router for routing
- Context API for state management
- Axios for API requests
- CSS for styling

## Project Structure

The project is divided into two main parts:

### Backend (Server)
```
todo-app-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

### Frontend (Client)
```
todo-app-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── tasks/
│   │   └── ui/
│   ├── context/
│   │   ├── auth/
│   │   └── task/
│   ├── pages/
│   ├── utils/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-app-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../todo-app-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to http://localhost:3000

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login a user
- **GET /api/auth/me** - Get current logged-in user
- **GET /api/auth/logout** - Logout user

### Tasks

- **GET /api/tasks** - Get all tasks for authenticated user
- **GET /api/tasks/:id** - Get a specific task by ID
- **POST /api/tasks** - Create a new task
- **PUT /api/tasks/:id** - Update a task
- **DELETE /api/tasks/:id** - Delete a task

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the following settings:
    - Name: todo-app-backend
    - Environment: Node
    - Build Command: `npm install`
    - Start Command: `node server.js`
4. Add environment variables (from your .env file)
5. Click "Create Web Service"

### Frontend Deployment (Netlify)

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Configure the build settings:
    - Build Command: `npm run build`
    - Publish Directory: `build`
4. Add environment variables
5. Click "Deploy Site"

## Testing with Postman

A Postman collection is included in the repository. To use it:

1. Import the `TodoApp.postman_collection.json` file into Postman
2. Update the `baseUrl` variable to match your API URL
3. After registering/logging in, update the `token` variable with your JWT token
4. Test the different API endpoints

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [JWT](https://jwt.io/)