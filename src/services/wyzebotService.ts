// import { BehaviorSubject } from 'rxjs';
// import { useHistory } from "react-router-dom";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { config } from "../helpers/config";

// const questionSubject = new BehaviorSubject(null);

const baseUrl = `${config.apiUrl}/wyzebots`;

export const wyzebotService = {
    create,
    getById,
    getByParams,
    getAll,
    update,
    delete: _delete,
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
