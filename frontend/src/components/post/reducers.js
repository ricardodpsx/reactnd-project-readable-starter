import {goTo} from "../router/actions";
import {postDownVote, postUpVote, receiveCurrentPost, receivePosts, sortBy, updateEditingPost} from "./actions";

function currentPost(currentPost = {title: "", body: "", author: "", category: ""}, action) {
  switch (action.type) {
    case goTo.name:
      if (action.href === "/post/new")
        return {title: "", body: "", author: "", category: ""};
      else
        return currentPost;

    case receiveCurrentPost.name:
      return action.post;

    case updateEditingPost.name:
      return {...currentPost, [action.field]: action.value};

    case postUpVote.name:
    case postDownVote.name:
      return {...currentPost, voteScore: currentPost.voteScore + action.vote}

    default:
      return currentPost;
  }

}

function posts(posts = [], action) {
  switch (action.type) {

    case sortBy.name:
      posts = [...posts];
      if(action.direction === "asc")
        posts.sort((a, b) => a[action.field] - b[action.field]);
      else
        posts.sort((a, b) => - a[action.field] + b[action.field]);

      return posts;

    case  receivePosts.name:
      return action.posts;

    default:
      return posts;
  }
}

export {
  posts,
  currentPost
}


