const { Router } = require('express');
const Profile = require('../models/Profiles');
const auth = require('../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');
const config = require('config');
const router = Router();

router.post(
  '/generate', 
  [
    check('name', 'Короткое имя').isLength({ min: 3 }),
    check('gender', 'Выберите пол').notEmpty(),
    check('birthday', 'Выберите дату рождения').notEmpty(),
    check('city', 'Напишите корректный город').isLength({ min: 3 })
  ], auth, async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect registration data'
      })
    };

    const baseUrl = config.get('baseUrl');

    const { name, gender, birthday, city } = req.body;

    console.log('req ', req)

    const profile = new Profile({
      name, gender, birthday, city, owner: req.user.userId
    })

    await profile.save();

    res.status(201).json({ profile })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find({ owner: req.user.userId }); //owner??
    res.json(profiles);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id); //owner??
    res.json(profile);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router;