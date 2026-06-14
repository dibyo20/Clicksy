import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: `${API_URL}/posts`,
    withCredentials: true
});

export async function getFeed() {
    const response = await api.get('/feed');
    return response.data;
};

export async function createPost(caption, image) {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    const response = await api.post('/', formData);
    return response.data;
}

export async function likePost(postId) {
    const response = await api.post(`/like/${postId}`);
    return response.data;
}

export async function unlikePost(postId) {
    const response = await api.post(`/unlike/${postId}`);
    return response.data;
}

export async function getUserPosts() {
    const response = await api.get('/');
    return response.data;
}

export async function getPostDetails(postId) {
    const response = await api.get(`/details/${postId}`);
    return response.data;
}

export default api;