# E-Commerce API

A RESTful API for an e-commerce application with authentication and CRUD operations for products.

## Features

- User authentication (register, login)
- JWT-based authentication
- Product management (CRUD operations)
- Image upload using Cloudinary
- MongoDB database

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "john@example.com", "password": "password123" }`

- `GET /api/auth/me` - Get current user (requires authentication)
  - Header: `Authorization: Bearer <token>`

### Products

- `GET /api/products` - Get all products

- `GET /api/products/:id` - Get single product

- `POST /api/products` - Create product (requires authentication)
  - Header: `Authorization: Bearer <token>`
  - Body: FormData with `name`, `description`, `price`, and `image` file

- `PUT /api/products/:id` - Update product (requires authentication)
  - Header: `Authorization: Bearer <token>`
  - Body: `{ "description": "Updated description" }`

- `DELETE /api/products/:id` - Delete product (requires authentication)
  - Header: `Authorization: Bearer <token>`

## Response Format

All responses follow this format:
```json
{
  "statusCode": 200,
  "message": "",
  "data": {}
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the response body.

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Protected routes require valid JWT token 