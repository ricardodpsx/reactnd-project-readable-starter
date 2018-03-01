import React from 'react';
import {connect} from "react-redux";
import Comments from "../comment/Comments"
import {friendlyDate} from "../../utils/date";
import {postDownVote, postUpVote, removePost} from "./actions";
import Vote from "../shared/Vote"
import EditActions from "../shared/EditActions";
import {goTo, A} from "../router";


function PostDetail({currentPost, dispatch}) {
  return <div className="post-detail">

    <h2>{currentPost.title}</h2>
    <p>{currentPost.body}</p>

    <div><i>Created by {currentPost.author}, {currentPost.date}</i></div>
    <div><A href={`/category/${currentPost.category}`}> [{currentPost.category}]</A></div>
    <div className="pull-left">
      <Vote
        onUpVote={() => {
          dispatch(postUpVote(currentPost.id))
        }}
        onDownVote={() =>
          dispatch(postDownVote(currentPost.id))
        }
        score={currentPost.voteScore}/>
    </div>
    <div className="pull-right">
      <EditActions
        onEdit={() => dispatch(goTo(`/post/${currentPost.id}/edit`))}
        onRemove={() => dispatch(removePost(currentPost.id))}
      />
    </div>
    <br/>
    <hr/>
    <Comments/>
  </div>
}


function mapStateToProps(state) {
  return {
    currentPost: {date: friendlyDate(state.currentPost.timestamp), ...state.currentPost}
  };
}

export default connect(mapStateToProps)(PostDetail)
