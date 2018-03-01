import React, {Component} from 'react';
import './App.css';
import Categories from './category/Categories'
import Posts from './post/Posts'
import {A, RouteBuilder, Router} from "./router"
import PostDetail from './post/PostDetail'
import {filterPostsByCategory, loadAllPosts, loadPost} from "./post/actions";
import {loadComments} from "./comment/actions";

import {connect} from "react-redux";
import {loadCategories} from "./category/actions";
import PostEdit from "./post/PostEdit";
import {Col, Grid, Row} from "react-bootstrap";
import Author from "./author/Author";

class App extends Component {

  componentDidMount() {
    this.props.dispatch(loadCategories());
  }

  render() {
    let dispatch = this.props.dispatch;

    let routes = new RouteBuilder()
      .path("/", () => <Posts/>,
        () => dispatch(loadAllPosts())
      )
      .path("/category/:category", () => <Posts/>,
        ({category}) =>
          dispatch(filterPostsByCategory(category))
      )
      .path("/post/new", () => <PostEdit/>)
      .path("/post/:id", () => <PostDetail/>,
        ({id}) => {
          dispatch(loadPost(id));
          dispatch(loadComments(id))
        })
      .path("/post/:id/edit", () => <PostEdit/>,
        ({id}) => dispatch(loadPost(id)))
      .notFound((path) => `${path} Not Found`);

    return (
      <Grid>
        <Row className="App-header">
          <div className="App-title">
            <A href="/">Readable</A>
          </div>
          <div className="pull-right">
            <Author/>
          </div>
        </Row>
        <Row className="App-content">

          <Col md={10}>
            <Router routes={routes}/>
          </Col>

          <Col md={2}>
            <Categories/>
          </Col>

        </Row>
      </Grid>
    );
  }
}

export default connect()(App);
