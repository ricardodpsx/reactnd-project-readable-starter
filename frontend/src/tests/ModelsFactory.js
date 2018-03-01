export {newPosts, newPost, newCategories, newComments};

function newPost(post) {
  return Object.assign({
    "id": "abc" + Math.random(),
    "timestamp": 1467166872634,
    "title": "xxxx",
    "body": "Everyone says so after all.",
    "author": "thingtwo",
    "category": "react",
    "voteScore": 6,
    "deleted": false,
    "commentCount": 2
  }, post);
}

function newPosts(posts) {
  return posts.map(newPost);
}


function newCategory(category) {
  return Object.assign({path: category.name}, category);
}

function newCategories(categories) {
  return categories.map(newCategory);
}

function newComment(comment) {
  console.assert(comment.parentId, "The post id is required");

  return Object.assign({
    id: "abc" + Math.random(),
    parentId: null,
    timestamp: Date.now(),
    body: "Lorem Ipsum dolor",
    author: "Leviatan",
    voteScore: 3,
    deleted: false,
    parentDeleted: false
  }, comment);
}

function newComments(comments) {
  return comments.map(newComment);
}