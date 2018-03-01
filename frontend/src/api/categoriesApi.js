import {get} from './rest';

async function findAll() {
  return (await get("categories")).categories;
}

export {
  findAll
}

