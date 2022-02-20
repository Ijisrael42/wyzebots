// import { BehaviorSubject } from 'rxjs';
// import { useHistory } from "react-router-dom";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { config } from "../helpers/config";
import { accountService } from './accountService'; 

const baseUrl = `${config.apiUrl}/files`;

export const fileService = {
    create,
    upload,
    uploadMultiple,
    fileDownload,
    update,
    getById,
    getByUserId,
    getByTutorId,
    getByTutorIdUnbidded,
    getByCategory
}; 

function create(params) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.post(baseUrl, params) });        
    }
    return fetchWrapper.post(baseUrl, params);
}

function upload(params) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.file(`${baseUrl}/upload`, params) });        
    }
    return fetchWrapper.file(`${baseUrl}/upload`, params);
}

function uploadMultiple(params) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.file(`${baseUrl}/upload_multiple`, params) });        
    }
    return fetchWrapper.file(`${baseUrl}/upload_multiple`, params);
}

function fileDownload(params) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.download(`${baseUrl}/file-download`, params) });        
    }
    return fetchWrapper.download(`${baseUrl}/file-download`, params);
}

function update(id, params) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.put(`${baseUrl}/${id}`, params) });        
    }
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

function getById(id) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.get(`${baseUrl}/${id}`); });        
    }
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByUserId(user_id) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.get(`${baseUrl}/list/user/${user_id}`) });        
    }
    return fetchWrapper.get(`${baseUrl}/list/user/${user_id}`);
}

function getByCategory(params) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.post(`${baseUrl}/category`, params) });        
    }
    return fetchWrapper.post(`${baseUrl}/category`, params);
}

function getByTutorId(id) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.get(`${baseUrl}/list/tutor/${id}`) });        
    }
    return fetchWrapper.get(`${baseUrl}/list/tutor/${id}`);
}

function getByTutorIdUnbidded(id) {

    if( fetchWrapper.isTokenExpired() ) {
        return accountService.getJwt()
        .then(user => { return fetchWrapper.get(`${baseUrl}/tutor/unbidded/${id}`) });        
    }
    return fetchWrapper.get(`${baseUrl}/tutor/unbidded/${id}`);
}