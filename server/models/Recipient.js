const { Schema, model } = require('mongoose');
const giftSchema = require('./Gift');

const recipientSchema = new Schema(
  {
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
    traits: {
      type: String,
      required: true,
      maxlength: 50,
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
