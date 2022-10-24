const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("you can update only your account");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.deleteOne({ _id: req.params.id });
      res.status(200).json("Account has been deleted");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("you can delete only your account");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("/:d/follow", async (req, res) => {
  if (req.body.userId !== req.params.d) {
    try {
      const user = await User.findById(req.params.d);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followins: req.params.d } });
      }
      res.status(200).json("user has been followed")
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});


router.put("/:d/unfollow", async (req, res) => {
  console.log(req.params.d)
  if (req.body.userId !== req.params.d) {
    try {
      const user = await User.findById(req.params.d);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followins: req.params.d } });
      }
      res.status(200).json("user has been unfollowed")
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});


module.exports = router;
