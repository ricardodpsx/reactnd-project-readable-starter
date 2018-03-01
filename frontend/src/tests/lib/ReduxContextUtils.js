import ReactDOM from "react-dom";
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import ReactTestUtils from 'react-dom/test-utils';

class ReduxContextUtils {
  defaultState = {}
  reducer = null;

  constructor(options) {

    this.mockDispatch = (options && options.mockDispatch) || null;
  }

  getView(component) {
    return new ReduxComponent(this._getReduxComponent(component));
  }


  setStoreData(data) {
    this.defaultState = Object.assign(this.defaultState, data);
  }

  _getReduxComponent(component) {
    this.store = createStore(this.reducer && ((st = this.defaultState, action) => this.reducer(st, action)) || (() => this.defaultState));

    if (this.mockDispatch)
      this.store.dispatch = this.mockDispatch;

    return ReactTestUtils.renderIntoDocument(<Provider store={this.store}>
      {component}
    </Provider>);
  }
}

//Visual Component
class ReduxComponent {
  constructor(component) {
    this.component = component;
    this.domNode = ReactDOM.findDOMNode(component);
    this.contents = this.domNode.innerHTML;
  }

  contains(text) {
    return this.containsList([text]);
  }

  containsAll(object, fields) {
    fields.forEach((fieldName) =>
      this.contains(object[fieldName])
    );
  }

  containsList(list) {
    list.forEach((item) => expect(this.contents).toContain(item));
  }

  click(selector) {
    let node = this.domNode.querySelector(selector);
    expect(node).not.toBeFalsy();
    ReactTestUtils.Simulate.click(node);
  }

  getTextContents(selector) {
    let nodes = this.domNode.querySelectorAll(selector);

    let values = [];
    nodes.forEach((n) => values.push(n.textContent));
    return values;
  }


}

ReduxContextUtils.reduxComponent = ReduxComponent;


export default ReduxContextUtils;
export {ReduxComponent};