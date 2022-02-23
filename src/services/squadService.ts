import { fetchWrapper } from "../helpers/fetchWrapper";
const baseUrl = `${process.env.REACT_APP_API_URL}/squads`;

export const squadService = {
    create,
    getById,
    getByParams,
    getAll,
    update,
    delete: _delete,
    deletemany
}; 

function create(params:any) {
    return fetchWrapper.post(baseUrl, params);
}

function getByParams(params:any) {
    return fetchWrapper.post(`${baseUrl}/params`, params);
}

function getById(id: string) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getAll() {
    // accountService.getJwt();
    return fetchWrapper.get(`${baseUrl}`);
}

function update(id: string , params: any) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

function _delete(id: string) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function deletemany(params: any) {
    return fetchWrapper.post(`${baseUrl}/deletemany`, params);
}
