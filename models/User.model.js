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
  personalDesc: { type: String, required: true, maxlength: 300 },
  latestWorksDesc: { type: String, required: true, maxlength: 500 },
  passwordHash: { type: String, required: true },
  profilePicUrl: {
    type: String,
    trim: true,
    default: "http://www.wikiaves.com.br/img/semfoto.png",
  },
  pets: [{ type: Types.ObjectId, ref: "Pet" }],
  reviews: [{ type: Types.ObjectId, ref: "Review" }],
  ads: [{ type: Types.ObjectId, ref: "Ad" }],

  // role: {
  //   type: String,
  //   enum: ["ADMIN", "USER"],
  //   required: true,
  //   default: "USER",
  // },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
