import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useParams } from "react-router-dom";

function CommentSection() {
  const { id, userId } = useParams();

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const createComment = async (text) => {
    const commentObj = {
      text,
      user: userId,
      blog: id,
    };
    try {
      await axios.post("http://localhost:5000/api/comments", commentObj);
      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    createComment(commentText);
  };

  const buttonStyle = {
    marginTop: "1rem",
    background:
      "linear-gradient(90deg, rgba(9,113,121,1) 3%, rgba(205,110,231,1) 100%)",
    color: "#fff",
  };

  const headingStyle = {
    marginTop: "2rem", // Add margin on top of the comment section heading
    textAlign: "center", // Center the text
  };

  return (
    <div>
      <Typography variant="h4" style={headingStyle}>Comment Section</Typography>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" style={buttonStyle}>
          Add Comment
        </Button>
      </form>
      <Paper elevation={3} style={{ marginTop: "2rem", boxShadow: "none" }}>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment._id}>
              <ListItemAvatar>
                <Avatar
                  alt={comment.user.name}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(9,113,121,1) 3%, rgba(205,110,231,1) 100%)",
                    color: "#fff",
                  }}
                >
                  {comment.user.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comment.user.name}
                secondary={new Date(comment.createdAt).toLocaleString()}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />
              <div>{comment.text}</div>
              {comment.user._id === userId && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default CommentSection;
