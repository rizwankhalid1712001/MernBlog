const express = require('express');
const router = express.Router();
const Comments = require('../model/Comments');

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const { text, user, blog } = req.body;
    const comment = new Comments({ text, user, blog });
    await comment.save();
    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve comments for a specific blog post
router.get('/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comments.find({ blog: blogId }).populate('user');
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a comment
router.delete('/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await Comments.findByIdAndDelete(commentId);
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
