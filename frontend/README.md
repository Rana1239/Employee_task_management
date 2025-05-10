# Employee Task Management

## Overview
This is an **Employee Task Management** system built using **React, Vite, Tailwind CSS, and SweetAlert2**. The application allows admins to manage employees and tasks while employees can update their task statuses.

**Live Demo**: [(https://employee-task-management-system-frontend.vercel.app/)](#) 

## Features
### Admin Features:
- View all employees and their assigned tasks.
- Modify employee roles.
- Delete employees.
- Delete tasks.

### Employee Features:
- View assigned tasks.
- Mark tasks as **In progress**, **Failed**, or **Completed**.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **State Management**: React Context API
- **UI Enhancements**: SweetAlert2, React Icons

## Dashboard
The **Dashboard Page** serves as the central hub for both admins and employees:
- **Admin View**:
  - See an overview of all employees' tasks.
  - View task statistics with color-coded cards using `TasksOverview.jsx`.
  - Navigate to employee management and task modification options.
- **Employee View**:
  - See only their assigned tasks.
  - Update task statuses dynamically.

## All Tasks Page
The **All Tasks Page** provides a detailed view of all tasks, including:
- **Filter and Sort Options**:
  - Filter tasks by status (`Pending`, `In Progress`, `Completed`).
- **Task Status Management**:
  - Employees can update their task statuses directly.
  - Admins can delete tasks if needed.

## Responsiveness
- The application is fully **responsive**, adapting to different screen sizes.
- The **sidebar navigation** and **dashboard cards** adjust for mobile layouts.
- **Task management buttons** remain accessible on small screens.

## Installation & Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/employee-task-management.git
   cd employee-task-management
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Run the Development Server**
   ```bash
   npm run dev
   ```
4. **Open in Browser**
   Navigate to `http://localhost:5173/` in your browser.

## Future Improvements
- Implement backend with **Node.js & MongoDB**.
- Add authentication for secure access.
- Enhance UI/UX with better animations.
