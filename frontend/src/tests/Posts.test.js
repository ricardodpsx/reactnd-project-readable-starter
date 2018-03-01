import {given, then, when} from './lib/bdd';
import {applyMiddleware, compose, createStore} from "redux";
import reducer from "../reducer";
import {mapStateToProps} from "../components/post/Posts";
import {newPost, newPosts} from "./ModelsFactory";
import {loadAllPosts, savePost, sortBy} from "../components/post/actions";
import * as postsApi from '../api/postsApi';
import thunk from "redux-thunk";
import React from 'react';

let ctx;


class ReduxContext {

  async postsExist(posts) {
    postsApi.findAll = async function () {
      return posts;
    };

    postsApi.save = async (post) => {
      this.postSaveCalled = true;
      return {...post, id: "abcd"};
    };

    this.store = createStore(reducer,
      compose(
        applyMiddleware(thunk),
      )
    );

    this.store.dispatch(loadAllPosts());

    this.waitForIt();
  }

  viewModel() {
    return mapStateToProps(this.store.getState()).posts;
  }

  sortByVoteScore() {
    this.store.dispatch(sortBy('voteScore'));
  }

  sortByTimestamp() {
    this.store.dispatch(sortBy('timestamp'));
  }

  createNewPost(post) {

    this.store.dispatch(savePost(post));
    this.waitForIt();
  }

  titles() {
    return this.store.getState().posts.map((p) => p.title)
  }

  scores() {
    return this.store.getState().posts.map((p) => p.voteScore)
  }

  async waitForIt() {
    return new Promise(resolve => setImmediate(resolve));
  }

  postSavedInBackend() {
    return this.postSaveCalled;
  }
}

beforeEach(() => {
  ctx = new ReduxContext();
});

it('should list all of the posts', async () => {
  given("Following posts exist");
  let posts = newPosts([
    {title: "One", body: " I'm the One "},
    {title: "Two", body: " I'm the second "}
  ]);

  await ctx.postsExist(posts);


  then("I should see all PostsContext");
  expect(ctx.titles()).toEqual(["One", "Two"]);

});

// should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
it('should sort by voteScore', async () => {

  given("Following posts exist");
  let posts = newPosts([{voteScore: 5}, {voteScore: 3}, {voteScore: 4}]);

  await ctx.postsExist(posts);

  when("PostsContext are sorted by voteScore");
  ctx.sortByVoteScore();

  then("They should be sorted");
  expect(ctx.scores()).toEqual([3, 4, 5]);

});
//
it('should sort by timestamp', async () => {

  given("Following posts exist");
  let posts = newPosts([{
    title: "C",
    timestamp: 2,
  }, {
    title: "A",
    timestamp: 0
  }, {
    title: "B",
    timestamp: 1
  }]);

  await ctx.postsExist(posts);

  when("PostsContext are sorted by voteScore");
  ctx.sortByTimestamp();

  then("They should be sorted");
  expect(ctx.titles()).toEqual(["A", "B", "C"]);

});

it('should create a new post', async () => {
  given("Following posts exist");
  let posts = newPosts([]);

  await ctx.postsExist(posts);

  when("I create a new post");
  ctx.createNewPost(newPost({title: "My new post"}));

  then("It should be created");
  expect(ctx.postSavedInBackend()).toBe(true);
});



