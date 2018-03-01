import * as postsApi from '../../api/postsApi';
import {goTo} from "../router/actions";

function receivePosts(posts) {
  return {type: receivePosts.name, posts: posts};
}

function receiveCurrentPost(post) {
  return {type: receiveCurrentPost.name, post}
}

function loadAllPosts() {
  return async (dispatch) =>
    dispatch(receivePosts(await postsApi.findAll()))
}

function filterPostsByCategory(category) {
  return async (dispatch) =>
    dispatch(receivePosts(await postsApi.byCategory(category)))
}

function loadPost(id) {
  return async (dispatch) =>
    dispatch(receiveCurrentPost(await postsApi.byId(id)));
}

function savePost(post) {
  return async function doSavePost(dispatch, getState) {
    let author = getState().author.name;
    let savedPost = await postsApi.save({...post, author});
    dispatch({type: receiveCurrentPost.name, post: savedPost});
    dispatch(goTo(`/post/${savedPost.id}`));
  }
}

function sortBy(field, direction = "asc") {
  return {type: sortBy.name, field: field, direction};
}

function updateEditingPost(field, value) {
  return {type: updateEditingPost.name, field, value}
}


function postUpVote(id) {
  return (dispatch) => {
    postsApi.upVote(id);
    dispatch({type: postUpVote.name, vote: +1, id: id})
  }
}

function postDownVote(id) {
  return (dispatch) => {
    postsApi.downVote(id);
    dispatch({type: postDownVote.name, vote: -1, id: id})
  }
}

function removePost(id) {
  return function doRemovePost(dispatch) {
    postsApi.remove(id);
    dispatch(goTo(`/`));
  }
}

export {
  loadAllPosts,
  receivePosts,
  filterPostsByCategory,
  savePost,
  sortBy,
  updateEditingPost,
  loadPost,
  postUpVote,
  postDownVote,
  removePost,
  receiveCurrentPost
};
