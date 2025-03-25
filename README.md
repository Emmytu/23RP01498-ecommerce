# E-commerce Microservices Project

A modern e-commerce platform built with microservices architecture, featuring product management, user authentication, and order processing capabilities.

## What's Inside

- Backend API service for core business logic
- Product service for product management
- SQLite database for data storage
- Docker containers for easy deployment
- Kubernetes setup for scalability

## Tech Stack

- Node.js & Express
- SQLite Database
- Docker
- Kubernetes
- Nginx Ingress Controller

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:3002

### Using Docker

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```
   This will start both the API service and SQLite database.

### Kubernetes Deployment

1. Build Docker images:
   ```bash
   docker build -t backend-api .
   docker build -t product-service .
   ```

2. Apply Kubernetes configurations:
   ```bash
   kubectl apply -f k8s/
   ```

## API Endpoints

### Products
- GET `/api/products` - List all products
- GET `/api/products/:id` - Get a single product
- POST `/api/products` - Create a product
- PUT `/api/products/:id` - Update a product
- DELETE `/api/products/:id` - Delete a product

### Users
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - User login

### Orders
- GET `/api/orders` - Get all orders
- POST `/api/orders` - Create a new order

### Cart
- GET `/api/cart` - View cart items
- POST `/api/cart` - Add item to cart
- DELETE `/api/cart/:id` - Remove item from cart

## Project Structure

```
├── models/           # Database models
├── services/         # Business logic
├── k8s/              # Kubernetes configs
├── jenkins/          # CI/CD pipeline
├── docker-compose.yml
├── Dockerfile
└── server.js         # Main application
```

## Deployment

The project uses a CI/CD pipeline with Jenkins for automated deployments. The pipeline:
1. Runs tests
2. Builds Docker images
3. Deploys to Kubernetes

## Environment Variables

- `NODE_ENV`: Set to "production" or "development"
- `PORT`: Server port (default: 3002)
- `BACKEND_API_URL`: URL for backend service in 

