//interagimos com o mongoose (para conectara com o banco) através de modelos

//Importando a classe Schema e o mongoose
const { Schema, model, Types } = require("mongoose");

//Preenchendo o Schema com os campos (e suas regras) necessários preencher no banco de dados
const PetSchema = new Schema({
  name: { type: String, required: true, trim: true },
  imageUrl: String,
  species: {
    type: String,
    enum: [
      "dog",
      "reptile",
      "fish",
      "poultry",
      "small pets",
      "cat",
      "horse",
      "bird",
      "livestock",
    ],
    required: true,
  },
  breed: { type: String, default: "mixed-breed" },
  age: { type: Number, min: 0, required: true },
  ad: { type: Types.ObjectId, ref: "Ad" },
  user: { type: Types.ObjectId, ref: "User" },
});

const PetModel = model("Pet", PetSchema);

module.exports = PetModel;
