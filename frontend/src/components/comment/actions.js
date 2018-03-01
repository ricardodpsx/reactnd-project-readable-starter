import * as commentsApi from '../../api/commentsApi';

function updateEditingComment(comment) {
  return {
    type: updateEditingComment.name,
    comment
  }
}

function loadComments(parentId) {
  return async (dispatch) =>
    dispatch(receiveComments(await commentsApi.findAll(parentId)));
}

function commentAdded(savedComment) {
  return {type: commentAdded.name, comment: savedComment};
}

function sendComment(newComment) {
  return async function doSendComment(dispatch, getState) {
    let author = getState().author.name;
    let savedComment = await commentsApi.save({...newComment, author});
    dispatch(commentAdded(savedComment));
  }
}

function receiveComments(comments) {
  return {
    type: receiveComments.name,
    comments
  }
}

function removeComment(id) {
  return async function doRemoveComment(dispatch) {
    dispatch({
      type: removeComment.name,
      id
    });
    commentsApi.remove(id);
  }
}

function commentUpVote(id) {
  return (dispatch) => {
    commentsApi.upVote(id);
    dispatch({type: commentUpVote.name, vote: +1, id: id})
  }
}

function commentDownVote(id) {
  return (dispatch) => {
    commentsApi.downVote(id);
    dispatch({type: commentDownVote.name, vote: -1, id: id})
  }
}

export {
  sendComment,
  updateEditingComment,
  loadComments,
  removeComment,
  commentUpVote,
  commentDownVote,
  receiveComments,
  commentAdded
}