const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  return username && typeof(username) === "string" ? true : false;
}

const authenticatedUser = (username,password)=>{
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (doesExist(username)) { 
      return res.status(200).json({message: "User already exists!"});
    }
    else {
      return res.status(404).json({message: "User does not exist"});
    }
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let book = books[isbn]
  if (book) {
      let review = req.body.reviews;
      if(review) {
          books[review] = review;
      }
      books[username]=book;
      res.send(`Book with the username  ${username} updated.`);
  }
  else{
      res.send("Unable to find book!");
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
