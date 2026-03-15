# 🚀 Modern Task Management Application

A professional, full-stack task management web application featuring a stunning glassmorphism UI, real-time statistics, and smooth animations. Built with modern web technologies for an exceptional user experience.

![Task Manager Preview](https://img.shields.io/badge/Status-Professional-blue?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-Modern-orange?style=for-the-badge)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Design** - Beautiful frosted glass effects with backdrop blur
- **Gradient Backgrounds** - Dynamic animated gradients and color schemes
- **Smooth Animations** - Professional transitions and micro-interactions
- **Responsive Design** - Works perfectly on all devices

### 📊 **Real-time Dashboard**
- **Live Statistics** - Total, Pending, In Progress, and Completed task counters
- **Animated Stat Cards** - Hover effects with gradient icons
- **Progress Indicators** - Visual feedback for all operations

### ⚡ **Dynamic Interactions**
- **Toast Notifications** - Success, error, and info messages
- **Loading States** - Spinners and progress bars for better UX
- **Form Validation** - Real-time input validation with visual feedback
- **Keyboard Shortcuts** - Ctrl+Enter to quickly add tasks

### 🔧 **Full CRUD Operations**
- **Create Tasks** - Add new tasks with title, description, and status
- **Read Tasks** - View all tasks with beautiful card layouts
- **Update Tasks** - Edit existing tasks inline
- **Delete Tasks** - Safe deletion with confirmation dialogs

### 🎯 **Professional Features**
- **Status Tracking** - Pending, In Progress, Completed with color coding
- **Search & Filter** - Easy task management
- **Data Persistence** - SQLite database for reliable storage
- **Error Handling** - Graceful error management with user feedback

## 🛠️ Tech Stack

### **Frontend**
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with animations and effects
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **Font Awesome 6.4.0** - Professional icon library

### **Backend**
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, minimalist web framework
- **SQLite3** - Lightweight, file-based database
- **Body-parser** - Request body parsing middleware
- **CORS** - Cross-origin resource sharing

### **Development Tools**
- **Nodemon** - Automatic server restart during development
- **Live Reload** - Instant UI updates during development

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-task-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3001
   ```

### Development Mode
```bash
npm run dev
```
This starts the server with auto-restart on file changes.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Retrieve all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Request/Response Examples

**Create Task:**
```json
POST /api/tasks
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "in-progress"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "in-progress",
  "created_at": "2026-03-15T10:30:00.000Z"
}
```

## 📁 Project Structure

```
simple-task-app/
├── 📄 server.js              # Express server with API routes
├── 📄 package.json           # Dependencies and npm scripts
├── 📄 README.md              # Project documentation
├── 📄 tasks.db               # SQLite database (auto-generated)
├── 📁 public/                # Frontend assets
│   ├── 📄 index.html         # Main application page
│   ├── 📄 styles.css         # Modern CSS with animations
│   └── 📄 script.js          # Frontend JavaScript logic
└── 📁 node_modules/          # Dependencies (auto-generated)
```

## 🎨 Design System

### **Color Palette**
- **Primary**: `#667eea` to `#764ba2` (Purple gradient)
- **Secondary**: `#2196f3` to `#00bcd4` (Blue gradient)
- **Success**: `#4caf50` to `#8bc34a` (Green gradient)
- **Warning**: `#ff9800` to `#ff5722` (Orange gradient)
- **Error**: `#f44336` to `#e53935` (Red gradient)

### **Typography**
- **Primary Font**: Segoe UI, system fonts
- **Headings**: 700 weight, gradient text effects
- **Body**: 400-500 weight, optimized readability

### **Animations**
- **Duration**: 0.3s - 0.8s for smooth transitions
- **Easing**: Cubic-bezier curves for professional feel
- **Stagger**: Sequential animations for list items

## 🔧 Configuration

### **Server Configuration**
```javascript
const PORT = process.env.PORT || 3001;
const DB_PATH = './tasks.db';
```

### **Environment Variables**
Create a `.env` file for custom configuration:
```env
PORT=3001
NODE_ENV=development
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find process using port 3001
netstat -ano | findstr :3001
# Kill the process
taskkill /PID <PID> /F
```

**Database issues:**
```bash
# Delete and recreate database
rm tasks.db
npm start  # Will recreate database
```

**Permission errors:**
```bash
# Run with elevated privileges
sudo npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for the beautiful icon library
- **Express.js** for the robust web framework
- **SQLite** for the reliable database solution
- **Modern CSS** techniques and inspiration from various design systems

---

**Built with ❤️ using modern web technologies**

*Last updated: March 15, 2026*
    ├── styles.css    # CSS styles
    └── script.js     # Frontend JavaScript
```

## Usage

1. Enter a task title (required)
2. Add an optional description
3. Select a status
4. Click "Add Task"
5. Tasks appear in the list below
6. Use Edit to modify tasks
7. Use Delete to remove tasks

The application uses a simple SQLite database that is created automatically when you first run the server.