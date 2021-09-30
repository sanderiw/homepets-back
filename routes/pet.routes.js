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

module.exports = router;
