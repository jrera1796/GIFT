//import GraphQLDecimal from 'graphql-type-decimal';
import pkg from 'mongoose';
const { Schema } = pkg;

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

export default giftSchema;
