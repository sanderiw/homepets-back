const express = require('express');
const router = express.Router();
const ReviewModel = require('../models/Review.model');
const AdModel = require('../models/Ad.model');

const { ObjectId } = require('mongoose').Types;

// Importando isAuthenticated mas ainda não usando como middleware em nenhum route
const isAuthenticated = require('../middlewares/isAuthenticated');

// Crud de Reviews

// Crud - Create => POST
router.post('/review', async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await ReviewModel.create({ ...req.body });
        // Adicionado a referência da tarefa recém-criada no advertisement
        if (req.body.to.toAd) {
            await AdModel.updateOne(
                { _id: req.body.to.toAd },
                { $push: { reviews: result._id } }
            );
        } //falta fazer o else if pra user model

        return res.status(201).json(result);
    } catch (err) {
        return next(err);
    }
});

// cRud (Read) => GET (Get all ads from the app)
router.get('/review', async (req, res, next) => {
    try {
        const result = await ReviewModel.find({});
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
});

// cRud (Read) => GET (Get one)
router.get('/review/:id', async (req, res, next) => {
    try {
        const result = await ReviewModel.findOne({ _id: req.params.id });
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
});

// cRud (Read) => GET (Get all reviews for user)
router.get('/review/user/:user', async (req, res, next) => {
    try {
        const result = await ReviewModel.find({
            'to.toUser': ObjectId(req.params.user),
        });
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
});

// cRud (Read) => GET (Get all reviews for ad)
router.get('/review/ad/:ad', async (req, res, next) => {
    try {
        const result = await ReviewModel.find({
            'to.toAd': ObjectId(req.params.ad),
        });
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
});

// cruD (Delete) => DELETE
router.delete('/review/:id', async (req, res, next) => {
    try {
        const result = await ReviewModel.deleteOne({
            _id: ObjectId(req.params.id),
        });

        if (result.deletedCount < 1) {
            return res.status(404).json({ msg: 'Review não encontrado' });
        }
        return res.status(200).json({});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
