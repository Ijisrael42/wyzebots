export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
    file,
    download,
}

async function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse); 
}

async function post(url, body) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...await authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };

    return fetch(url, requestOptions).then(handleResponse);

}

async function download(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/pdf', ...await authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function file(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(url) },
        body: body
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...await authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: await authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

async function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    return {};
}

function handleResponse(response) {
    return response.text().then( async (text) => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {

            if ([401, 403].includes(response.status)) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}