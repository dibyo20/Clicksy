import { useContext, useEffect, useState } from "react";
import { PostContext } from "../post.context.jsx";
import { getFeed, createPost, likePost, unlikePost, getUserPosts } from "../services/Post.api.js"

export const usePost = () => {
    const context = useContext(PostContext);
    const { loading, setLoading, feed, setFeed, userPosts, setUserPosts, userPostsCount, setUserPostsCount } = context;

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

    const handleUserPosts = async () => {
        setLoading(true);
        try {
            const data = await getUserPosts();
            setUserPosts(data.posts);
            // console.log(data.posts);
            setUserPostsCount(data.countPosts);
            // console.log(data.countPosts);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetFeed();
        handleUserPosts();
    }, []);

    return {
        loading,
        feed,
        handleGetFeed,
        handleCreatePost,
        handleLike,
        handleUnlike,
        userPosts,
        userPostsCount,
    }
}