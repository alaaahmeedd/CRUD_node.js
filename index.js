const http = require("http");
const { json } = require("node:stream/consumers");

// User array

const users = [
  { id: 1, name: "wael", email: "alaa@gmail.com" },
  { id: 2, name: "ali", email: "ali@gmail.com" },
  { id: 3, name: "sara", email: "sara@gmail.com" },
];

// Post array

const posts = [
  { id: 1, title: "title 1", body: "body title 1" },
  { id: 2, title: "title 2", body: "body title 2" },
  { id: 3, title: "title 3", body: "body title 3" },
];

const server = http.createServer(function (req, res) {
  // GetAllUsers

  if (req.url == "/getUsers" && req.method == "GET") {
    res.end(JSON.stringify(users));

    // AddUser

  } else if (req.url == "/addUser" && req.method == "POST") {
    req.on("data", function (chunk) {
      users.push(JSON.parse(chunk));
      console.log(JSON.parse(chunk));
      res.end(chunk);
    });

    // Get all users sorted alphabetically by name

  } else if (req.url == "/sort-users" && req.method == "GET") {
    const sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
    res.end(JSON.stringify(sortedUsers));

    // Delete User
  } else if (req.url == "/deleteUser" && req.method == "DELETE") {
    let body = ""; // for elly rag3 mn el body
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let bufferdData = JSON.parse(body);
      let userIndex = users.findIndex((user) => user.id === bufferdData.id);
      userIndex.name === bufferdData.name;
      userIndex.email === bufferdData.email;

      if (userIndex >= 0) {
        users.splice(userIndex, 1);
        res.statusCode = 200;
        res.end(JSON.stringify(users));
        // res.end("User deleted successfully");
      } else {
        res.statusCode = 404;
        res.end("User not found");
      }
    });

    // Update User
  } else if (req.url == "/updateUser" && req.method == "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let bufferdData = JSON.parse(body);
      let userIndex = users.findIndex((user) => user.id == bufferdData.id);
      userIndex.name === bufferdData.name;
      userIndex.email === bufferdData.email;
      res.end(JSON.stringify(users));
    });
  }

  // Search by id
  else if (req.url == "getUserById" && req.method == "GET") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let bufferdData = JSON.parse(body);
      let userIndex = users.find((user) => user.id == bufferdData.id);

      if (userIndex) {
        res.statusCode = 200;
        res.end(JSON.stringify(userIndex));
      } else {
        res.statusCode = 404;
        res.end("User not found");
      }
    });
  }

  //   Get All Posts
  else if (req.url == "/getPosts" && req.method == "GET") {
    res.end(JSON.stringify(posts));

    // AddPost
  } else if (req.url == "/addPost" && req.method == "POST") {
    res.on("data", function (chunk) {
      posts.push(JSON.parse(chunk));
      res.end(JSON.stringify(posts));
    });

    // Get all Posts reversed
  } else if (req.url == "/getReversedPosts" && req.method == "POST") {
    res.on("data", function (chunk) {
      const reversedPosts = posts.slice().reverse();
      res.statusCode = 200;
      res.end(JSON.stringify(reversedPosts));
    });
  }
  // Delete Post
  else if (req.url == "/deletePost" && req.method == "DELETE") {
    let body = "";
    res.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let bufferdData = JSON.parse(chunk);
      let PostIndex = posts.findIndex((post) => post.id == bufferdData.id);
      posts.splice(PostIndex, 1);
      res.end(JSON.stringify(posts));
    });
  }

  // Update post
  else if (req.url == "/updatePost" && req.method == "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let bufferdData = JSON.parse(body);
      let postIndex = posts.findIndex((post) => post.id == bufferdData.id);
      postIndex.title === bufferdData.title;
      postIndex.body === bufferdData.body;
      res.end(JSON.stringify(posts));
    });
  }
  // Search post by id
  else if (req.url == "searchPostById" && req.method == "GET") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let bufferdData = JSON.parse(body);
      let postIndex = posts.find((post) => post.id == bufferdData.id);

      if (postIndex) {
        res.statusCode = 200;
        res.end(JSON.stringify(postIndex));
      } else {
        res.statusCode = 404;
        res.end("Post not found");
      }
    });
  }
});

server.listen(3000, function () {
  console.log("server is Running ....");
});
