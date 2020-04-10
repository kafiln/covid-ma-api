const { Schema, model } = require('mongoose');

const regionSchema = new Schema(
  {
    name: String,
    value: Number,
    time: Date,
  },
  { timestamps: true }
);

module.exports = model('region', regionSchema);
