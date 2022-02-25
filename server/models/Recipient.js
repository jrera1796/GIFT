const { Schema, model } = require('mongoose');
const giftSchema = require('./Gift');

const recipientSchema = new Schema(
  {
    traits: {
      type: String,
      required: true,
    }, 
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    gifts: [giftSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

recipientSchema.virtual('giftCount').get(function() {
  return this.gifts.length;
});

const Recipient = model('Recipient', recipientSchema);

module.exports = Recipient;
