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
    recipients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipient'
      }
    ]
  },
  {
    toJSON: { // set this to use virtual below
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

userSchema.virtual('recipientCount').get(function() {
  return this.recipients.length;
});

const User = model('User', userSchema);

module.exports = User;
