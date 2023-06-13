const { Product } = require('../models');

const productData = [
  {
    product_name: 'Leather Jackets',
    price: 69,99,
    stock: 35,
    category_id: 1,
  },
  {
    product_name: 'Sneakers',
    price: 120.0,
    stock: 25,
    category_id: 5,
  },
  {
    product_name: 'Baseball Cap',
    price: 30.00,
    stock: 48,
    category_id: 4,
  },
  {
    product_name: 'Leather Belts',
    price: 14.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Flannel-Lined Pants',
    price: 39.99,
    stock: 80,
    category_id: 2,
  },
  {
    product_name:'Fedora',
    price: 31.99,
    stock:12,
    category_id:6
  },
  {
    product_name:'Socks',
    price:5.99,
    stock:79,
    category_id:7
  }
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
