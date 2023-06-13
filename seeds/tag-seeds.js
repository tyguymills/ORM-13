const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'Techno',
  },
  {
    tag_name: 'Brown',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'Flannel',
  },
  {
    tag_name: 'black',
  },
  {
    tag_name: 'Dress',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
