//import GraphQLDecimal from 'graphql-type-decimal';
const { Schema } = require('mongoose');

const giftSchema = new Schema({ //user save gifts for recipient

  giftId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },

  price: {
    type: String
  }
});

module.exports = giftSchema;
