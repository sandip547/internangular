# BookQuote Manager - Angular 20 Frontend

A responsive Angular 20 application for managing books and quotes with JWT authentication, Bootstrap 5, Font Awesome 6, and light/dark theme toggle.

## Features

- **JWT Authentication** — Register and login with secure token-based auth
- **Book CRUD** — Add, view, edit, and delete books
- **My Quotes** — Add, view, edit, and delete personal quotes
- **Light/Dark Mode** — Toggle between light and dark themes (persisted in localStorage)
- **Responsive Design** — Bootstrap 5 responsive layout with mobile-friendly navigation
- **Font Awesome Icons** — Used throughout the UI for enhanced visuals
- **Route Guards** — Protected routes that require authentication
- **HTTP Interceptor** — Automatically attaches JWT token to API requests

## Prerequisites

- **Node.js** 18.19+ or 20.x+
- **Angular CLI** 20.x (`npm install -g @angular/cli`)
- **Backend API** running (your .NET backend)

## Setup Instructions

### 1. Install Dependencies

```bash
cd book-app
npm install
```

### 2. Configure API URL

Edit `src/environments/environment.ts` and set your backend API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'  // Change this to your backend URL
};
```

> **Note**: If your backend runs on `http://localhost:5000`, update accordingly.

### 3. CORS Configuration (Backend)

Make sure your .NET backend allows CORS from the Angular dev server. In your `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Then in the middleware pipeline:
app.UseCors("AllowAngular");
```

### 4. Run the Application

```bash
ng serve
```

Navigate to `http://localhost:4200`.

## Project Structure

```
src/
├── index.html                          # Bootstrap 5 + Font Awesome CDN
├── main.ts                             # App bootstrap
├── styles.css                          # Global styles with CSS variables (light/dark)
├── environments/
│   └── environment.ts                  # API URL configuration
└── app/
    ├── app.component.ts                # Root component
    ├── app.config.ts                   # Providers (router, HTTP, interceptors)
    ├── app.routes.ts                   # Route definitions with lazy loading
    ├── models/
    │   ├── book.model.ts               # Book interface
    │   ├── quote.model.ts              # Quote interface
    │   └── user.model.ts               # User, UserLogin, AuthResponse
    ├── services/
    │   ├── auth.service.ts             # JWT auth (login, register, logout, token mgmt)
    │   ├── book.service.ts             # Book CRUD API calls
    │   ├── quote.service.ts            # Quote CRUD API calls
    │   └── theme.service.ts            # Light/dark theme toggle
    ├── guards/
    │   └── auth.guard.ts               # Route guard (functional)
    ├── interceptors/
    │   └── auth.interceptor.ts         # JWT token interceptor (functional)
    └── components/
        ├── navbar/                     # Responsive nav with theme toggle
        ├── login/                      # Login page
        ├── register/                   # Registration page
        ├── book-list/                  # Book list (table on desktop, cards on mobile)
        ├── book-form/                  # Add/Edit book form
        ├── quote-list/                 # Quote cards display
        └── quote-form/                 # Add/Edit quote form
```

## API Endpoints Used

| Method | Endpoint              | Auth Required | Description       |
|--------|-----------------------|---------------|-------------------|
| POST   | /api/Auth/login       | No            | Login (get JWT)   |
| POST   | /api/User/register    | No            | Register new user |
| GET    | /api/Book             | Yes           | List all books    |
| GET    | /api/Book/:id         | Yes           | Get book by ID    |
| POST   | /api/Book             | Yes           | Create book       |
| PUT    | /api/Book/:id         | Yes           | Update book       |
| DELETE | /api/Book/:id         | Yes           | Delete book       |
| GET    | /api/Quote            | Yes           | List all quotes   |
| GET    | /api/Quote/:id        | Yes           | Get quote by ID   |
| POST   | /api/Quote            | Yes           | Create quote      |
| PUT    | /api/Quote/:id        | Yes           | Update quote      |
| DELETE | /api/Quote/:id        | Yes           | Delete quote      |

## Usage

1. **Register** a new account at `/register`
2. **Login** with your credentials at `/login`
3. **Books** — View, add, edit, and delete books from the Books page
4. **Quotes** — Switch to My Quotes from the navbar to manage your quotes
5. **Theme** — Click the sun/moon icon in the navbar to toggle dark/light mode
6. **Logout** — Click the logout button in the navbar
