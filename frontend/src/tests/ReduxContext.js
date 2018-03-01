import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import reducer from "../reducer";
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import ReactTestUtils from "react-dom/test-utils";
import {Provider} from 'react-redux';

export default class ReduxContext {

  async createStore() {
    this.store = createStore((st = {}, action) => reducer(st, action),
      compose(
        applyMiddleware(thunk),
      )
    );
  }

  async startApp() {
    this.createStore();
    this.appRendered = ReactTestUtils.renderIntoDocument(<Provider store={this.store}><App/></Provider>);
    this.domNode = ReactDOM.findDOMNode(this.appRendered);

    await this.waitForIt();
  }

  currentPath() {
    return this.store.getState().router.currentPath;
  }

  async goToCategory(category) {
    this.clickItemContaining(category, ".categories a")
    await this.waitForIt();
  }

  countPosts() {
    return this.domNode.querySelectorAll(".post").length;
  }

  countCategories() {
    return this.domNode.querySelectorAll(".categories a").length;
  }

  async waitForIt() {
    return new Promise(resolve => setImmediate(resolve));
  }

  async goToNewPost() {
    let found = this.domNode.querySelector(".post-new");
    ReactTestUtils.Simulate.click(found);
    await this.waitForIt();
  }

  async goToPost(title) {
    await this.clickItemContaining(title, ".post h2");
  }

  async clickItemContaining(text, inSelector) {
    let cnodes = [...this.domNode.querySelectorAll(inSelector)];
    expect(cnodes.length).toBeGreaterThan(0);

    let found = cnodes.find((c) => c.innerHTML.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    ReactTestUtils.Simulate.click(found);
    await this.waitForIt();
  }

  viewContains(selectors) {
    let str = ""
    selectors.forEach((s) => {
      if (!this.domNode.querySelector(s))
        str += s + " not found\n";
    });

    return str === "";
  }

  printHTML() {
    throw "HTML:\n------------\n" + this.domNode.innerHTML + "\n------------\n";
  }

}
