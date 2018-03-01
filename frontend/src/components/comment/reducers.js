import {
  commentAdded, commentDownVote, commentUpVote, receiveComments, removeComment,
  updateEditingComment
} from "./actions";


function comments(comments = [], action) {

  switch (action.type) {
    case receiveComments.name:
      return action.comments;

    case commentAdded.name:
      return [action.comment, ...comments.filter(c => c.id !== action.comment.id)];

    case commentUpVote.name:
    case commentDownVote.name:
      let votedComment = comments.find(c => c.id === action.id);
      return [...comments.filter(c => c.id !== action.id), {...votedComment, voteScore: votedComment.voteScore + action.vote}];

    case removeComment.name:
      return comments.filter(c => c.id !== action.id);

    default:
      return comments;
  }
}

function newComment(newComment = {body: ""}, action) {
  switch (action.type) {
    case updateEditingComment.name:
      return {...newComment, ...action.comment};
    case commentAdded.name:
      return {body: ""}
    default:
      return newComment;
  }

}

export {
  comments,
  newComment
}