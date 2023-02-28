class Comment {
  constructor(name, text) {
    this.name = name;
    this.text = text;
    this.date = new Date();
  }
}

module.exports = Comment;
