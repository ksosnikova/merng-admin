const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: String },
  city: { type: String },
  owner: { type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Profile', schema)