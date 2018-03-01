import {goTo} from "./actions";

export {routerReducer};

function routerReducer(router = {currentPath: "/"}, action) {
  switch (action.type) {
    case goTo.name:
      if (router.currentPath !== action.href) {
        window && window.history.pushState({}, "page 2", action.href);
        return {currentPath: action.href};
      } else {
        return router;
      }
    default:
      return router;
  }
}