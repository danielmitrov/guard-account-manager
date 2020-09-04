import {API} from './index';


export async function sendCredentials(credentials: {username: string, password: string}) {
    const response = await API.post('/user/login', credentials);

    return response.data;
}
