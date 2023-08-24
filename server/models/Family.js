const { Schema, model } = require("mongoose");

// Schema to create Family model
const familySchema = new Schema({
  name: {
    type: String,
    required: true,
    max_length: 50,
  },
  //reference the user model
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Family = model("family", familySchema);

module.exports = Family;
