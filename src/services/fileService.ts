import { fetchWrapper } from "../helpers/fetchWrapper";
import { config } from "../helpers/config";

const baseUrl = `${config.apiUrl}/files`;

export const fileService = {
    upload,
    uploadMultiple,
    deleteFile,
}; 


function upload(params: any) {
    return fetchWrapper.file(`${baseUrl}/upload`, params)
    .then( (response) => { return response; });
}

function uploadMultiple(params: any) {
    return fetchWrapper.file(`${baseUrl}/upload_multiple`, params);
}

function deleteFile(id: string) {
    return fetchWrapper.get(`${baseUrl}/delete/${id}`);
}
