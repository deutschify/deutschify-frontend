import DropDownMenu from "../DropDownMenu";
import NavForum from "../NavForum";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../../../store";
import axios from "axios";

import Post from "../post/Post";

const MyPosts = () => {
    const backend_base_url = import.meta.env.VITE_BACKEND_URL;
    const [myPosts, setMyPosts] = useState([]);

    //fetching the current user
    const fetchCurrentUser = useStore((state) => state.fetchCurrentUser);
    const currentUser = useStore((state) => state.currentUser);

    useEffect(() => {
        fetchCurrentUser();
        // console.log(currentUser);
        console.log(currentUser._id);
    }, []);

    useEffect(() => {
        const fetchMyPosts = async () => {
            const response = await axios.get(
                backend_base_url + `/posts/my-posts/${currentUser._id}`
            );
            //to get the posts sorted
            setMyPosts(
                response.data.sort((post1, post2) => {
                    return (
                        new Date(post2.createdAt) - new Date(post1.createdAt)
                    );
                })
            );
        };
        fetchMyPosts();
    }, [currentUser._id]);

    return (
        <div className=" h-[100vh] mb-40">
            <DropDownMenu />
            <NavForum />
            {myPosts.length === 0 ? (
                <>
                    <div className="NoPosts flex flex-col justify-center items-center pt-8 pb-6 ">
                        <span className="text-palette-50">
                            Du hast noch keine Beiträge...
                        </span>
                    </div>
                </>
            ) : (
                <div className="myPostsWrapper flex flex-col justify-center items-center pt-8 pb-6  ">
                    {myPosts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPosts;
