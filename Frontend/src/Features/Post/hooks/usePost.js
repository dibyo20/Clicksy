import { useContext, useEffect, useState } from "react";
import { PostContext } from "../post.context.jsx";
import { getFeed, createPost, likePost, unlikePost, getUserPosts, getPostDetails } from "../services/Post.api.js";

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
        try {
            setFeed((prevFeed) =>
                prevFeed ? prevFeed.map((post) =>
                    post._id === id ? { ...post, isLiked: true } : post
                ) : null
            );

            await likePost(id);
        } catch (err) {
            console.error("Failed to like post:", err);
            setFeed((prevFeed) =>
                prevFeed ? prevFeed.map((post) =>
                    post._id === id ? { ...post, isLiked: false } : post
                ) : null
            );
        }
    }

    const handleUnlike = async (id) => {
        try {
            setFeed((prevFeed) =>
                prevFeed ? prevFeed.map((post) =>
                    post._id === id ? { ...post, isLiked: false } : post
                ) : null
            );

            await unlikePost(id);
        } catch (err) {
            console.error("Failed to unlike post:", err);
            setFeed((prevFeed) =>
                prevFeed ? prevFeed.map((post) =>
                    post._id === id ? { ...post, isLiked: true } : post
                ) : null
            );
        }
    }

    const handleUserPosts = async () => {
        setLoading(true);
        try {
            const data = await getUserPosts();
            const posts = data.posts || [];
            const postsWithLikes = await Promise.all(
                posts.map(async (post) => {
                    try {
                        const details = await getPostDetails(post._id);
                        return { ...post, likesCount: details.countLikes };
                    } catch (err) {
                        console.error(`Error fetching details for post ${post._id}:`, err);
                        return post;
                    }
                })
            );

            setUserPosts(postsWithLikes);
            setUserPostsCount(data.countPosts);
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