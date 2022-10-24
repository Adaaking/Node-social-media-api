const Post = require("../models/Post");
const User = require("../models/User");
const { post } = require("./users");

const router = require("express").Router();

router.post("/createPost", async (req, res) => {
  const post = new post(req.body);
  try {
    const savedPost = post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (error) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId || req.user.isAdmin) {
      await Post.deleteOne({ _id: req.params.id });
      res.status(200).json("updated");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (error) {
    console.log(err);
  }
});

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(500).json(err);
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
    }
  } catch (error) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followins.map((friendId) => {
        return post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {}
});
module.exports = router;
