import _ from 'lodash';

const BASE_URL = 'http://localhost:3001';

function request(method, path, body) {
  return fetch(`${BASE_URL}/${path}`,
    {
      method: method,
      headers: {'Authorization': 'whatever-you-want', 'content-type': 'application/json'},
      mode: 'cors',
      body: body && JSON.stringify(body)
    })
    .then(
      data => data.json()
    )
    .catch((e) => console.info("Error loading Posts by category", e));
}

let curried = _.curry(request);
let get = curried('GET', _, null);
let post = curried('POST');
let put = curried('PUT',);
let del = curried('DELETE', _, null);

export {
  get,
  post,
  put,
  del
}