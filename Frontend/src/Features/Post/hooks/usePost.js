import { useContext, useEffect, useState } from "react";
import { PostContext } from "../post.context.jsx";
import { getFeed } from "../services/Post.api.js"

export const usePost = () => {
    const context = useContext(PostContext);
    const { loading, setLoading, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        const data = await getFeed();
        setFeed(data.posts.reverse());
        console.log(data);
        setLoading(false);
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