import {connect} from "react-redux";

import {Component} from "react";
import {goTo} from "./actions";


class RouterComponent extends Component {

  componentDidMount() {
    let {dispatch} = this.props;
    window && window.addEventListener("popstate", function () {
      dispatch(goTo(document.location.pathname));
    });

    dispatch(goTo(document.location.pathname));
  }

  render() {
    let {routes, currentPath} = this.props;
    return routes.resolve(currentPath);
  }
}

function mapStateToProps(state) {
  return {
    currentPath: state.router.currentPath
  }
}

export default connect(mapStateToProps)(RouterComponent);

