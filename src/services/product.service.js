const productRepository = require("../repositories/product.repository");

class ProductService {
  async getProducts(filter = {}, options = {}) {
    return await productRepository.getProducts(filter, options);
  }

  async addProduct(productData) {
    // Asumiendo que el DTO ya valida y estructura los datos
    return await productRepository.addProduct(productData);
  }

  async getProductById(productId) {
    return await productRepository.getProductById(productId);
  }

  async updateProduct(productId, productData) {
    // Asumiendo que el DTO ya valida y estructura los datos
    return await productRepository.updateProduct(productId, productData);
  }

  async deleteProduct(productId) {
    return await productRepository.deleteProduct(productId);
  }
}

module.exports = new ProductService();
