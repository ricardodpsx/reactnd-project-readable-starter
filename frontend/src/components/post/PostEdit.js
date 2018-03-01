import {connect} from "react-redux";
import React, {Component} from 'react';
import {savePost, updateEditingPost} from "./actions";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {A} from "../router";

class PostEdit extends Component {

  handleInputChange(event) {
    const {name, value} = event.target;
    this.props.dispatch(updateEditingPost(name, value));
  }

  handleSubmit(event) {
    event.preventDefault();
    let {dispatch, currentPost} = this.props;
    dispatch(savePost({...currentPost}));
  }

  render() {
    let {currentPost, categories} = this.props;

    return <form onSubmit={this.handleSubmit.bind(this)} className="post-edit">

      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type="text"
          name="title"
          required
          value={currentPost.title}
          onChange={this.handleInputChange.bind(this)}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="body"
          required
          value={currentPost.body}
          onChange={this.handleInputChange.bind(this)}
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel>Category</ControlLabel>
        <FormControl componentClass="select"
                     name="category"
                     required
                     value={currentPost.category}
                     onChange={this.handleInputChange.bind(this)}
        >
          <option key="">...select</option>
          {categories.map(c =>
            <option key={c.path}>{c.name}</option>
          )}
        </FormControl>
      </FormGroup>
      <Button type="submit">Save </Button>

      <div><A href="/">Go back</A></div>
    </form>
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    currentPost: state.currentPost
  }
}

export default connect(mapStateToProps)(PostEdit)