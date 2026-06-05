import { useContext, useEffect, useState } from "react";
import { PostContext } from "../post.context.jsx";
import { getFeed } from "../services/Post.api.js"

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { loading, setLoading, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        try {
            const data = await getFeed();
            setFeed(data.posts.reverse());
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetFeed();
    }, []);

    return {
        loading,
        feed,
        handleGetFeed,
    }
}