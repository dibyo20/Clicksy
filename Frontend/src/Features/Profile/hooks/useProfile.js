import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../profile.context.jsx";
import { getProfile, getFollowing, getFollowers } from "../services/Profile.api.js";

export const useProfile = () => {
    const context = useContext(ProfileContext);
    const { loading, setLoading, profile, setProfile, following, setFollowing, followers, setFollowers, followingCount, setFollowingCount, followersCount, setFollowersCount } = context;

    const handleGetProfile = async () => {
        setLoading(true);
        try {
            const data = await getProfile();
            setProfile(data);
        } finally {
            setLoading(false);
        }
    }

    const handleFollow = async () => {
        setLoading(true);
        try {
            const data = await getFollowing();
            setFollowing(data.following);
            setFollowingCount(data.countFollowing);
        } finally {
            setLoading(false);
        }
    }

    const handleFollowers = async () => {
        setLoading(true);
        try {
            const data = await getFollowers();
            setFollowers(data.followers);
            setFollowersCount(data.countFollowers);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetProfile();
        handleFollow();
        handleFollowers();
    }, []);

    return {
        loading,
        profile,
        handleGetProfile,
        following,
        followers,
        followingCount,
        followersCount,
    }
}