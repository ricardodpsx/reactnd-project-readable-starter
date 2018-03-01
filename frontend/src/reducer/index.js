import {combineReducers} from "redux";
import {routerReducer} from "../components/router/reducers";
import author from "../components/author/reducers";
import categories from "../components/category/reducers";
import {comments, newComment} from "../components/comment/reducers";
import {currentPost, posts} from "../components/post/reducers";


export default combineReducers({router: routerReducer, posts, categories, currentPost, comments, newComment, author});