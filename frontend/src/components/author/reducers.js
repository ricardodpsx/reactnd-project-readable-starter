import {authorLogout, cancelAuthorName, requireAuthor, updateAuthorName} from "./actions";

export default function author(author = {
  name: (window.sessionStorage && window.sessionStorage.getItem("authorName")) || "Guest",
  requireAuthorFor: null
}, action) {
  switch (action.type) {
    case requireAuthor.name:
      return {...author, requireAuthorFor: action.requireAuthorFor, intent: action.intent};
    case updateAuthorName.name:
      return {...author, name: action.name, requireAuthorFor: false};
    case cancelAuthorName.name:
      return {...author, requireAuthorFor: false};
    case authorLogout.name:
      return {...author, name: "Guest", requireAuthorFor: false};
    default:
      return author;
  }
}