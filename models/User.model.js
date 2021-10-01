const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  profilePic: { type: String},
  pets: [{ type: Types.ObjectId, ref: 'Pet' }],
  reviews: [{ type: Types.ObjectId, ref: 'Review' }],
  ad: [{ type: Types.ObjectId, ref: 'Ad' }],

  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
