# Ticket Management Application

A full-stack ticket management system built with Laravel 11 (backend) and React with Material-UI v5 (frontend).

## Features

- **Backend**: Laravel 11 API with PHP 8.2
- **Frontend**: React 18 with Material-UI v5
- **Authentication**: JWT tokens using Laravel Sanctum
- **Responsive Design**: Mobile-first responsive layout
- **Security**: CSRF protection, input validation, rate limiting
- **API Communication**: Axios for seamless frontend-backend integration

## Project Structure

```
├── backend/                 # Laravel API backend
│   ├── app/                # Laravel application code
│   ├── config/             # Configuration files
│   ├── database/           # Database migrations and seeders
│   ├── public/             # Public assets
│   ├── routes/             # API routes
│   └── composer.json       # PHP dependencies
├── frontend/               # React frontend
│   ├── public/             # Public assets
│   ├── src/                # React application code
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json        # Node dependencies
└── README.md              # This file
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **PHP 8.2** or higher
- **Composer** (PHP dependency manager)
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** or another database supported by Laravel

## Backend Setup (Laravel)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Environment Configuration:**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database credentials and other settings:
   ```env
   APP_NAME="Ticket"
   APP_ENV=local
   APP_KEY=  # Generate with: php artisan key:generate
   APP_DEBUG=true
   APP_URL=http://localhost:8080

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=ticket_app
   DB_USERNAME=your_username
   DB_PASSWORD=your_password

   FRONTEND_URL=http://localhost:3000
   ```

4. **Generate application key:**
   ```bash
   php artisan key:generate
   ```

5. **Run database migrations:**
   ```bash
   php artisan migrate
   ```

6. **Start the Laravel development server:**
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8080`

## Frontend Setup (React)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   ```bash
   cp .env.example .env
   ```
   The default configuration should work for local development.

4. **Start the React development server:**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## API Endpoints

The Laravel backend provides the following API endpoints:

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout (requires authentication)
- `GET /api/user` - Get authenticated user info (requires authentication)

## Security Features

- **Laravel Sanctum** for API authentication
- **CSRF Protection** for cross-site request forgery prevention
- **Input Validation** on all API endpoints
- **Rate Limiting** to prevent abuse
- **Password Hashing** using bcrypt
- **JWT Tokens** for stateless authentication

## Usage

1. Start both the backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Register a new account or login with existing credentials
4. Access the protected home page after authentication

## Development

### Adding New Features

- **Backend**: Add new controllers in `backend/app/Http/Controllers/`
- **Frontend**: Add new components in `frontend/src/components/`
- **API Routes**: Define new routes in `backend/routes/api.php`

### Code Style

- **PHP**: Follow PSR-12 coding standards
- **JavaScript**: Use ESLint configuration from create-react-app
- **React**: Use functional components with hooks

## Deployment

### Backend Deployment

1. Configure production environment variables
2. Run database migrations on production
3. Set up proper file permissions
4. Configure web server (Apache/Nginx) to serve Laravel

### Frontend Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Serve the `build` folder with a web server
3. Update API URLs in production environment

## License

This project is licensed under the MIT License.
