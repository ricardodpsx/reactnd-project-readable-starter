import timeago from 'timeago.js';

function friendlyDate(timestamp) {
  return timeago().format(timestamp);
}


export {
  friendlyDate
}