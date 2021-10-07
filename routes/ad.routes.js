const express = require('express');
const router = express.Router();
const AdModel = require('../models/Ad.model');
const ReviewModel = require('../models/Review.model');
const PetModel = require('../models/Pet.model');
const UserModel = require('../models/User.model');

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
    if (req.body.user) {
      await UserModel.updateOne(
        { _id: ObjectId(req.body.user) },
        { $push: { ads: result._id } }
      );
    }
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

// cRud (Read) => GET (Get all ads from the app)
router.get('/adv', async (req, res, next) => {
  try {
    const result = await AdModel.find({})
      .populate('pets user')
      .populate({
        path: 'reviews',
        populate: {
          path: 'author',
          model: 'User',
        },
      });
    if (req.query.search) {
      const normalizedSearch =
        req.query.search[0].toUpperCase() +
        req.query.search.slice(1).toLowerCase();
      const filtered = await AdModel.find({
        $or: [
          { 'location.city': normalizedSearch },
          { 'location.country': normalizedSearch },
        ],
      });
      return res.status(200).json(filtered);
    }
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

// cRud (Read) => GET (Get one)
router.get('/adv/:id', async (req, res, next) => {
  try {
    const result = await AdModel.findOne({ _id: req.params.id })
      .populate('user pets')
      .populate({
        path: 'reviews',
        populate: {
          path: 'author',
          model: 'User',
        },
      });
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

    const resultUser = await UserModel.updateMany({
      $pull: { ads: ObjectId(req.params.id) },
    });

    if (resultUser) {
      return res.status(200).json({});
    }

    if (resultReview.deletedCount < 1) {
      return res.status(200).json({ msg: 'Anúncio sem reviews deletado' });
    }

    return res.status(200).json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
