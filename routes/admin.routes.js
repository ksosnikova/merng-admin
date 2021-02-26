const { Router } = require('express');
const Profile = require('../models/Profiles');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const config = require('config');
const router = Router();

router.get('/', auth, async (req, res) => {
    try {
      const usersDB = await User.find({});
      const profilesDB = await Profile.find({}); 
      res.json({ usersDB, profilesDB });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  });


router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (user.isAdmin) {
      user.isAdmin = false;
      await user.save();
    } else {
      user.isAdmin = true;
      await user.save();
    };
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const deleteUser = await User.findOneAndRemove({ _id: req.params.id });
    res.send(deleteUser);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router;