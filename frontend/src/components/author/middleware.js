import {authorLogout, requireAuthor, updateAuthorName} from "./actions";

export {requireAuthorMiddleware};

function requireAuthorMiddleware(requireAuthorPolicy) {
  return store => next => action => {

    if (action.type === updateAuthorName.name) {
      sessionStorage.setItem("authorName", action.name);
      next(action);
      return next(store.getState().author.intent);
    }

    if (action.type === authorLogout.name)
      sessionStorage.removeItem("authorName");


    let isGuest = store.getState().author.name === "Guest";
    let requireAuthorFor = requireAuthorPolicy(action, store.getState());

    if (isGuest && requireAuthorFor)
      return next(requireAuthor(requireAuthorFor, action));

    return next(action);
  };
}