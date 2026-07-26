# Tasks Management System 🚀

A modern full-stack web application designed for task management and tracking. Built with ASP.NET Core for a robust backend and Next.js + Tailwind CSS for a highly responsive, animated frontend.

## 🌟 Features
- **User Authentication:** Secure JWT-based Login and Registration.
- **Task Management:** Create, read, update, and delete tasks (CRUD).
- **Task Statuses:** Track tasks with statuses like "Pending", "In Progress", or "Completed".
- **Responsive UI:** A fully responsive interface that looks great on mobile, tablet, and desktop devices.
- **Beautiful Animations:** Smooth page transitions and micro-animations using Framer Motion.
- **Form Validation:** Client-side validation using React Hook Form & Zod, plus robust server-side validation.

## 💻 Tech Stack

### Backend (ASP.NET Core API)
- **Framework:** ASP.NET Core Web API (C#)
- **Database:** SQL Server
- **ORM:** Entity Framework Core
- **Authentication:** JWT (JSON Web Tokens)
- **Architecture:** Repository Pattern & Service Layer architecture

### Frontend (Next.js)
- **Framework:** Next.js (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State/Form Management:** React Hook Form + Zod
- **Icons:** Lucide React
- **API Client:** Axios

---

## 🚀 Getting Started

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) (or later)
- [Node.js](https://nodejs.org/) (v18 or later)
- SQL Server (LocalDB or full instance)

### 1. Backend Setup
1. Open the solution file `Tasks Project.sln` in Visual Studio or your preferred IDE.
2. Open `appsettings.json` and configure your `DefaultConnection` string to point to your local SQL Server instance.
3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```
   *(Or run `Update-Database` in Visual Studio Package Manager Console)*
4. Run the backend project. It should start the API and open Swagger documentation on `https://localhost:<port>`.

### 2. Frontend Setup
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 📂 Project Structure

- `/Controllers`: API endpoints handling HTTP requests.
- `/Services`: Business logic layer.
- `/Repositories`: Data access layer for Entity Framework.
- `/Models`: Database entities (User, Task).
- `/DTOs`: Data Transfer Objects for API requests and responses.
- `/Frontend`: The Next.js frontend application.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and available under the MIT License.
