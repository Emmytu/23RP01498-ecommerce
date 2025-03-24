const { sequelize, Product } = require('./models/product');

const products = [
    {
        name: 'Smartphone X',
        description: 'Latest flagship smartphone with advanced features',
        price: 999.99,
        stock: 50
    },
    {
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals',
        price: 1499.99,
        stock: 30
    },
    {
        name: 'Wireless Earbuds',
        description: 'Premium wireless earbuds with noise cancellation',
        price: 199.99,
        stock: 100
    },
    {
        name: 'Smart Watch',
        description: 'Fitness and health tracking smartwatch',
        price: 299.99,
        stock: 75
    },
    {
        name: 'Gaming Console',
        description: 'Next-gen gaming console with 4K support',
        price: 499.99,
        stock: 25
    }
];

async function seedDatabase() {
    try {
        // Sync database
        await sequelize.sync({ force: true });
        console.log('Database synced');

        // Insert products
        await Product.bulkCreate(products);
        console.log('Sample products inserted successfully');

        // Close database connection
        await sequelize.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();