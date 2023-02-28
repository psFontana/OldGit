const Comment = require("./Comment");

class Post {
  constructor(author, title, body) {
    this.author = author;
    this.title = title;
    this.body = body;
    this.comments = [];
    this.date = new Date();
  }

  addComment(author, content) {
    this.comments.push(new Comment(author, content));
  }
}

module.exports = Post;
