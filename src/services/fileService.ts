// import { BehaviorSubject } from 'rxjs';
// import { useHistory } from "react-router-dom";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { config } from "../helpers/config";

const baseUrl = `${config.apiUrl}/files`;

export const fileService = {
    upload,
    uploadMultiple,
}; 


function upload(params: any) {
    return fetchWrapper.file(`${baseUrl}/upload`, params)
    .then( (response) => { return response; });
}

function uploadMultiple(params: any) {
    return fetchWrapper.file(`${baseUrl}/upload_multiple`, params);
}
