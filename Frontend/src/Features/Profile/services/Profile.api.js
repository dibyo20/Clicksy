import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/users",
    withCredentials: true,
});

export async function getProfile() {
    const response = await api.get("/profile");
    // console.log(response.data.user);
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

export default api;

