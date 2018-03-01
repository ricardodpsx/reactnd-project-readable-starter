import React from 'react';
import './Vote.css';

function Vote({onUpVote, onDownVote, score}) {

  return <div>
    <strong>Votes:</strong> {score} &nbsp; &nbsp;
    <a href="/upVote" onClick={(e) => {
      e.preventDefault();
      onUpVote();
    }}>
      <i className="fas fa-smile"/>
    </a>
    &nbsp;  &nbsp;
    <a href="/downVote"
       onClick={(e) => {
         e.preventDefault();
         onDownVote();
       }}>
      <i className="fas fa-frown vote-down"/>
    </a>
  </div>
}

export default Vote;