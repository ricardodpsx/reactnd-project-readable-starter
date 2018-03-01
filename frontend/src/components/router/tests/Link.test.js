import A from "../A";
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import {goTo} from "../actions";


it('Should launch GOTO action with args', function () {
  let actionCalled = false;
  let store = createStore((state = {}, action) => {
    actionCalled = action;
    return state;
  });

  let rendered = ReactTestUtils.renderIntoDocument(<Provider store={store}>
    <A href={"/"} args={"someArgument"}>Hello</A>
  </Provider>);

  click(rendered);

  expect(actionCalled.type).toBe(goTo.name);
  expect(actionCalled.args).toBe("someArgument");

});


it('Should launch an extra action', function () {
  let actionCalled = false;
  let store = createStore((state = {}, action) => {
    if (action.type === "OTHER")
      actionCalled = action;
    return state;
  });

  let rendered = ReactTestUtils.renderIntoDocument(<Provider store={store}>
    <A href={"/"} action={{type: "OTHER"}}>Hello</A>
  </Provider>);

  click(rendered);

  expect(actionCalled.type).toBe("OTHER");
});


function click(renderedComponent) {
  let domNode = ReactDOM.findDOMNode(renderedComponent);
  expect(domNode).not.toBeFalsy();
  ReactTestUtils.Simulate.click(domNode);
}