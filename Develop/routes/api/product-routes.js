const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [{ model: Category }, { model: Tag}]
  })
    .then(productsData => res.status(200).json(productsData))
    .catch (err => {
      res.status(500).json(err);
  })
})

 
// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  
    //takes the value from id key in the req.params and saves it to the const id
    const { id } = req.params;
    Product.findOne({
      where: {id: id},
      include:[{ model: Category}, { model: Tag}]
    })
    .then(productData => {
      if(!productData){
        res.status(404).json({message:"No product with this ID"});
        return
      }
      res.status(200).json(productData);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    })
  })

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  const { product_name, price, stock, tagIds } = req.body;
  Product.create(req.body)
  .then(product => {
    if(tagIds.length > 0){
      const myTagIds = tagIds.map(tId => {
        return {product_id: product.id, tag_id: tId}
      })
      return ProductTag.bulkCreate(myTagIds)
    }
    res.status(200).json(product)
  })
  .then(ptIds => res.status(200).json(ptIds))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})
 

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
//might need something else here for removing things from the product tag table
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
      where: {
        id:req.params.id
      }}
    )
    .then(productData => {
      if(!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      } 
      res.json({message:"successfully deleted"})
    })
  .catch(err => {
    console.log(err)
    res.status(500).json(err) 
  })
});

module.exports = router;