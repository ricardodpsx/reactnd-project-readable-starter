import {newCategories, newPosts} from "./ModelsFactory";

import * as categoriesApi from '../api/categoriesApi';
import * as postsApi from '../api/postsApi';
import ReduxContext from "./ReduxContext";


let ctx;

beforeEach(() => {
  ctx = new ReduxContext();
  categoriesApi.findAll = async function () {
    return [];
  };
  postsApi.findAll = async function () {
    return [];
  };
});

/**
 * should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
 */

it('should show all posts', async () => {

  categoriesApi.findAll = async function () {
    return newCategories([{name: "a"}]);
  };
  postsApi.findAll = async function () {
    return newPosts([{title: "a"}, {title: "b"}, {title: "c"}]);
  };

  await ctx.startApp();

  expect(ctx.countPosts()).toBe(3);
  expect(ctx.countCategories()).toBe(1);
});


it('should link to a category view for that category', async () => {

  categoriesApi.findAll = async function () {
    return newCategories([{name: "redux"}]);
  };
  postsApi.byCategory = async function () {
    return newPosts([{title: "a"}, {title: "b"}]);
  };

  await ctx.startApp();

  await ctx.goToCategory("redux");

  expect(ctx.currentPath())
    .toEqual("/category/redux");

  expect(ctx.countPosts()).toBe(2);
});


it('should show new post', async function (cb) {
  await ctx.startApp();

  await ctx.goToNewPost();

  expect(ctx.currentPath())
    .toEqual("/post/new");

  expect(ctx.viewContains(
    ['.post-edit']
  )).toBe(true);

  cb()
});

it('should show single post', async function () {
  // let post = {id:"an-Id", title:"my post"};
  // postsApi.findAll = async function() {
  //   console.info("Calling findAll");
  //   return newPosts([{id:"an-Id", title:"my post"}]);
  // };
  //
  window.location.href = "/";
  await ctx.startApp();
  //console.info(ctx.store.)

  console.info(ctx.currentPath());

  //await ctx.goToPost("my post");
  //
  // expect(ctx.currentPath())
  //   .toEqual("/post/an-Id");
  //
  // expect(ctx.containsAll(post, ['title', 'body', 'author']));

});


it('should list comments in post detail view', function () {
  // let ctx = new ReduxContextUtils();
  // ctx.setStoreData({currentPost: newPost({id:123}), comments: newComments([{parentId:123, body: "ABC"}, {parentId:123, body: "hello world"}])});
  //
  // let view = ctx.getView(<Comments />);
  // view.contains("hello world");
  // view.contains("ABC");
});



