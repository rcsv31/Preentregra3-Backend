const cartRepository = require("../repositories/cart.repository");
const CreateCartDTO = require("../dto/carts.dto.js");
const UpdateCartDTO = require("../dto/carts.dto.js");
const AddProductToCartDTO = require("../dto/carts.dto.js");
const DeleteProductByIdDTO = require("../dto/carts.dto.js");

class CartService {
  async createCart(cartData) {
    const createCartDTO = new CreateCartDTO(cartData);
    return await cartRepository.createCart(createCartDTO);
  }

  async getCartById(cartId) {
    return await cartRepository.getCartById(cartId);
  }

  async updateCart(cartId, cartData) {
    const updateCartDTO = new UpdateCartDTO(cartData);
    return await cartRepository.updateCart(cartId, updateCartDTO);
  }

  async deleteCart(cartId) {
    return await cartRepository.deleteCart(cartId);
  }

  async getCarts() {
    return await cartRepository.getCarts();
  }

  async getProductsFromCart(cartId) {
    return await cartRepository.getProductsFromCart(cartId);
  }

  async addProductToCart(cartId, productData) {
    const addProductToCartDTO = new AddProductToCartDTO(productData);
    return await cartRepository.addProductToCart(
      cartId,
      addProductToCartDTO.product,
      addProductToCartDTO.quantity
    );
  }

  async deleteProductById(cartId, productId) {
    const deleteProductByIdDTO = new DeleteProductByIdDTO({ productId });
    return await cartRepository.deleteProductById(
      cartId,
      deleteProductByIdDTO.productId
    );
  }

  async clearCart(cartId) {
    return await cartRepository.clearCart(cartId);
  }

  async createNewCart() {
    const createCartDTO = new CreateCartDTO({ products: [], quantity: 0 });
    return await cartRepository.createCart(createCartDTO);
  }
}

module.exports = new CartService();
