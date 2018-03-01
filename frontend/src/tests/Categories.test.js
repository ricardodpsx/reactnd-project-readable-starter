import {then, when} from './lib/bdd';
import reducer from "../reducer";
import {createStore} from 'redux';
import {mapStateToProps} from "../components/category/Categories";
import {newCategories} from "./ModelsFactory";

// Default (Root)

/***
 * What aspects to test?
 *
 * This is Outside-In testing so we should be testing at the ViewModel (Or boundary) abstraction level.
 *
 * 1) Test aspects of the component rendering given a data structure
 *   Cons: Can not reuse for selenium, Coupled to React
 *   Pros: Conceptual abstraction is hard to achieve anyway, Easier to Understand
 *
 * 2) Test just the changes in the data structure given actions, over reducers (And Normalizations)
 *    in this case you assume that the data structure is displayed correctly by the component.
 *    That means that the Component itself should not have normalization logic.
 *  Pros: Easier to Test, More stable
 *  Cons: No Rendering aspects are testing.
 *
 *
 *
 */
class ReduxContext {

  categoriesExist(categories) {
    this.store = createStore(reducer, {categories: newCategories(categories)});
  }

  viewModel() {
    return mapStateToProps(this.store.getState()).categories;
  }
}

let ctx = null;

beforeEach(() => {
  ctx = new ReduxContext();
});


// should list all available categories,
it('Categories are listed', () => {
  when("Following categories exist");
  let categories = [{name: "react"}, {name: "redux"}];
  ctx.categoriesExist(categories);

  then("All categories are listed");
  expect(ctx.viewModel()[0].name).toEqual("react");
  expect(ctx.viewModel()[1].name).toEqual("redux");

});

it('Categories link to category listing', () => {
  when("Following category exist");
  ctx.categoriesExist([{name: "react"}]);

  then("It links to category URL");
  expect(ctx.viewModel()[0].href)
    .toEqual("/category/react");

});










