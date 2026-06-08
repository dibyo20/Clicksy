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
    await api.post(`/follow/${username}`);
}

export async function getRequestedUsers() {
    const response = await api.get('/requested');
    return response.data;
}

export async function acceptRequest(username) {
    await api.post(`/status/accept/${username}`);
}

export async function rejectRequest(username) {
    await api.post(`/status/reject/${username}`);
}

export default api;