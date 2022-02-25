//import GraphQLDecimal from 'graphql-type-decimal';
const { Schema } = require('mongoose');

const giftSchema = new Schema({ //user save gifts for recipient

  giftId: {
    type: String,
    required: true,
  },
  giftname: {
    type: String
  },
  description: {
    type: String,
    trim: true,
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
