import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../profile.context.jsx";
import { getProfile, getFollowing, getFollowers, updateProfile } from "../services/Profile.api.js";

export const useProfile = () => {
    const context = useContext(ProfileContext);
    const { loading, setLoading, profile, setProfile, following, setFollowing, followers, setFollowers, followingCount, setFollowingCount, followersCount, setFollowersCount, profileData, setProfileData, profilePic, setProfilePic } = context;

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

    // const fullname = "Test";
    // const bio = "I am a software developer";
    const handleProfileData = async (fullname, bio) => {
        setLoading(true);
        try {
            const data = await updateProfile(fullname, bio);
            setProfileData(data);
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
        setFollowing,
        followers,
        setFollowers,
        followingCount,
        setFollowingCount,
        followersCount,
        setFollowersCount,
        handleProfileData,
        profileData,
        setProfileData,
    }
}