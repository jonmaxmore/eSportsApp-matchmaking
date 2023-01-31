import React, { useEffect, useReducer, useState } from "react";
import Filter from "@Components/Page/Home/Fillter/fillter";
import Post from "@Components/Page/Home/post/post";
import NewsFeed from "@Components/Page/Home/NewsFeed/NewsFeed";
import Status from "@Components/Page/Home/Status";
import Popup from "@Components/Page/Home/post/PostPopup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "./style.module.css";

import { Popover } from "antd"
import Picker from 'emoji-picker-react'
import { EmojiHappyIcon } from "@heroicons/react/outline";
import SocialAPI from "@api/SocialAPI";
import _ from "lodash";

type Props = {}

const HomePage = (props: Props) => {


    const styles = require("@chatscope/chat-ui-kit-styles/dist/default/styles.min.css");
    const chats = require("@chatscope/chat-ui-kit-react/");

    const [activehide, setActiveHide] = useState(false);
    const [postID, setPostId] = useState(null);
    const [posts, setPosts] = useState([]);
    const [activeData, setActiveData] = useState({ activePage: 1, totalPage: 1, limit: 10, filter: "World" });
    const [newsFeedData, setNewsFeedData] = useState([] as any);
    const [postIndex, setPostIndex] = useState([] as any);
    const [friendExist, setFriendExist] = useState(false);
    const [noFollowingExist, setNoFollowingExist] = useState(false);

    const [text, setText] = useState("" as any);
    const [hasMorePost, setHaseMorePost] = useState(true);

    useEffect(() => {
        getNewsFeed(activeData);
    }, []);

    const onSetFilter = (filter: string) => {
        //call request passing through filter
        setActiveData({ activePage: 1, totalPage: 1, limit: 10, filter: filter });
        getNewsFeed({
            activePage: 1,
            totalPage: 1,
            limit: 10,
            filter: filter
        });
    }

    const getNewsFeed = (data: any) => {
        SocialAPI.getPosts(data)
            .then(res => {
                if (res?.data?.success) {

                    if (!res?.data?.isFriendExist) {
                        setActiveData({ activePage: data.activePage, totalPage: res.data.totalCounts, limit: data.limit, filter: data.filter });
                        const newPosts: any = res.data.posts;
                        newPosts.map((post: any) => {
                            if (post.Like && post.Like.is_liked) {
                                post.isLike = true;
                            } else {
                                post.isLike = false;
                            }
                            post.LikeData && post.LikeData.length > 0 ? post.likeCount = post.LikeData.length : post.likeCount = 0;
                            post.Comment && post.Comment.length > 0 ? post.commentCount = post.Comment.length : post.commentCount = 0;
                            post.Comment && post.Comment.length > 0 && (post.isCommentShow = false);
                            post.User.Follower && post.User.Follower.is_follow === true ? post.isFollow = true : post.isFollow = false;
                        });
                        if (data.filter !== "World") {
                            setNewsFeedData(newPosts);
                        } else {
                            // setNewsFeedData([...newsFeedData, ...newPosts]);
                            setNewsFeedData(newPosts);
                        }
                        setFriendExist(false);
                    } else {
                        setFriendExist(true);
                        setNewsFeedData([]);
                    }

                } else {
                    if (newsFeedData.length > 0 && data.filter === "World") {
                        setHaseMorePost(false);
                        // setNewsFeedData(newsFeedData);
                    } else {
                        setNewsFeedData([]);
                    }
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const onEmojiClick = (event: any, emojiObject: any) => {
        setText(text + emojiObject.emoji)
    };

    const onComment = () => {
        // const modifiedText = text.replace(/&nbsp;/g, ' ')
        if (text != "") {
            const postData = {
                comment: text,
                // comment: modifiedText,
                parent_id: 0,
                post_id: postID
            }
            SocialAPI.postComment(postData)
                .then(res => {
                    if (res.data.success) {
                        const tempNewsFeedData: any = _.cloneDeep(newsFeedData);
                        const editNewsFeedData: any = tempNewsFeedData[postIndex];
                        editNewsFeedData.commentCount = editNewsFeedData.commentCount + 1;
                        editNewsFeedData.isCommentShow = false;
                        tempNewsFeedData.splice(postIndex, 1, editNewsFeedData);
                        setNewsFeedData(tempNewsFeedData);
                        setText("");
                        setActiveHide(!activehide);
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    const addElementToPost = (data: any) => {
        activeData.filter = 'World';
        getNewsFeed(activeData);
        // newsFeedData.splice(0, 0, data);
        // setNewsFeedData(newsFeedData);
    }

    const fetchScrollPostData = (data: any) => {
        setActiveData(data);
        getNewsFeed(data);
    }

    return (
        <div className={clsx(style.HomeStyle, "flex gap-[20px] h-full w-full")} >

            <div style={{
                width: "calc(100% - 335px)",
            }}>
                <div className="drop-shadow-xl"><Filter onSetFilter={onSetFilter} /></div>

                <div className={clsx(activehide ? "h-0" : "", "overflow-clip duration-500")}>
                    <div className="drop-shadow-xl"><Post addElementToPost={addElementToPost} /></div>
                </div>

                <div className={clsx("shadow-lg w-full", activehide ? "h-[calc(100vh-260px)]" : "h-[calc(100vh-480px)] duration-500")}>
                    <NewsFeed
                        setActiveHide={setActiveHide}
                        activehide={activehide}
                        setPostId={setPostId}
                        postID={postID}
                        commentText={text}
                        posts={newsFeedData}
                        setPosts={setNewsFeedData}
                        friendExist={friendExist}
                        noFollowingExist={noFollowingExist}
                        postIndex={postIndex}
                        setPostIndex={setPostIndex}
                        activePostData={activeData}
                        fetchScrollPostData={fetchScrollPostData}
                        hasMorePost={hasMorePost}
                    />
                </div>

                <div className={clsx(activehide ? "" : "h-0", "overflow-clip duration-500")}>
                    <div className="max-w-[70%] wide:max-w-[75%] flex justify-between items-center text-[#fff] bg-[#05080a]">
                        <chats.MessageInput placeholder="Type something..." attachButton={false} sendButton={false} value={text}
                            onChange={
                                (item: String) => setText(item)}
                            onSend={() => { setText("") }}
                        />
                        <div className=" h-[60px] bg-[#05080a] w-full px-2 flex items-center ">
                            <Popover content={<Picker onEmojiClick={onEmojiClick} />} trigger={"click"} className="mr-6 cursor-pointer" getPopupContainer={trigger => trigger}>
                                <div className="relative">
                                    <EmojiHappyIcon className="w-8 text-white cursor-pointer" />
                                </div>
                            </Popover>
                            <button className="border-2 border-primary-sky bg-primary-sky/30 px-5 py-3 text-white uppercase font-bold text-sm z-[99]"
                                onClick={onComment}>
                                Comment
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div style={{
                height: "calc(100% - 40px)",
            }} className="shadow-lg min-w-[150px] w-full max-w-[350px] pb-[20px] overflow-auto">
                <Status />


            </div>
        </div>
    );
};

export default HomePage;