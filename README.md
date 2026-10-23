# Employee Management App

A React Native application for managing employee information, built with TypeScript and Axios. This project is being developed incrementally to practise real-world mobile app development, API integration, and maintainable code organization.

## 🚀 Technologies

- **React Native** — Mobile application development
- **TypeScript** — Type safety and maintainable code
- **Axios** — HTTP requests and API communication
- **DummyJSON** — Fake REST API for development and practice
- **Git & GitHub** — Version control and source code management

## ✨ Planned Features

- [ ] Display a list of employees
- [ ] View individual employee details
- [ ] Add a new employee
- [ ] Edit employee information
- [ ] Delete an employee
- [ ] Search and filter employees
- [ ] Handle loading, empty, and error states

## 📁 Project Structure

```text
EmployeeApp/
├── src/
│   ├── services/
│   │   ├── api.ts
│   │   └── employeeServices.tsx
│   └── types/
│       └── employee.ts
├── App.tsx
├── package.json
└── README.md
```

The project structure will evolve as additional screens, reusable components, navigation, and utilities are implemented.

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

The API client is configured in `src/services/api.ts`, while employee-related API requests are organized in `src/services/employeeServices.tsx`.

The current implementation includes functions for retrieving the employee list and an individual employee.

**Note:** DummyJSON simulates create, update, and delete operations. These changes are not permanently saved on its server.

## 🧠 Learning Objectives

- Build a React Native application with TypeScript
- Organize API communication into a service layer
- Work with asynchronous requests using Axios
- Manage application state and API errors
- Implement CRUD operations
- Practise Git workflows and maintainable project architecture

## 📌 Project Status

**In development.** Features will be implemented and documented as the project progresses.

## 👤 Author

**Piyush Kumar**

GitHub: [piyush-kumar-07](https://github.com/piyush-kumar-07)
