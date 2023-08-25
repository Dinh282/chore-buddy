const { Schema, model } = require("mongoose");

// Schema to create Chore model
const choreSchema = new Schema({
  title: {
    type: String,
    required: true,
    max_length: 50,
  },
  description: {
    type: String,
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: "family",
  },
  // reference the user model
  assignee: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  rewardAmount: {
    type: Number,
    match: [/^[0-9]*\.[0-9]{2}$/, "Must be in dollar format with 2 decimal places!"],
  },
  isComplete: {
    type: Boolean,
  },
});

const Chore = model("chore", choreSchema);

module.exports = Chore;
