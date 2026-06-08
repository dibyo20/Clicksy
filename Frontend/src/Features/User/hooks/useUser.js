import { useContext, useEffect, useState } from "react";
import { UserContext } from "../user.context.jsx";
import { getNotFollowingUsers, followUser } from "../services/User.api";

export const useUser = () => {
    const context = useContext(UserContext);
    const { loading, setLoading, suggestedUsers, setSuggestedUsers } = context;

    const handleNotFollowingUsers = async () => {
        setLoading(true);
        try {
            const users = await getNotFollowingUsers();
            setSuggestedUsers(users.users);
        } finally {
            setLoading(false);
        }
    }

    const handleFollowUser = async (username) => {
        setLoading(true);
        await followUser(username);
        setLoading(false);
    }

    useEffect(() => {
        handleNotFollowingUsers();
    },[]);


    return {
        loading,
        suggestedUsers,
        handleFollowUser,
    }
}