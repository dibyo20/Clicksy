import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../profile.context.jsx";
import { getProfile } from "../services/Profile.api.js";

export const useProfile = () => {
    const context = useContext(ProfileContext);
    const { loading, setLoading, profile, setProfile } = context;

    const handleGetProfile = async () => {
        setLoading(true);
        try {
            const data = await getProfile();
            setProfile(data);
            console.log(profile);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetProfile();
    }, []);

    return {
        loading,
        profile,
        handleGetProfile,
    }
}