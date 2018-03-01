import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import {authorLogout, cancelAuthorName, updateAuthorName} from "./actions";

class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: ""
    };
  }

  handleChange(e) {
    this.setState({inputName: e.target.value, validationMessage: ""})
  }

  handleSave(e) {
    let normalizedName = this.state.inputName.toLowerCase().trim();
    if (normalizedName && normalizedName !== "guest")
      this.props.dispatch(updateAuthorName(this.state.inputName))
    else
      this.setState({validationMessage: "Use a valid name"})
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(authorLogout());
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.dispatch(cancelAuthorName());
  }

  render() {
    let {name, requireAuthorFor} = this.props.author;
    let inputName = this.state.inputName;
    let logout = null;

    if (name !== 'Guest')
      logout = <span>| <a href="#logout" onClick={this.handleLogout.bind(this)}>Logout</a></span>;

    return <div className="author">
      Welcome {name} {logout}

      <RequireAuthorDialog
        editingName={inputName}
        validationMessage={this.state.validationMessage}
        onChange={this.handleChange.bind(this)}
        onSave={this.handleSave.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        requireAuthorFor={requireAuthorFor}
      />
    </div>;
  }
}


function RequireAuthorDialog({editingName, onChange, onCancel, onSave, requireAuthorFor, validationMessage}) {
  return <form>
    <Modal show={!!requireAuthorFor}>
      <Modal.Header>
        <Modal.Title>Tell us your name so you can <strong>{requireAuthorFor}</strong>!</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <FormGroup controlId="author-name">
          <ControlLabel>Your Name</ControlLabel>
          <FormControl
            type="text"
            value={editingName}
            required
            onChange={onChange}
          />
          {validationMessage}
        </FormGroup>

      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" bsStyle="primary" onClick={onSave}>Save</Button>
        <Button bsStyle="danger" onClick={onCancel}>cancel</Button>
      </Modal.Footer>
    </Modal>
  </form>;
}

function mapStateToProps(state) {
  return {
    author: state.author
  }
}
export default connect(mapStateToProps)(Author);
