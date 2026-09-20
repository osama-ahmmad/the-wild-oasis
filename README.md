# The Wild Oasis

The Wild Oasis is a cabin booking and hotel-management dashboard built with React. It gives hotel staff a single place to manage cabins, bookings, guests, check-ins, check-outs, users, and application settings.

## Features

- Authenticated application access with login, signup, logout, and protected routes
- Dashboard with booking and revenue insights
- Booking list with filtering, sorting, pagination, and detailed booking views
- Cabin management with create, edit, delete, image upload, and availability information
- Guest management and booking check-in/check-out workflows
- User account and profile management
- Configurable hotel settings
- Light and dark themes
- Toast notifications, loading states, error handling, and empty states
- Responsive interface for desktop and smaller screens

## Built With

### Application

- React 18
- React Router DOM for client-side routing
- Vite for development and production builds
- Styled Components for component-level styling
- React Icons for interface icons

### Data and state

- Supabase for authentication, database access, and storage
- TanStack React Query for server-state fetching, caching, mutations, and invalidation
- React Hook Form for form state and validation
- date-fns for date formatting and date calculations
- Recharts for dashboard charts
- React Hot Toast for user feedback

### Development

- ESLint with React, React Hooks, and React Refresh plugins
- `@vitejs/plugin-react` for React support in Vite
- `@tanstack/react-query-devtools` for inspecting React Query state

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A Supabase project configured for the application's authentication, database, and storage needs

### Installation

1. Clone the repository and open its directory.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_KEY=your-supabase-anon-key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

| Command           | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with hot module replacement |
| `npm run build`   | Create an optimized production build                          |
| `npm run preview` | Preview the production build locally                          |
| `npm run lint`    | Run ESLint across the JavaScript and JSX source files         |

## Application Routes

| Route                  | Purpose                              |
| ---------------------- | ------------------------------------ |
| `/login`               | Sign in to the application           |
| `/dashboard`           | View operational and booking metrics |
| `/bookings`            | Browse and filter bookings           |
| `/bookings/:bookingId` | View booking details                 |
| `/checkin/:bookingId`  | Check a guest in or out              |
| `/cabins`              | Manage cabins                        |
| `/users`               | Manage application users             |
| `/settings`            | Configure hotel settings             |
| `/account`             | Update the current user's account    |

All application routes except `/login` require an authenticated user.

## Project Structure

```text
src/
|-- context/       Shared React context, including dark mode
|-- data/          Seed data, local assets, and upload helpers
|-- features/      Feature-specific components and data hooks
|-- hooks/         Reusable custom hooks
|-- pages/         Route-level page components
|-- services/      Supabase client and API access functions
|-- styles/        Global styled-components styles
|-- ui/            Reusable layout and interface components
`-- utils/         Shared constants and helper functions
```

## Production Build

Build the application with:

```bash
npm run build
```

The generated files are written to `dist/`. Configure the same Supabase environment variables in the hosting provider before deploying.

## License

This project is provided for educational and portfolio purposes.
