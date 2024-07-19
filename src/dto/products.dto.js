class CreateProductDTO {
  constructor({ name, price, description, category, available }) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.available = available;
  }
}

module.exports = CreateProductDTO;

class UpdateProductDTO {
  constructor({ name, price, description, category, available }) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.available = available;
  }
}

module.exports = UpdateProductDTO;