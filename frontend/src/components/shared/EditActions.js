import React from 'react';

export default function EditActions({onEdit, onRemove}) {
  return <div className="edit-actions">
    <a href="#edit" onClick={e => {
      e.preventDefault();
      onEdit()
    }}>
      <i className="fas fa-edit"></i>
    </a> &nbsp;&nbsp;
    <a href="#remove" onClick={e => {
      e.preventDefault();
      onRemove()
    }}>
      <i className="fas fa-trash-alt"></i>
    </a>
  </div>
}