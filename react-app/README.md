# EDABIP — React + TypeScript Login Page

## Project Overview

EDABIP stands for **Enterprise Data Analytics and Business Intelligence Platform**.

This project rebuilds the EDABIP login page using React and TypeScript. It follows a reusable component-based structure and includes form validation, demo authentication, session persistence, protected routes, and a responsive dashboard placeholder.

## Task Details

- **Project:** EDABIP
- **Task:** Task 3 — React + TypeScript
- **Module:** Login Page
- **Date:** 21 October 2026
- **Technologies:** React, TypeScript, HTML5, CSS3, Vite, React Router

## Features

- Responsive login page design.
- Reusable React components with TypeScript.
- Email and password input fields.
- Client-side form validation.
- Password visibility toggle.
- Remember Me functionality.
- Demo authentication using JSON data.
- Authentication context using React Context API.
- Session persistence using localStorage.
- Protected dashboard route.
- Logout functionality.
- Login error handling and loading states.
- Not Found page for unknown routes.
- Accessible form controls and responsive styling.

## Technologies Used

- **React:** Builds the user interface using reusable components.
- **TypeScript:** Provides static typing and improves code reliability.
- **Vite:** Development server and production build tool.
- **React Router:** Handles navigation and protected routes.
- **CSS3:** Styles the login page and dashboard.
- **JSON:** Stores demo user data.
- **localStorage:** Stores the demo authentication session.

## Project Structure

```text
react-app/
├── public/
│   └── data/
│       └── users.json
├── src/
│   ├── api/
│   │   └── authApi.ts
│   ├── components/
│   │   ├── BrandLogo.tsx
│   │   ├── LoginTabs.tsx
│   │   ├── LoginForm.tsx
│   │   ├── SocialLogin.tsx
│   │   ├── LoginFooter.tsx
│   │   ├── DashboardPreview.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── layouts/
│   │   └── AuthLayout.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── DashboardPage.css
│   │   └── NotFoundPage.tsx
│   ├── types/
│   │   └── auth.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

*Note: CSS files for individual components are also included in the components and layouts folders.*

## Installation and Setup

### Prerequisites

- Node.js and npm installed.
- Visual Studio Code or another code editor.

### Install Dependencies

Open a terminal in the `react-app` folder and run:

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Demo Login Credentials

Use the following credentials for testing:

| Email | Password |
|---|---|
| demo@edabip.com | Demo@12345 |
| admin@edabip.com | Admin@12345 |

**Security note:** These are demonstration credentials stored in a public JSON file. This is not production authentication. Real applications must validate credentials through a secure backend.

## Application Routes

| Route | Purpose |
|---|---|
| `/` | Redirects to the login page |
| `/login` | Login page |
| `/dashboard` | Protected dashboard |
| Other routes | Not Found page |

Users who are not authenticated are redirected to the login page when they try to access the protected dashboard.

## Testing

The following scenarios should be tested:

- Login with valid demo credentials.
- Login with an incorrect email or password.
- Submit the form with empty fields.
- Validate email format and password length.
- Toggle password visibility.
- Refresh the dashboard and check session persistence.
- Sign out and verify that the dashboard is protected.
- Open an unknown route and verify the Not Found page.
- Check the layout on desktop and mobile screen sizes.
- Run `npm run build` and resolve any TypeScript errors.

## Environment Configuration

The `.env` file can contain the API base URL:

```env
VITE_API_BASE_URL=
```

When using the local JSON demo data, leave the value empty. Vite serves the JSON file from `public/data/users.json`.

Restart the development server after changing environment variables.

## Learning Outcomes

- Building reusable React components.
- Using TypeScript interfaces and typed props.
- Managing state with React hooks.
- Handling forms and validation.
- Sharing authentication state with React Context.
- Implementing routing and protected pages.
- Loading JSON data with the Fetch API.
- Persisting session data with localStorage.
- Organizing a React project into maintainable modules.

## Current Status

The React login page and dashboard prototype are being developed as part of EDABIP Task 3. The final status should be confirmed after browser testing and a successful production build.

## Author

**Harish Kumar S**

EDABIP — Enterprise Data Analytics and Business Intelligence Platform
