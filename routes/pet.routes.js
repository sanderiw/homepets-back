const express = require("express");
const router = express.Router();
const PetModel = require("../models/Pet.model");

//Create pet => POST
router.post("/registration", (req, res) => {
  PetModel.create(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        msg: "Falha ao inserir um novo pet: erro interno no servidor.",
      });
    });
});

//Read => Pet List
router.get("/registration", (req, res) => {
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
router.patch("/registration/:id", async (req, res) => {
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

module.exports = router;
