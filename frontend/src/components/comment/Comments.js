import React, {Component} from 'react';
import {connect} from "react-redux";
import {commentDownVote, commentUpVote, removeComment, sendComment, updateEditingComment} from "./actions";
import {friendlyDate} from "../../utils/date";
import Vote from "../shared/Vote";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import EditActions from "../shared/EditActions";

class Comments extends Component {

  handleInputChange(event) {
    const body = event.target.value;
    this.props.dispatch(updateEditingComment({body}));
  }

  handleSubmit(event) {
    event.preventDefault();
    let {dispatch, newComment, parentId} = this.props;
    dispatch(sendComment({...newComment, parentId}));
  }

  render() {
    let {newComment, comments, dispatch} = this.props;

    return <div>
      <AddComment
        text={newComment.body}
        onSubmit={this.handleSubmit.bind(this)}
        onChange={this.handleInputChange.bind(this)}
      />
      {comments.map((comment) =>
        <Comment key={comment.id} dispatch={dispatch} comment={comment}/>
      )}
    </div>;
  }
}

function Comment({comment, dispatch}) {
  return <div className="comment">
    <p>{comment.body}</p>
    <p><i>by: {comment.author}, {friendlyDate(comment.timestamp)} </i></p>

    <div className="pull-left">
      <Vote
        score={comment.voteScore}
        onUpVote={() => dispatch(commentUpVote(comment.id))}
        onDownVote={() => dispatch(commentDownVote(comment.id))}
      />
    </div>
    <div className="pull-right">
      <EditActions
        onEdit={() => dispatch(updateEditingComment(comment))}
        onRemove={() => dispatch(removeComment(comment.id))}
      />
    </div>

    <div className="clearfix"/>
    <hr/>
  </div>
}

function AddComment({onSubmit, text, onChange}) {
  return <form className="comments-add" onSubmit={onSubmit}>
    <FormGroup>
      <FormControl
        componentClass="textarea"
        required
        name="newComment"
        value={text}
        onChange={onChange}
        placeholder="...write a comment"
      />
    </FormGroup>
    <Button type="submit">Save </Button>
    <hr/>
  </form>
}


function mapStateToProps(state) {

  let comments = [...state.comments];
  comments.sort((a, b) => b.timestamp - a.timestamp);

  return {
    parentId: state.currentPost.id,
    newComment: state.newComment,
    comments: comments,
    author: state.author.name
  };
}

export default connect(mapStateToProps)(Comments)