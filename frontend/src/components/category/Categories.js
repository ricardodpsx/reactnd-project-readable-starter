import React, {Component} from 'react';
import {connect} from "react-redux";
import {Nav, NavItem} from "react-bootstrap";
import {goTo} from "../router/actions";

class Categories extends Component {

  handleSelection(e) {
    e.preventDefault();
    this.props.dispatch(goTo(e.target.getAttribute("href")));
  }

  render() {
    return <div className="categories">
      <h3>Categories</h3>
      <Nav bsStyle="pills" stacked activeKey={1}>
        {this.props.categories.map((c) =>
          <NavItem key={c.name} href={c.href} onClick={this.handleSelection.bind(this)}>
            {c.name}
          </NavItem>
        )}
      </Nav>
    </div>
  }

}


function mapStateToProps(state) {
  return {
    categories: state.categories.map(c => ({href: `/category/${c.path}`, ...c}))
  };
}

export default connect(mapStateToProps)(Categories);

export {mapStateToProps};
