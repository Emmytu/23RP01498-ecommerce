const express = require('express');
const app = express();
const productService = require('./services/product.service');
const { sequelize } = require('./models/product');

// Middleware for parsing JSON bodies
app.use(express.json());

// Sync database
sequelize.sync().then(() => {
    console.log('Database synced successfully');
}).catch(err => {
    console.error('Error syncing database:', err);
});

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to E-commerce API' });
});

// Product routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// User routes
app.post('/api/users/register', (req, res) => {
    res.json({ message: 'Register new user', data: req.body });
});

app.post('/api/users/login', (req, res) => {
    res.json({ message: 'User login' });
});

// Order routes
app.get('/api/orders', (req, res) => {
    res.json({ message: 'Get all orders' });
});

app.post('/api/orders', (req, res) => {
    res.json({ message: 'Create new order', data: req.body });
});

// Cart routes
app.get('/api/cart', (req, res) => {
    res.json({ message: 'Get cart items' });
});

app.post('/api/cart', (req, res) => {
    res.json({ message: 'Add item to cart', data: req.body });
});

app.delete('/api/cart/:id', (req, res) => {
    res.json({ message: `Remove item ${req.params.id} from cart` });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});