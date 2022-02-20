// import { BehaviorSubject } from 'rxjs';
// import { useHistory } from "react-router-dom";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { config } from "../helpers/config";
import { accountService } from './accountService'; 

const baseUrl = `${config.apiUrl}/files`;

export const fileService = {
    upload,
    uploadMultiple,
}; 


function upload(params) {
    return fetchWrapper.file(`${baseUrl}/upload`, params);
}

function uploadMultiple(params) {
    return fetchWrapper.file(`${baseUrl}/upload_multiple`, params);
}
