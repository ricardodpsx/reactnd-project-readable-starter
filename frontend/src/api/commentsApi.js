import uuid from 'uuid';
import {del, get, post, put} from "./rest";

async function findAll(parentId) {
  return (await get(`posts/${parentId}/comments`)).filter(c => !c.deleted);
}

async function save(comment) {
  if (!comment.id)
    return await post('comments', {...comment, id: uuid.v4(), timestamp: Date.now()});
  else
    return await put(`comments/${comment.id}`, {...comment, timestamp: Date.now()})
}

async function upVote(id) {
  return await post(`comments/${id}`, {option: 'upVote'})
}

async function downVote(id) {
  return await post(`comments/${id}`, {option: 'downVote'})
}

async function remove(id) {
  return await del(`comments/${id}`);
}

export {
  findAll,
  save,
  remove,
  upVote,
  downVote
}

