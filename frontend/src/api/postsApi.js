import uuid from 'uuid';
import {del, get, post, put} from "./rest";

async function byCategory(category) {
  return (await get(`${category}/posts`)).filter(p => !p.deleted);
}

async function findAll() {
  return (await get(`posts`)).filter(p => !p.deleted);
}

async function byId(id) {
  return await get(`posts/${id}`);
}

async function save(newPost) {
  if (!newPost.id)
    return await post('posts', {id: uuid.v4(),...newPost, timestamp: Date.now()});
  else
    return await put(`posts/${newPost.id}`, {...newPost, timestamp: Date.now()});
}

async function upVote(id) {
  return await post(`posts/${id}`, {option: 'postUpVote'})
}

async function downVote(id) {
  return await post(`posts/${id}`, {option: 'postDownVote'})
}

async function remove(id) {
  return await del(`posts/${id}`)
}

export {
  findAll,
  byCategory,
  save,
  byId,
  upVote,
  downVote,
  remove
}

