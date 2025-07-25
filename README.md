# Next.js Quiz Application with Role-Based Authentication

A modern quiz management system built with Next.js 15, Redux Toolkit, and Tailwind CSS. This application provides a complete quiz platform with role-based authentication, allowing administrators, teachers, and students to manage and take quizzes.

## 🚀 Features

### Core Features
- **Role-Based Authentication**: Three user roles (Admin, Teacher, Student) with different access levels
- **Quiz Management**: Create, edit, delete, and manage quizzes
- **Quiz Taking**: Interactive quiz interface with real-time scoring
- **Dashboard**: Role-specific dashboards with relevant functionality
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Form Validation**: Client-side validation using Yup and React Hook Form
- **State Management**: Redux Toolkit with RTK Query for API calls
- **Persistent Authentication**: Redux Persist for maintaining user sessions

### User Roles & Permissions
- **Admin**: Full access to all features, can manage all quizzes and users
- **Teacher**: Can create, edit, and manage their own quizzes
- **Student**: Can view and take available quizzes

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages with role-based access
│   ├── login/            # Authentication pages
│   ├── signup/           # User registration
│   └── take-quiz/        # Quiz taking interface
├── components/           # Reusable UI components
├── middleware/           # Role-based access control
├── redux/               # State management
│   ├── features/api/    # RTK Query API slices
│   └── store.js         # Redux store configuration
└── utils/               # Utility functions
```

## 🔐 Authentication System

### Fixed User Accounts (For Demo)
The application uses fixed user accounts for demonstration purposes:

- **Admin**: `admin@bs.com` (any password)
- **Teacher**: `teacher@bs.com` (any password)  
- **Student**: Any other email (any password)

### Role-Based Access Control
- **RoleMiddleware**: Protects routes based on user roles
- **AdminMiddleware**: Specific middleware for admin-only routes
- **Automatic Redirects**: Users are redirected based on their role after login

### Authentication Flow
1. User enters credentials on login page
2. System validates email format and checks against fixed accounts
3. User role is determined based on email address
4. User is redirected to appropriate dashboard based on role
5. Session is maintained using Redux Persist

## 📊 Static Data Implementation

### Why Static Data?
Due to the lack of a backend database, the application uses:

1. **JSONPlaceholder API**: Mock REST API for CRUD operations
2. **Static Quiz Data**: Pre-defined quiz questions and answers
3. **Transform Functions**: RTK Query transforms API responses into quiz format

### Quiz Data Structure
```javascript
{
  id: 1,
  title: "Quiz Title",
  description: "Quiz description",
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2
    }
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## 🔌 API Implementation

### RTK Query Setup
The application is fully prepared for backend integration with:

- **Base URL Configuration**: Easy to change from mock to real API
- **CRUD Operations**: Complete set of API endpoints implemented
- **Error Handling**: Proper error handling and loading states
- **Cache Management**: Automatic cache invalidation and updates



### Ready for Backend Integration
All API calls are implemented and functional. To connect to a real backend:

1. Update `baseUrl` in API slices
2. Replace mock data with actual API responses
3. **Implement proper authentication tokens (Currently It'S built for Cookie based authentication)**
4. Update error handling for real API responses

## 📦 Package Dependencies

### Core Dependencies
- **Next.js 15.4.3**: React framework with App Router
- **React 19.1.0**: UI library
- **Redux Toolkit 2.8.2**: State management
- **React Redux 9.2.0**: React bindings for Redux
- **Redux Persist 6.0.0**: Session persistence

### Form & Validation
- **React Hook Form 7.61.1**: Form management
- **Yup 1.6.1**: Schema validation
- **@hookform/resolvers 5.1.1**: Form validation resolvers

### HTTP Client
- **Axios 1.11.0**: HTTP client for API calls

### Styling
- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎯 Current Status

### ✅ Fully Functional Features
- Complete authentication system
- Role-based access control
- Quiz management (CRUD operations)
- Quiz taking interface
- Responsive UI/UX
- Form validation
- State management
- API integration ready

### 🔄 Ready for Backend Integration
- All API endpoints implemented
- Error handling configured
- Loading states managed
- Data transformation ready
- Authentication flow complete

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository or contact the development team (bhuban.bogra@gmail.com).

---

**Note**: This application is currently using mock data and fixed user accounts for demonstration purposes. All features are functional and ready for backend integration.
