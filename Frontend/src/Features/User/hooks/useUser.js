import { useContext, useEffect } from "react";
import { UserContext } from "../user.context.jsx";
import { getNotFollowingUsers, followUser, unfollowUser, getRequestedUsers, acceptRequest, rejectRequest } from "../services/User.api";

export const useUser = () => {
    const context = useContext(UserContext);
    const { loading, setLoading, suggestedUsers, setSuggestedUsers, requestedUsers, setRequestedUsers } = context;

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
        try {
            await followUser(username);
        } finally {
            setLoading(false);
        }
    }

    const handleUnfollowUser = async (username) => {
        setLoading(true);
        try {
            await unfollowUser(username);
        } finally {
            setLoading(false);
        }
    }

    const handleRequestedUsers = async () => {
        setLoading(true);
        try {
            const requests = await getRequestedUsers();
            setRequestedUsers(requests.pendingRequests);
        } finally {
            setLoading(false);
        }
    }

    const handleAcceptRequest = async (username) => {
        setLoading(true);
        try {
            await acceptRequest(username);
        } finally {
            setLoading(false);
        }
    }

    const handleRejectRequest = async (username) => {
        setLoading(true);
        try {
            await rejectRequest(username);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleNotFollowingUsers();
        handleRequestedUsers();
    }, []);


    return {
        loading,
        suggestedUsers,
        handleFollowUser,
        handleUnfollowUser,
        requestedUsers,
        handleAcceptRequest,
        handleRejectRequest,
    };
}