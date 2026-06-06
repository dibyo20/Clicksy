import { useContext, useEffect, useState } from "react";
import { PostContext } from "../post.context.jsx";
import { getFeed, createPost, likePost, unlikePost } from "../services/Post.api.js"

export const usePost = () => {
    const context = useContext(PostContext);
    const { loading, setLoading, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        try {
            const data = await getFeed();
            setFeed(data.posts);
        } finally {
            setLoading(false);
        }
    }

    const handleCreatePost = async (caption, image) => {
        setLoading(true);
        try {
            const data = await createPost(caption, image);
            setFeed([data.post, ...feed]);
        } finally {
            setLoading(false);
        }
    }

    const handleLike = async (id) => {
        setLoading(true);
        try {
            const data = await likePost(id);
            await handleGetFeed();
        } finally {
            setLoading(false);
        }
    }

    const handleUnlike = async (id) => {
        setLoading(true);
        try {
            const data = await unlikePost(id);
            await handleGetFeed();
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
        handleCreatePost,
        handleLike,
        handleUnlike
    }
}