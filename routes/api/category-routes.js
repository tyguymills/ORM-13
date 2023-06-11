const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  const categoryData = await Category.findAll({
  include: [{ model: Product }]
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
  }
  });
  
router.get('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  const categoryData = await Category.findByPk(id, {
    include: [{ model: Product }]
  });
  
  if (categoryData) {
    res.status(200).json(categoryData);
  } else {
    res.status(404).json({ message: 'No Category found with this ID' });
  }
} catch (err) {
  res.status(500).json(err);
  }
  });

router.put('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  const categoryData = req.body;
  await Category.update(categoryData, { where: { id } });
res.status(200).json(categoryData);
} catch (err) {
  console.log(err);
  res.status(400).json(err);
  }
  });

router.delete('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  await Category.destroy({ where: { id } });
  res.sendStatus(200);
  } catch (err) {
  res.sendStatus(500);
  }
  });

module.exports = router;
