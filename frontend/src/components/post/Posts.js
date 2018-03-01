import React, {Component} from 'react';
import {connect} from "react-redux";
import {sortBy} from "./actions";
import {A} from "../router";
import {friendlyDate} from "../../utils/date";
import {Badge} from "react-bootstrap";
import "./Posts.css";

class Posts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      direction: "asc"
    };
  }

  handleSortBy(field) {
    this.props.dispatch(sortBy(field, this.state.direction ));
    this.setState((prevState)=> ({...prevState, direction: prevState.direction === 'asc'? "desc" : "asc"}));
  }

  render() {
    let posts = this.props.posts;
    return <div className="posts">
      <div className="pull-right"> <A className="post-new" href="/post/new">
        Add Post <i className="create-post fas fa-plus-square"></i>
      </A> </div>
      <SortBy
        fields={{"voteScore": "Vote Score", "timestamp": "Date"}}
        onSort={this.handleSortBy.bind(this)}/>
        {posts.map((post) => <Post key={post.id} post={post}/>)}
    </div>
  }
}

function SortBy({fields, onSort}) {
  return <div className="sortBy">
    Sort By: {
    Object.keys(fields).map((fieldName) =>
      <span key={fieldName} ><a onClick={() => onSort(fieldName)} className={fieldName}>
        {fields[fieldName]}
      </a> | </span>
    )}
  </div>

}

function Post({post}) {
  return (<div className="post">
    <h2><A href={`/post/${post.id}`} className="title">{post.title}</A> <br/></h2>
    <p>
      {post.body}
    </p>
    <div>
      <i>by {post.author}, {friendlyDate(post.timestamp)} <br/></i>
      <strong>category:</strong> {post.category} <br/>
      <strong>Comments:</strong> <Badge>{post.commentCount}</Badge> <br/>
      <strong>Votes:</strong> <span className="voteScore">{post.voteScore}</span> <br/>
    </div>
    <hr/>
  </div>);
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(Posts);
export {mapStateToProps};