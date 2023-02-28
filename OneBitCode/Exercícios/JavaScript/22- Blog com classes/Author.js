const Post = require("./Post");

class Author {
  constructor(name) {
    this.name = name;
    this.posts = [];
  }

  addPost(title, body) {
    let post = new Post(this, title, body);
    this.posts.push(post);
    return post;
  }
}

module.exports = Author;
