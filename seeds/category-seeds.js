const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Jackets',
  },
  {
    category_name: 'Shoes',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Wallets',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
