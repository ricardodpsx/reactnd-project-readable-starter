import * as categoriesApi from '../../api/categoriesApi';

//TODO: Load first categories statically
function loadCategories() {
  return async dispatch => {
    let categories = await categoriesApi.findAll();
    dispatch(receiveCategories(categories));
  }
}

function receiveCategories(categories) {
  return {type: receiveCategories.name, categories: categories};
}

export {loadCategories, receiveCategories};