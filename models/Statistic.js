const { Schema, model } = require('mongoose');

const statisticSchema = new Schema(
  {
    lastUpdate: Date,
    recovered: Number,
    deaths: Number,
    confirmed: Number,
    negatives: Number,
    tested: Number,
    regions: [
      {
        name: String,
        value: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('statistic', statisticSchema);
