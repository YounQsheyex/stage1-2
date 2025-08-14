Task Management API

A **Node.js + Express + MongoDB** backend for managing tasks with **JWT authentication** and **role-based access control**.  
Supports admin and user roles, with admins automatically able to access user routes.

---

## Features

- **User Authentication**
  - Register(fullName,email,userName&password) & Login using username and password
  - Secure password hashing with bcryptjs
  - JWT token generation & verification
- **Role-Based Access Control**
  - admin can access both admin and user routes
  - user has restricted access
- **Task Management**
  - Create, read, update, and delete tasks
  - Each task is linked to its creator (admin field)
- **Error Handling**
  - Centralized error responses with meaningful messages

---

## Technologies Used

- **Node.js** — JavaScript runtime
- **Express.js** — Backend framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **jsonwebtoken** — JWT authentication
- **bcryptjs** — Password hashing
- **dotenv** — Environment variable management

project/

index.js # MongoDB connection setup

controllers/
taskController.js # TASKk CRUD logic
authController.js # Auth and user logic

middleware/
authMiddleware.js # JWT verification & role checks

models/
taskModel.js # Task schema
authModel.js # User schema

routes/
taskRoutes.js # Task endpoints
authRoutes.js # Auth endpoints│
.env # Environment variables

API ENDPOINTS
AUTH-{REGISTER & LOGIN}
| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   |  /api/auth/sign-up    | Register a new user           |
| GET    |  /api/auth/sign-in    | Login and receive a JWT token |

TASK PROTECTED
| Method |      Endpoint            | Role       | Description       |
| ------ | ---------------------    | ---------- | ----------------- |
| POST   |   /api/task/newTask      | admin      | Create a new task |
| GET    |   /api/task/allTask      | user/admin | Get all tasks     |
| GET    | /api/task/singleTask/:id | admin      | View a task     |
| PATCH  | /api/task/editTask/:id   | admin      | update a task     |
| DELETE | /api/task/deleteTask/:id | admin      | Delete a task     |
