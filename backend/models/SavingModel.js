const mongoose = require('mongoose');

const SavingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 20,
    },
    type: {
      type: String,
      default: "saving",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Saving', SavingSchema) 