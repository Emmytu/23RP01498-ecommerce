const { Product } = require('../models/product');

class ProductService {
    async getAllProducts() {
        try {
            return await Product.findAll();
        } catch (error) {
            throw new Error(`Error fetching products: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) throw new Error('Product not found');
            return product;
        } catch (error) {
            throw new Error(`Error fetching product: ${error.message}`);
        }
    }

    async createProduct(productData) {
        try {
            return await Product.create(productData);
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async updateProduct(id, productData) {
        try {
            const product = await Product.findByPk(id);
            if (!product) throw new Error('Product not found');
            return await product.update(productData);
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) throw new Error('Product not found');
            await product.destroy();
            return { message: 'Product deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}

module.exports = new ProductService();