# 🧠 JS-CMS Admin Dashboard

A responsive and feature-rich admin dashboard for managing users and courses. This project is built with **HTML**, **CSS**, and **JavaScript**, and it interacts with a public API to perform CRUD operations on courses and users.

## 📦 Features

- **User Management**
  - View paginated list of users
  - Ban (delete) users
  - Display latest registered users

- **Course Management**
  - Create, read, update, and delete courses
  - Pagination and dynamic content rendering
  - Toast notification feedback
  - Modal dialogs for course operations

- **Dashboard Overview**
  - Display key metrics (total users, courses, admins, tickets)
  - Latest users preview
  - Recently added courses preview
  - Responsive sidebar toggle

## 📁 Project Structure

```
.
├── index.html                # Dashboard overview
├── dashboard/
│   ├── users/
│   │   └── index.html        # User management
│   └── courses/
│       └── index.html        # Course management
├── public/
│   ├── css/
│   │   ├── reset.css
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js            # Main dashboard logic (users + overview + interactions)
│   │   ├── users.js          # Handles user data operations
│   │   └── courses.js        # Handles course data operations
│   └── images/
│       └── logo.png
```

## 🛠️ Technologies

- HTML5  
- CSS3  
- JavaScript (Vanilla)  
- Font Awesome (Icons)  
- RESTful API integration (with [Liara API](https://js-cms.iran.liara.run))

## 🔌 API Endpoints

| Endpoint            | Method | Description           |
|---------------------|--------|-----------------------|
| `/api/users`        | GET    | Get all users         |
| `/api/users/:id`    | DELETE | Delete user by ID     |
| `/api/courses`      | GET    | Get all courses       |
| `/api/courses`      | POST   | Create new course     |
| `/api/courses/:id`  | PUT    | Edit course by ID     |
| `/api/courses/:id`  | DELETE | Delete course by ID   |

## ⚙️ Functionality Highlights

### 👥 User Operations

- Dynamic rendering of users (6 per page)
- Paginated navigation
- Modal confirmation for banning users

### 📚 Course Operations

- Add, edit, or delete course entries
- Edit modal pre-fills existing data
- Toast notification system for feedback
- Pagination for browsing courses

### 🎨 UI/UX Enhancements

- Clean and minimal RTL layout
- Responsive design
- Sidebar navigation
- Breadcrumb navigation
- Animated toast and modal transitions

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Open `index.html` in your browser.

> ⚠️ Make sure you have internet access to load Font Awesome CDN and access the external API.

## 🖼️ Screenshots

| Dashboard | Courses Page | Users Page |
|----------|--------------|------------|
| ![](./screenshots/dashboard.png) | ![](./screenshots/courses.png) | ![](./screenshots/users.png) |

## 👨‍💻 Author

Developed with 💙 by [Erfan](https://github.com/erfan-ne)
