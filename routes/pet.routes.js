const express = require("express");
const router = express.Router();
const PetModel = require("../models/Pet.model");
const UserModel = require("../models/User.model");

const { ObjectId } = require("mongoose").Types;

//Create pet => POST
router.post("/pet", async (req, res) => {
  try {
    const result = await PetModel.create(req.body);

    // Adicionado a referência do pet no User

    await UserModel.updateOne(
      { _id: req.body.user },
      { $push: { pets: result._id } }
    );

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

//Read => Pet List
router.get("/pet", (req, res) => {
  PetModel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        msg: "Falha ao encontrar pets: erro interno no servidor.",
      });
    });
});

//Update Pet info
router.patch("/pet/:id", (req, res) => {
  PetModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...req.body } },
    { new: true, runValidators: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({ msg: "Pet não encontrado!" });
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        msg: "Falha ao encontrar pets: erro interno no servidor.",
      });
    });
});

// Delete => Pet Delete
router.delete("/pet/:id", async (req, res, next) => {
  PetModel.deleteOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      if (result.deleteCount < 1) {
        return res.status(404).json({ msg: "Pet não encontrado" });
      }
      //Deve-se retornar um obj vazio no sucesso de deleção
      return res.status(200).json({});
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        msg: "Falha ao encontrar este pet: erro interno no servidor",
      });
    });
});

module.exports = router;
