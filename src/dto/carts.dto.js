class CreateCartDTO {
  constructor({ products }) {
    this.products = products;
  }
}

module.exports = CreateCartDTO;

class UpdateCartDTO {
  constructor({ products }) {
    this.products = products;
  }
}

module.exports = UpdateCartDTO;

class AddProductToCartDTO {
  constructor({ product, quantity }) {
    this.product = product;
    this.quantity = quantity;
  }
}

module.exports = AddProductToCartDTO;

class DeleteProductByIdDTO {
  constructor({ productId }) {
    this.productId = productId;
  }
}

module.exports = DeleteProductByIdDTO;
