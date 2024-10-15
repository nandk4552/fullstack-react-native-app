const express = require("express");
const { requireSignIn } = require("../controllers/user.controller");
const {
  createPostController,
  getAllPostController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/post.controller");

// router object
const router = express.Router();

// routes
// * CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

// * GET ALL POST || GET
router.get("/get-all-posts", getAllPostController);

// * GET USER POSTS || GET
router.get("/get-user-posts", requireSignIn, getUserPostsController);

// * UPDE POST || PUT
router.put("/update-post/:id", requireSignIn, updatePostController);

// * DELETE POST || DELETE
router.delete("/delete-post/:id", requireSignIn, deletePostController);

// export
module.exports = router;
