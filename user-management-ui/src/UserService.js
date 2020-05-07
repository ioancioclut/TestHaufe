import axios from "axios";
import {hostUrl} from "./config";

export const loginUser = async (user) => {
    let response = await axios.post(hostUrl + '/users/login', user);
    setJwtToken(response)
    console.log(response.data);
    return response;
}

export const registerUser = async (user) => {
    let response = await axios.post(hostUrl + '/users/register', user);
    setJwtToken(response)
    console.log(response.data);
    return response;
}

export const getExternalUsers = async () => {
    const headers = buildAuthorizationHeader();
    return await axios.get(hostUrl + '/users/externals', headers);
}

export const createExternalUser = async (user) => {
    const headers = buildAuthorizationHeader();
   return await axios.post(hostUrl + '/users/externals/register', user, headers);
}

function setJwtToken(response){
    localStorage.setItem('token', "Bearer " + response.data.token);
}

function buildAuthorizationHeader(){
    return {
        headers: {
            Authorization: getJwtToken()
        }
    }
}

function getJwtToken(){
    return localStorage.getItem('token');
}