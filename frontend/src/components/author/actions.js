function requireAuthor(message, intent) {
  return {
    type: requireAuthor.name,
    requireAuthorFor: message,
    intent
  }
}

function updateAuthorName(name) {
  return {
    type: updateAuthorName.name,
    name: name
  }
}

function cancelAuthorName() {
  return {
    type: cancelAuthorName.name
  }
}

function authorLogout() {
  return {
    type: authorLogout.name
  }
}

export {
  requireAuthor,
  updateAuthorName,
  cancelAuthorName,
  authorLogout
}