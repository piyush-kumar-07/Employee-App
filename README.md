# Employee Management App

A React Native application for managing employee information, built with TypeScript, Axios, and Redux Toolkit. This project is being developed incrementally to practise real-world mobile app development, API integration, centralized state management, CRUD operations, and maintainable code organization.

## 🚀 Technologies

- **React Native** — Mobile application development
- **TypeScript** — Type safety and maintainable code
- **Axios** — HTTP requests and API communication
- **Redux Toolkit** — Centralized application state management
- **DummyJSON** — Fake REST API for development and practice
- **React Navigation** — Screen navigation
- **Git & GitHub** — Version control and source code management

## ✨ Features

- [x] Fetch and display employees from an API
- [x] View individual employee details
- [x] Add new employees
- [x] Edit employee information
- [x] Delete employees
- [x] Search employees by name, email, and department
- [x] Form validation
- [x] Loading and error states
- [x] Pull-to-refresh employee list
- [x] Organized API service layer
- [ ] Redux Toolkit integration
- [ ] Persistent employee data storage

## 📁 Project Structure

```text
EmployeeApp/
├── src/
│   ├── navigation/
│   ├── screens/
│   │   └── employees/
│   │       ├── EmployeeListScreen.tsx
│   │       ├── EmployeeDetailsScreen.tsx
│   │       ├── AddEmployeeScreen.tsx
│   │       └── EditEmployeeScreen.tsx
│   ├── services/
│   │   ├── api.ts
│   │   └── employeeServices.ts
│   └── types/
│       └── employee.ts
├── App.tsx
├── package.json
└── README.md
```

*The project structure will evolve as Redux Toolkit, reusable components, and additional features are introduced.*

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- React Native development environment
- Android Studio and an Android emulator, or a compatible Android device

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/piyush-kumar-07/Employee-App.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Employee-App
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start Metro:

   ```bash
   npm start
   ```

5. In a separate terminal, run the Android application:

   ```bash
   npm run android
   ```

## 🌐 API Integration

The application uses [DummyJSON](https://dummyjson.com/users) as a fake REST API for employee data.

The API client is configured in `src/services/api.ts`, while employee-related API requests are organized in `src/services/employeeServices.ts`.

The service layer handles:

- Fetching employees
- Fetching an employee by ID
- Creating an employee
- Updating employee information
- Deleting an employee

**Note:** DummyJSON simulates create, update, and delete operations. These changes are not permanently saved on its server. Local application state is used to reflect changes during the current app session.

## 🧠 Learning Objectives

- Build a React Native application using TypeScript
- Understand component-based architecture
- Implement navigation between screens
- Organize API communication using a service layer
- Handle asynchronous requests using Axios
- Manage centralized application state with Redux Toolkit
- Implement CRUD operations
- Apply form validation
- Practise Git workflows and maintainable project architecture

## 📌 Project Status

**In development.**

The application currently supports employee listing, details, adding, editing, deleting, and searching. Redux Toolkit integration and persistent data storage are planned next.

## 👤 Author

**Piyush Kumar**

- GitHub: [piyush-kumar-07](https://github.com/piyush-kumar-07)
- Repository: [Employee Management App](https://github.com/piyush-kumar-07/Employee-App)
