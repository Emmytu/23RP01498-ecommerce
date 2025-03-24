const ProductService = require('./product.service');
const { Product } = require('../models/product');

// Mock the Product model
jest.mock('../models/product', () => ({
    Product: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    }
}));

describe('ProductService', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    describe('getAllProducts', () => {
        it('should return all products', async () => {
            const mockProducts = [
                { id: 1, name: 'Product 1', price: 100 },
                { id: 2, name: 'Product 2', price: 200 }
            ];
            Product.findAll.mockResolvedValue(mockProducts);

            const products = await ProductService.getAllProducts();
            expect(products).toEqual(mockProducts);
            expect(Product.findAll).toHaveBeenCalled();
        });

        it('should throw error when database query fails', async () => {
            const error = new Error('Database error');
            Product.findAll.mockRejectedValue(error);

            await expect(ProductService.getAllProducts()).rejects.toThrow('Error fetching products');
        });
    });

    describe('getProductById', () => {
        it('should return product by id', async () => {
            const mockProduct = { id: 1, name: 'Product 1', price: 100 };
            Product.findByPk.mockResolvedValue(mockProduct);

            const product = await ProductService.getProductById(1);
            expect(product).toEqual(mockProduct);
            expect(Product.findByPk).toHaveBeenCalledWith(1);
        });

        it('should throw error when product not found', async () => {
            Product.findByPk.mockResolvedValue(null);

            await expect(ProductService.getProductById(1)).rejects.toThrow('Product not found');
        });
    });

    describe('createProduct', () => {
        it('should create and return new product', async () => {
            const mockProduct = { name: 'New Product', price: 300 };
            Product.create.mockResolvedValue({ id: 1, ...mockProduct });

            const product = await ProductService.createProduct(mockProduct);
            expect(product).toEqual({ id: 1, ...mockProduct });
            expect(Product.create).toHaveBeenCalledWith(mockProduct);
        });

        it('should throw error when creation fails', async () => {
            const error = new Error('Creation error');
            Product.create.mockRejectedValue(error);

            await expect(ProductService.createProduct({})).rejects.toThrow('Error creating product');
        });
    });
});