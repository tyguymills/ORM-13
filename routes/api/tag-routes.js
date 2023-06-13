const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
   Tag.findAll({
      include: {model: Product, as: 'productTag_products'}
    })
    .then(tagsData => res.status(200).json(tagsData))
  .catch (err => {
    console.log(err)
    res.status(500).json(err)
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    include: [{ model: Product}]
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.status(200).json(tagData)
    })
  .catch (err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(tagData => res.status(200).json(tagData))
  .catch (err => {
    console.log(err)
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {where: {id: req.params.id}})
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({message:"No Tag found with this id"})
      return
    }
    res.json({message: "Tag Updated"})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id: req.params.id}})
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({message:"No Tag found with this id"})
      return
    }
    res.json({message: "Tag Deleted"})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

module.exports = router;
