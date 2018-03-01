import {receiveCategories} from "./actions";

export default function categories(categories = [], action) {
  switch (action.type) {
    case receiveCategories.name:
      return action.categories;
    default:
      return categories;
  }
}