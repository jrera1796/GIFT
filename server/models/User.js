const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const giftSchema = require('./Gift'); //import schema from Gift

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedGift to be an array of data that adheres to the GiftSchema
    savedGift: [giftSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) { //hash user password
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) { //validate password for login
  return bcrypt.compare(password, this.password);
};


userSchema.virtual('giftCount').get(function () { //query user, `giftCount` field with # of saved gift
  return this.savedGift.length;
});

const User = model('User', userSchema);

module.exports = User;
