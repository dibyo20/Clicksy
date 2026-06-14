import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: `${API_URL}/users`,
    withCredentials: true,
});

export async function getProfile() {
    const response = await api.get("/profile");
    return response.data.user;
}

export async function getFollowing() {
    const response = await api.get("/following");
    return response.data;
}

export async function getFollowers() {
    const response = await api.get("/followers");
    return response.data;
}

export async function updateProfile(fullname, bio) {
    const response = await api.patch("/updateprofile", { fullname, bio });
    console.log("ProfileData :", response.data);
    return response.data;
}

export async function updateProfilePicture(profileImageFile) {
    const formData = new FormData();
    formData.append("profileImage", profileImageFile);
    const response = await api.patch("/updateprofilepicture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export default api;

