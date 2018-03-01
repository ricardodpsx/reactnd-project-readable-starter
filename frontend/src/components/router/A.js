import React from 'react';
import {connect} from "react-redux";
import {goTo} from "./actions";


function A({dispatch, args, children, action, currentPath, ...props}) {

  return <a {...props} onClick={
    (e) => {
      e.preventDefault();

      if (action)
        dispatch(action);

      dispatch(goTo(props.href, args));
    }}>{children}</a>

}

function mapStateToProps(state) {
  return {
    currentPath: state.currentPath
  }
}

export default connect(mapStateToProps)(A);