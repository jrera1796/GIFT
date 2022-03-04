//import GraphQLDecimal from 'graphql-type-decimal';
const { Schema } = require('mongoose');

const giftSchema = new Schema({ //user save gifts for recipient

  giftId: {
    type: String,
  },
  title: {
    type: String
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  }
});

module.exports = giftSchema;
