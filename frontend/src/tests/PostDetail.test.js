import React from 'react';
import ReduxContextUtils from "./lib/ReduxContextUtils";
import PostDetail from "../components/post/PostDetail";

import {newPost} from "./ModelsFactory";
import * as date from "../utils/date";


jest.mock('../components/comment/Comments');

date.friendlyDate = function () {
  return "1 year ago";
}

it('should show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score', function () {
  let ctx = new ReduxContextUtils();
  let date = new Date("August 19, 2017 23:15:30");
  let post = {title: 'a title', body: 'a body', voteScore: 20, timestamp: date.valueOf()};
  ctx.setStoreData({currentPost: newPost(post)});


  let view = ctx.getView(<PostDetail/>);
  view.containsAll(post, ['title', 'body', 'voteScore']);
  view.contains("1 year ago");
});








