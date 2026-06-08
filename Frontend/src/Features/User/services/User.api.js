import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/users',
    withCredentials: true
});

export async function getNotFollowingUsers() {
    const response = await api.get('/notfollowing');
    return response.data;
};

export async function followUser(username) {
    const response = await api.post(`/follow/${username}`);
    return response.data;
}

export default api;