const express = require("express"); //Es5

const app = express(); // server

const users = [
  { id: 1, name: "wael", email: "wael@gmail.com" },
  { id: 2, name: "ali", email: "ali@gmail.com" },
  { id: 3, name: "sara", email: "sara@gmail.com" },
];

// Post array

const posts = [
  { id: 1, title: "title 1", body: "body title 1" },
  { id: 2, title: "title 2", body: "body title 2" },
  { id: 3, title: "title 3", body: "body title 3" },
];

//   GetAllUsers

app.get("/getUsers", (req, res) => {
  res.json(users);
});

//  AddUser

app.post("/addUser", express.json(), (req, res) => {
  let isExist = users.find((user) => user.email == req.body.email);
  if (isExist) {
    res.send("Email already exist");
  } else {
    users.push(req.body);
    res.send("added user successfuly");
  }
});

// Get all users sorted alphabetically by name

app.get("/sortedUser", (req, res) => {
  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
  res.send(sortedUsers);
});

// delete user

app.delete("/deleteUser", express.json(), (req, res) => {
  const userIndex = users.findIndex((user) => user.email == req.body.email);
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.send("deleted successfully");
  } else {
    res.send("Please enter valid email");
  }
});

// Update user

app.patch("/updateUser", express.json(), (req, res) => {
  let { name, email } = req.body; // destruct
  const userIndex = users.findIndex((user) => user.email == email);
  if (userIndex > -1) {
    users[userIndex].name = name;
    res.send("updated successfully");
  } else {
    res.send("email is invalid");
  }
});

// search  user by id

app.get("/searchById", (req, res) => {
  let userIndex = users.findIndex((user) => user.id == req.body.id);
  if (userIndex < 0) {
    res.send("user not found");
  } else {
    users[userIndex].id = req.body.id;
    res.send("User Found");
  }
});

// *************************************

//   GetAllUsers

app.get("/getPosts", (req, res) => {
  res.json(posts);
});

// AddPost

app.post("/addPost", (req, res) => {
  let isExist = posts.find((post) => post.title == req.body.title);
  if (isExist) {
    res.send("Post title already exists");
  } else {
    posts.push(req.body);
    res.send("Added post successfully");
  }
});

// Get all posts reversed

app.get("/getReversedPosts", (req, res) => {
  const reversedPosts = [...posts].reverse();
  res.send(reversedPosts);
});

// DeletePost

app.delete("/deletePost", (req, res) => {
  const postIndex = posts.findIndex((post) => post.title == req.body.title);
  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    res.send("Deleted post successfully");
  } else {
    res.send("Please enter a valid title");
  }
});

// UpdatePost
app.patch("/updatePost", (req, res) => {
  let { title, body } = req.body; // destruct
  const postIndex = posts.findIndex((post) => post.title == title);
  if (postIndex > -1) {
    posts[postIndex].body = body;
    res.send("Updated post successfully");
  } else {
    res.send("Title is invalid");
  }
});

// SearchPostById
app.get("/searchPostById", (req, res) => {
  let postIndex = posts.findIndex((post) => post.id == req.body.id);
  if (postIndex < 0) {
    res.send("Post not found");
  } else {
    res.send(posts[postIndex]);
  }
});

app.listen(3000, () => {
  console.log("server runing ....");
});
