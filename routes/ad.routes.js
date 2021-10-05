const express = require('express');
const router = express.Router();
const AdModel = require('../models/Ad.model');
const ReviewModel = require('../models/Review.model');
const PetModel = require('../models/Pet.model');

const { ObjectId } = require('mongoose').Types;

// Importando isAuthenticated mas ainda não usando como middleware em nenhum route
const isAuthenticated = require('../middlewares/isAuthenticated');

// Crud de Advertisements

// Crud (Create) => POST
router.post('/adv', async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await AdModel.create(req.body);
    if (req.body.pets) {
      for (let pet of req.body.pets) {
        await PetModel.updateOne(
          { _id: ObjectId(pet) },
          { $set: { ad: result._id } }
        );
      }
    }
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

// cRud (Read) => GET (Get all ads from the app)
router.get('/adv', async (req, res, next) => {
  try {
    const result = await AdModel.find({}).populate('reviews pets user');
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

// cRud (Read) => GET (Get one)
router.get('/adv/:id', async (req, res, next) => {
  try {
    const result = await AdModel.findOne({ _id: req.params.id }).populate(
      'reviews user pets'
    );
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

// crUd (Update) => PATCH
router.patch('/adv/:id', async (req, res, next) => {
  try {
    const result = await AdModel.findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: 'Anúncio não encontrado' });
    }

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

// cruD (Delete) => DELETE
router.delete('/adv/:id', async (req, res, next) => {
  try {
    const result = await AdModel.deleteOne({
      _id: ObjectId(req.params.id),
    });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: 'Anúncio não encontrado' });
    }
    const resultReview = await ReviewModel.deleteMany({
      'to.toAd': ObjectId(req.params.id),
    });

    if (resultReview.deletedCount < 1) {
      return res.status(404).json({ msg: 'Anúncio sem reviews deletado' });
    }
    return res.status(200).json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
