const postModel = require("../models/post.model");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    });
    // console.log("req==>", req);
    await post.save();

    return res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in create post API",
      error,
    });
  }
};
const getAllPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    if (!posts) {
      return res.status(404).send({
        success: false,
        message: "No Posts found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      total: posts.length,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all posts API",
      error,
    });
  }
};

const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel
      .find({ postedBy: req?.auth?._id })
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    if (!userPosts) {
      return res.status(404).send({
        success: false,
        message: "User Posts Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User Posts",
      total: userPosts.length,
      userPosts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in get user posts API",
      error,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide post id",
      });
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and description",
      });
    }

    const post = postModel.findById({ _id: id });

    const updatedPosts = await postModel.findByIdAndUpdate(
      { _id: id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Post updated successfully",
      updatedPosts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in update user post API",
      error,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide post id",
      });
    }

    await postModel.findByIdAndDelete({ _id: id });

    return res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete user post API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
