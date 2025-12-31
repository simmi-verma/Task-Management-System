# Task Management System



A comprehensive **Task Management System** built with the **MERN stack** (MongoDB, Express.js, React, Node.js) as part of a coding assignment. This application features role-based authentication, task assignment, priority management, and real-time status updates with pagination and AJAX functionality.

## 🎯 Project Overview

This project was developed to fulfill specific requirements for a task management system that enables:
- **Admins** to create, assign, and manage tasks with priority levels
- **Users** to view, update, and track their assigned tasks
- Role-based access control with secure authentication
- Visual priority indicators with color-coded lists
- Efficient task handling with pagination and AJAX

---

## ✨ Features

### 🔐 User Authentication
- **Secure registration and login** with JWT-based authentication
- **Password encryption** using bcrypt
- **Role-based access control** (Admin & User roles)
- **Profile management** for logged-in users

### 👨‍💼 Admin Capabilities
- ✅ **Task Creation** - Create tasks with title, description, due date, and priority
- ✅ **Task Assignment** - Assign tasks to specific users
- ✅ **User Management** - Add/remove users from the system
- ✅ **Task Editing** - Update task details including title, description, and due date
- ✅ **Task Deletion** - Remove tasks with confirmation dialogue
- ✅ **Priority Management** - Move tasks between priority lists (High, Medium, Low)
- ✅ **Complete Task Overview** - View all tasks with filtering and sorting
- ✅ **Pagination Support** - Navigate through tasks efficiently

### 👤 User Capabilities
- ✅ **Assigned Tasks View** - See only tasks assigned to them
- ✅ **Task Status Updates** - Mark tasks as "Pending", "In Progress", or "Completed"
- ✅ **Task Details** - View complete task information including description and due date
- ✅ **Priority Visibility** - See task priorities with color-coded indicators
- ✅ **Personal Dashboard** - Dedicated view for assigned tasks

### 🎨 Visual Features
- **Color-Coded Priority Lists**
  - 🔴 **High Priority** - Red indicators
  - 🟡 **Medium Priority** - Yellow/Orange indicators
  - 🟢 **Low Priority** - Green indicators
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Intuitive UI** - Clean and modern interface for easy navigation

---

## 🛠️ Technologies Used

### Frontend
- **React.js** - Component-based UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and animations
- **AJAX** - Asynchronous data loading

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

---

## 📁 Project Structure

```
Task-Management-System/
│
├── server/                      # Backend folder
│   ├── models/                  # Database models
│   │   ├── User.js             # User model
│   │   └── Task.js             # Task model
│   ├── routes/                  # API routes
│   │   ├── auth.js             # Authentication routes
│   │   └── tasks.js            # Task management routes
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js             # JWT verification
│   │   └── admin.js            # Admin authorization
│   ├── server.js               # Entry point
│   ├── package.json            # Backend dependencies
│   └── .env                    # Environment variables
│
├── frontend/                    # Frontend folder
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Dashboard.js    # Admin dashboard
│   │   │   ├── CreateTask.js   # Task creation form
│   │   │   ├── EditTask.js     # Task editing form
│   │   │   ├── TaskDetails.js  # Task detail view
│   │   │   ├── MyTasks.js      # User task view
│   │   │   └── Login.js        # Authentication
│   │   ├── services/           # API services
│   │   │   └── api.js          # Axios configuration
│   │   └── styles/             # CSS files
│   ├── package.json            # Frontend dependencies
│   └── public/                 # Static assets
│
└── README.md                    # Project documentation
```

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local installation or MongoDB Atlas)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to the server folder:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the server folder:**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/users` | Get all users | Admin |
| GET | `/api/auth/profile` | Get current user profile | Authenticated |

### Task Management Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/tasks` | Create a new task | Admin |
| GET | `/api/tasks` | Get all tasks (with pagination) | Admin |
| GET | `/api/tasks/:id` | Get task details | Authenticated |
| PUT | `/api/tasks/:id` | Update task | Admin |
| DELETE | `/api/tasks/:id` | Delete task | Admin |
| PATCH | `/api/tasks/:id/status` | Update task status | User/Admin |
| PATCH | `/api/tasks/:id/priority` | Update task priority | Admin |
| GET | `/api/tasks/my-tasks` | Get logged-in user's tasks | User |

---

## 💡 Usage Guide

### For Admins

1. **Login** with admin credentials
2. **Dashboard** displays all tasks with pagination
3. **Create Task:**
   - Click "+ New Task" button
   - Fill in title, description, due date, and priority
   - Assign task to a user
   - Submit to create the task
4. **Edit Task:**
   - Click "Edit" button on any task
   - Modify task details
   - Save changes
5. **Delete Task:**
   - Click "Delete" button
   - Confirm deletion in the dialogue box
6. **Manage Priorities:**
   - Move tasks between High, Medium, and Low priority lists
   - Visual color indicators help identify priorities quickly

### For Users

1. **Login** with user credentials
2. **My Tasks** page shows all assigned tasks
3. **View Task Details:**
   - Click on any task to see full description, due date, priority, and assigned user
4. **Update Status:**
   - Change task status between Pending, In Progress, and Completed
   - Status updates reflect immediately
5. **Priority View:**
   - Tasks are color-coded by priority for easy identification

---

## 🎨 Color Coding System

The application uses visual indicators for quick task identification:

- **🔴 High Priority** - Red background/border
- **🟡 Medium Priority** - Yellow/Orange background/border
- **🟢 Low Priority** - Green background/border

This color-coding appears in:
- Task cards
- Priority badges
- List views
- Task details page

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Passwords encrypted with bcrypt
- **Protected Routes** - Middleware-based route protection
- **Role-Based Access** - Admin and user role separation
- **HTTP-Only Cookies** - Secure token storage (if implemented)


## 🎥 Demo Video

A detailed walkthrough video (5-10 minutes) demonstrating all features is available, covering:
- Task creation and assignment process
- Admin dashboard functionality
- User task management
- Priority system implementation
- Status update workflow
- Final production output

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add YourFeature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Simmi Verma**
- GitHub: [@simmi-verma](https://github.com/simmi-verma)

---

##  Acknowledgments

- Assignment provided by the hiring team
- Built as part of a coding assessment
- MERN stack community for excellent documentation
- All contributors and testers

**Note:** This project was created as part of a coding assignment and demonstrates proficiency in full-stack development using the MERN stack with focus on authentication, authorization, CRUD operations, and responsive UI design.
