import {goTo} from "../router/actions";
import {postDownVote, postUpVote, receiveCurrentPost, receivePosts, sortBy, updateEditingPost, postRemoved} from "./actions";

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
      return {...currentPost, voteScore: currentPost.voteScore + action.vote};


    default:
      return currentPost;
  }

}

function posts(posts = [], action) {

  switch (action.type) {

    case sortBy.name: {
      let newPosts = [...posts];
      if (action.direction === "asc")
        newPosts.sort((a, b) => a[action.field] - b[action.field]);
      else
        newPosts.sort((a, b) => -a[action.field] + b[action.field]);

      return newPosts;
    }

    case postUpVote.name:
    case postDownVote.name: {
      let newPosts = [...posts];
      let pIndex = newPosts.findIndex((p) => p.id === action.id);
      newPosts[pIndex] = {...newPosts[pIndex], voteScore: newPosts[pIndex].voteScore + action.vote};
      return newPosts;
    }


    case postRemoved.name:
      return posts.filter(p=> p.id !== action.id);

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


