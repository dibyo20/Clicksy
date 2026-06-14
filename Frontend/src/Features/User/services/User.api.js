import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: `${API_URL}/users`,
    withCredentials: true
});

export async function getNotFollowingUsers() {
    const response = await api.get('/notfollowing');
    return response.data;
};

export async function followUser(username) {
    await api.post(`/follow/${username}`);
}

export async function unfollowUser(username) {
    await api.post(`/unfollow/${username}`);
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