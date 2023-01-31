import React, { useState, useEffect } from "react";
import avatar from "@Image/Home/avatar.png";
import NLike from "@Image/Home/ic-like_inactive.png";
import Like from "@Image/Home/ic-like_active.png";
import Comment from "@Image/Home/ic-comment.png";
import style from "./style.module.css";
import clsx from "clsx";
import { IndexKind } from "typescript";
import { Modal, Popover } from "antd"
import Picker from 'emoji-picker-react'
import { EmojiHappyIcon } from "@heroicons/react/outline";
import "./style.css";
import SocialAPI from "../../../../api/SocialAPI";
import moment from "moment";
import { ReactComponent as IconComment } from "@Image/Home/ICcomment.svg";
import $ from 'jquery'
import Post from "@Components/Page/Home/post/post";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewImage from "@Components/Modal/ViewImage";
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import UserAPI from "@api/UserAPI";
import { getUserID } from "../../../../Token";

interface NewsProps {
  avatar: any;
  lavel: number;
  name: string;
  time: string;
  content: string;
  contentImg?: any;
  like: boolean;
  comment: number;
}

interface Props {
  setActiveHide: (value: boolean) => void;
  activehide: boolean;
  setPostId: (value: any) => void;
  postID: any;
  commentText: any;
  posts: any;
  setPosts: any;
  friendExist: any;
  noFollowingExist: any;
  postIndex: any;
  setPostIndex: any;
  activePostData: any;
  fetchScrollPostData: any;
  hasMorePost: boolean
}

const NewsFeed = ({ setActiveHide, activehide, setPostId, postID, commentText, posts, setPosts, friendExist, noFollowingExist,
  postIndex, setPostIndex, activePostData, fetchScrollPostData, hasMorePost }: Props) => {

  const styles = require("@chatscope/chat-ui-kit-styles/dist/default/styles.min.css");
  const chats = require("@chatscope/chat-ui-kit-react/");

  const [commentData, setCommentData] = useState([]);
  const [activeCommentData, setActiveCommentData] = useState({ activePage: 1, totalPage: 1, limit: 10 });

  const [activeshow, setAtiveshow] = useState(true);
  const [activeshow2, setAtiveshow2] = useState(false);

  const [activeshowrepile, setactiveshowrepile] = useState(true);
  const [activeshowrepile2, setactiveshowrepile2] = useState(false);

  const [activeshowrepiles, setactiveshowrepiles] = useState(true);
  const [activeshowrepiles2, setactiveshowrepiles2] = useState(false);

  const [activeData, setActiveData] = useState({ activePage: 1, totalPage: 1, limit: 5 });

  const [newsFeedData, setNewsFeedData] = useState([]);
  const [Nopost, setNopost] = useState(false)
  const [openImage, setOpenImage] = useState(false);
  const [fileType, setFileType] = useState('');

  const [viewImageURL, setViewImageURL] = useState('');
  const [text, setText] = useState("")

  const onEmojiClick = (event: any, emojiObject: any) => {
    setText(text + emojiObject.emoji)
  };

  const likeHandler = (post_id: any, index: number, status: boolean) => {
    let likeData;
    if (status) {
      likeData = {
        post_id: post_id,
        is_liked: false
      }
    } else {
      likeData = {
        post_id: post_id,
        is_liked: true
      }
    }

    SocialAPI.like(likeData)
      .then(res => {
        if (res.data.success) {
          const tempNewsFeedData: any = _.cloneDeep(posts);
          const editNewsFeedData: any = tempNewsFeedData[index];
          if (!status) {
            editNewsFeedData.likeCount = editNewsFeedData.likeCount + 1;
          } else {
            editNewsFeedData.likeCount = editNewsFeedData.likeCount - 1;
          }
          editNewsFeedData.isLike = !editNewsFeedData.isLike;
          tempNewsFeedData.splice(index, 1, editNewsFeedData);
          setPosts(tempNewsFeedData);
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const getComentsByPostId = (post_id: any, index: number) => {
    setPostIndex(index);
    SocialAPI.getPostComments(activeCommentData, post_id)
      .then(res => {
        if (res.data.success) {
          hideShowCommentHanlder(index);
          setActiveHide(!activehide)
          setActiveCommentData({ activePage: activeData.activePage, totalPage: res.data.totalCounts, limit: activeData.limit });
          setCommentData(res.data.comments);
          setPostId(post_id);
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const hideShowCommentHanlder = (index: number) => {
    const tempNewsFeedData: any = _.cloneDeep(posts);
    const editNewsFeedData: any = tempNewsFeedData[index];
    editNewsFeedData.isCommentShow = !editNewsFeedData.isCommentShow;
    tempNewsFeedData.splice(index, 1, editNewsFeedData);
    setPosts(tempNewsFeedData);
  }

  const fetchMoreData = () => {
    fetchScrollPostData({
      activePage: activePostData.activePage + 1,
      totalPage: activePostData.totalPage,
      limit: activePostData.limit,
      filter: activePostData.filter
    });
  }

  const News: NewsProps[] = [
    {
      avatar: avatar,
      lavel: 12,
      name: "Nguyen Van A1",
      time: "1 hour ago",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      like: true,
      comment: 12,
    },
    {
      avatar: avatar,
      lavel: 12,
      name: "Nguyen Van A2",
      time: "1 hour ago",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
      contentImg: avatar,
      like: true,
      comment: 12,
    },
    {
      avatar: avatar,
      lavel: 12,
      name: "Nguyen Van A3",
      time: "1 hour ago",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      like: false,
      comment: 0,
    },
  ];

  const News2: NewsProps[] = [
    {
      avatar: avatar,
      lavel: 12,
      name: "Nguyen Van A1",
      time: "1 hour ago",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      like: true,
      comment: 0,
    },
    {
      avatar: avatar,
      lavel: 12,
      name: "Nguyen Van A2",
      time: "1 hour ago",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
      contentImg: avatar,
      like: true,
      comment: 0,
    },
    {
      avatar: avatar,
      lavel: 12,
      name: "Nguyen Van A3",
      time: "1 hour ago",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      like: false,
      comment: 0,
    },
  ];

  const onFollowUnFollowHandler = async (status: boolean, index: number, toUserID: any) => {
    const payload = {
      status: status,
      to_user_id: toUserID
    }
    UserAPI.followUnfollowAPI(payload)
      .then((res) => {
        if (res.data.success) {
          const tempNewsFeedData: any = _.cloneDeep(posts);
          const editNewsFeedData: any = tempNewsFeedData[index];
          editNewsFeedData.isFollow = !editNewsFeedData.isFollow;
          tempNewsFeedData.splice(index, 1, editNewsFeedData);
          setPosts(tempNewsFeedData);
        } else {

        }
      })
      .catch(function (error) {
        // setLoader(false)
        console.log("error ", error);
      });
  }

  const FormFeed = ({ value, position }: any) => {

    const LikeActive = () => {
      if (!value.isLike) {
        return (
          <div className="flex items-center">
            <button onClick={() => { likeHandler(value.id, position, false) }}><img src={NLike} /></button>
            <p className="text-[12px] text-white ml-[5px]">Like {value.likeCount > 0 ? `(${value.likeCount})` : ""}</p>
          </div>
        );
      } else {
        return (
          <div className="flex items-center ">
            <button onClick={() => { likeHandler(value.id, position, true) }}><img src={Like} /></button>
            <p className="text-[12px] text-white ml-[5px]">You like this {value.likeCount > 0 ? `(${value.likeCount})` : ""}</p>
          </div>
        );
      }
    };

    const ContentImage = () => {
      if (value.PostAttachment.length > 0) {
        return (
          value.PostAttachment.length > 0 && value.PostAttachment.map((row: any, key: number) => {
            if (row.file_name.split('.').pop() === 'mp4') {
              return <video
                id="videoPreviw"
                src={row.post_attachment}
                className="m-[10px] h-auto w-2/4 cursor-pointer"
                onClick={
                  () => { 
                    setFileType(row.file_name.split('.').pop());
                    setViewImageURL(row.post_attachment); 
                    setOpenImage(true); }}
                autoPlay
                playsInline
                loop
                muted
              ></video>
            } else {
              return <img src={row.post_attachment} 
              onClick={ 
                () => { 
                  setFileType(row.file_name.split('.').pop());
                  setViewImageURL(row.post_attachment); 
                  setOpenImage(false); }} 
                  alt="avatar" className="m-[10px] h-auto w-2/4 cursor-pointer" />;
            }
          })
        );
      }
      return <></>;
    };

    const Showcomment = () => {
      if (!value.isCommentShow && value.commentCount > 0) {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
          getComentsByPostId(value.id, position)
        }}>
          View {value.commentCount > 0 ? `${value.commentCount}` : '0'} comments
        </div>
      } else if (value.isCommentShow && value.commentCount > 0) {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
          hideShowCommentHanlder(position)
          setActiveHide(!activehide)
        }}>
          Hide all comments
        </div>
      }
      else {
        return <></>
      }
    };

    const Showcomment2 = () => {
      if (value.isCommentShow === true) {
        return <div >
          {commentData.map((value: any, index) => {
            return <FormFeed2 key={index} {...value} />;
          })}
        </div>
      } else {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
          setAtiveshow2(true)
        }}>
        </div>
      }
    };


    return (
      <div>
        <div>
          {value.isFollow && getUserID() != value.User.id ? <button
            className="border-2 border-primary-sky bg-primary-sky/40 text-white opacity-50 uppercase font-bold text-[12px] p-1 mr-2"
            style={{ float: "right" }}
            onClick={() => { onFollowUnFollowHandler(false, position, value.User.id) }}
          >
            <CheckOutlined />  Following
          </button> : getUserID() != value.User.id && <button
            className="border-2 border-primary-sky bg-primary-sky/40 text-white uppercase font-bold text-[12px] p-1 mr-2"
            style={{ float: "right" }}
            onClick={() => { onFollowUnFollowHandler(true, position, value.User.id) }}
          >
            <PlusOutlined /> Follow
          </button>}
        </div>
        <div className="h-auto w-full flex bg-[#0e1619] border-b-[3px] border-[#be4c4c] gap-0 mb-3">
          {/* status Section */}
          <div className="w-full h-auto p-[15px_0px_15px_20px] flex flex-col justify-start items-start gap-[10px]">
            <div className="w-full flex justify-between items-center p-[0px_10px]">
              <p className="text-[10px] text-[#737576]">
                {moment(new Date(value.created_at)).fromNow()}
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {value.User.avatar_unique_name}<span className="text-[#28AFE7]">#{value.User.code_id}</span>
              </p>
            </div>
            {value.TagUser.length > 0 &&
              <span className="px-2 w-full">
                <span className={clsx("text-white text-sm")}>- with</span>
                {value.TagUser.map((tag: any, index: number) => {
                  if (index === value.TagUser.length - 2) {
                    return <span className="">
                      <span className={"ml-1 text-primary-sky text-sm"}>{tag.User.avatar_unique_name}</span>
                      <span className={"ml-1 text-white text-sm"}>and </span>
                    </span>
                  } else if (index === value.TagUser.length - 1) {
                    return <span className={"ml-1 text-primary-sky text-sm"}> {tag.User.avatar_unique_name}</span>
                  } else {
                    return (<span className="">
                      <span className={"ml-1 text-primary-sky text-sm"}>{tag.User.avatar_unique_name}</span>
                      <span className={"text-white text-sm"}> , </span>
                    </span>)
                  }
                })
                }
              </span>
            }
            <div className="h-auto w-full relative flex flex-col bg-[#0e1619] p-[10px] mb-[30px]">
              {/* <p className="h-auto w-full text-[15px]">{value.message}</p> */}
              <p className="h-auto w-full text-[15px]" dangerouslySetInnerHTML={{ __html: value.message }} />

              <ContentImage />
              <Modal
                visible={openImage}
                footer={null}
                title={null}
                closable={false}
                bodyStyle={{ padding: "0px" }}
                className="p-0 w-full h-auto flex items-center justify-center"
              >
                <ViewImage
                  setOpenImage={setOpenImage}
                  postFileURL={viewImageURL}
                  fileType={fileType}
                />
              </Modal>
            </div>

            <div className="flex justify-between items-center margin-[-30px_0px_0px_10px] w-[95%] h-[30px]">
              <div className="flex items-end">
                <LikeActive />
              </div>
              <div className="flex items-end">
                <button className="flex items-center" onClick={() => {
                  setPostId(value.id)
                  setPostIndex(position)
                  setActiveHide(!activehide)
                }}>
                  <img src={Comment} />
                  <p className="text-[12px] text-white ml-[5px]">Comment</p>
                </button>
              </div>
              <Showcomment />
            </div>
          </div>
          {/* avatar Section */}
          <div className="h-[170px] w-[130px] row-span-2 rounded-[10px] relative flex justify-center items-center">
            {/* <button className="border-2 border-primary-sky bg-primary-sky/30 px-5 py-3 text-white uppercase font-bold text-sm z-[99]">
                    Comment
            </button> */}
            <img
              src={value.User.avatar_image}
              className="w-[140px] h-[100px]"
            />
            <div className="h-[25px] w-[25px] bg-[#222C36] rounded-[5px] bottom-[5px] left-[20px] text-center pt-[2px] font-bold text-[16px] absolute">
              {value.User.level}
            </div>

          </div>
        </div>

        <div className={clsx(value.isCommentShow === true ? "h-auto w-full" : "h-auto w-full")} id={`comment_${value.id}`}>
          <Showcomment2 />
        </div>
      </div>
    );
  };

  const FormFeed2 = (value: any) => {
    const LikeActive = () => {
      if (value.like) {
        return (
          <div className="flex items-center ">
            <img src={Like} />
            <p className="text-[12px] text-white ml-[5px]">You like this</p>
          </div>
        );
      } else {
        return (
          <div className="flex items-center">
            <img src={NLike} />
            <p className="text-[12px] text-white ml-[5px]">Like</p>
          </div>
        );
      }
    };

    // const ContentImage = () => {
    //   if (value.contentImg) {
    //     return (
    //       <img
    //         src={value.contentImg}
    //         className="m-[10px] h-auto w-2/4"
    //       />
    //     );
    //   } else {
    //     return <></>;
    //   }
    // };

    const Showrepile = () => {
      if (activeshowrepile === true && value.comment > 0) {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
          setactiveshowrepile(false)
          setactiveshowrepile2(true)
        }}>
          View {value.comment} repiles
        </div>
      }
      if (value.comment === 0) {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {

        }}>
        </div>
      }
      else {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
          setactiveshowrepile(true)
          setactiveshowrepile2(false)
        }}>
          Hide all repiles
        </div>
      }
    };

    // const Showrepile2 = () => {
    //   if (activeshowrepile2 === true && value.comment > 0) {
    //     return <div >
    //       {News2.map((value, index) => {
    //         return <FormFeed3 key={value.name + index} {...value} />;
    //       })}
    //     </div>
    //   }
    //   if (value.comment === 0) {
    //     return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {

    //     }}>
    //     </div>
    //   } else {
    //     return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
    //       setactiveshowrepile2(true)
    //     }}>
    //     </div>
    //   }
    // };

    return (
      <div className="w-full bg-[#0e1619]">
        <div className="h-auto w-[70%] flex bg-[#0e1619] gap-0">

          {/* avatar Section */}
          <div className="h-[170px] w-[130px] row-span-2 rounded-[10px] relative flex justify-center items-center">
            <img
              src={value.User.avatar_image}
              className="w-[135px] h-[150px]"
            />
            <div className="h-[25px] w-[25px] bg-[#222C36] rounded-[5px] bottom-[5px] left-[20px] text-center pt-[2px] font-bold text-[16px] absolute">
              {value.User.level}
            </div>
          </div>
          {/* status Section */}
          <div className="w-full h-auto p-[15px_0px_15px_20px] flex flex-col justify-start items-start gap-[10px]">
            <div className="w-full flex justify-between items-center p-[0px_10px]">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {value.User.avatar_unique_name}
              </p>
              <p className="text-[10px] text-[#737576]">
                {moment(new Date(value.created_at)).fromNow()}
              </p>
            </div>
            <div className="h-auto w-full relative flex flex-col bg-[#13171a] p-[10px] mb-[30px]">
              {/* <p className="h-auto w-full text-[13px]">{value.comment}</p> */}
              <p className="h-auto w-full text-[13px]" dangerouslySetInnerHTML={{ __html: value.comment }} />

              {/* <ContentImage /> */}
            </div>

            {/* <div className="flex justify-between items-center margin-[-30px_0px_0px_10px] w-[95%] h-[30px]">
              <div className="flex items-end">
                <LikeActive />
              </div>
              <div className="flex items-end">
                <div className="flex items-center">
                  <img src={Comment} />
                  <p className="text-[12px] text-white ml-[5px]">Repile</p>
                </div>
              </div>
              <Showrepile />
            </div> */}

          </div>
        </div>

        {/* <div className={clsx(activeshowrepile === true ? "h-auto w-full" : "h-auto w-full")}>
          <Showrepile2 />
        </div> */}

      </div>
    );
  };

  const FormFeed3 = (value: any) => {
    const LikeActive = () => {
      if (value.isLike) {
        return (
          <div className="flex items-center ">
            <img src={Like} />
            <p className="text-[12px] text-white ml-[5px]">You like this</p>
          </div>
        );
      } else {
        return (
          <div className="flex items-center">
            <img src={NLike} />
            <p className="text-[12px] text-white ml-[5px]">Like</p>
          </div>
        );
      }
    };

    const ContentImage = () => {
      if (value.contentImg) {
        return (
          <img
            src={value.contentImg}
            className="m-[10px] h-auto w-2/4"
          />
        );
      } else {
        return <></>;
      }
    };

    const Showrepiles = () => {
      if (activeshowrepiles === true && value.comment > 0) {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
          setactiveshowrepiles(false)
          setactiveshowrepiles2(true)
        }}>
          View {value.comment} repiles
        </div>
      }
      if (value.comment === 0) {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {

        }}>
        </div>
      }
      else {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
          setactiveshowrepiles(true)
          setactiveshowrepiles2(false)
        }}>
          Hide all repiles
        </div>
      }
    };

    const Showrepiles2 = () => {
      if (activeshowrepiles2 === true && value.comment > 0) {
        return <div >
        </div>
      }
      if (value.comment === 0) {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {

        }}>
        </div>
      } else {
        return <div className="text-[13px] text-[#448ff3] cursor-pointer " onClick={(e) => {
          setactiveshowrepiles2(true)
        }}>
        </div>
      }
    };

    return (
      <div className="w-full bg-[#0e1619]">
        <div className="pl-[120px] h-auto w-[70%] flex bg-[#0e1619] gap-0">
          {/* avatar Section */}
          <div className="h-[170px] w-[130px] row-span-2 rounded-[10px] relative flex justify-center items-center">
            <img
              src={value.avatar}
              className="w-[135px] h-[150px]"
            />
            <div className="h-[25px] w-[25px] bg-[#222C36] rounded-[5px] bottom-[5px] left-[20px] text-center pt-[2px] font-bold text-[16px] absolute">
              {value.lavel}
            </div>
          </div>
          {/* status Section */}
          <div className="w-full h-auto p-[15px_0px_15px_20px] flex flex-col justify-start items-start gap-[10px]">
            <div className="w-full flex justify-between items-center p-[0px_10px]">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {value.name}
              </p>
              <p className="text-[10px] text-[#737576]">
                {value.time}
              </p>
            </div>
            <div className="h-auto w-full relative flex flex-col bg-[#13171a] p-[10px] mb-[30px]">
              <p className="h-auto w-full text-[13px]">{value.content}</p>

              <ContentImage />
            </div>

            <div className="flex justify-between items-center margin-[-30px_0px_0px_10px] w-[95%] h-[30px]">
              <div className="flex items-end">
                <LikeActive />
              </div>
              <div className="flex items-end">
                <div className="flex items-center">
                  <img src={Comment} />
                  <p className="text-[12px] text-white ml-[5px]">Repile</p>
                </div>
              </div>
              <Showrepiles />
            </div>

          </div>

        </div>

        <div className={clsx(activeshowrepiles === true ? "h-auto w-full" : "h-auto w-full")}>
          <Showrepiles2 />
        </div>

      </div>
    );
  };

  return (
    <div className={clsx(style.FeedStyle, "w-full flex flex-col gap-[15px]", activehide ? "h-[calc(100vh-260px)]" : "h-[calc(100vh-420px)]")}
    >
      {posts.length > 0 && <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMorePost}
        loader={<h4 className="w-50 h-40 text-[18px]">Loading...</h4>}
        height={500}
        endMessage={
          <p className="text-[16px]" style={{ textAlign: "center", marginTop: '10px' }}>
            <b>No more post</b>
          </p>
        }
      >
        {posts.map((post: any, index: number) => {
          return <FormFeed key={index} value={post} position={index} />;
        })}
      </InfiniteScroll>}

      <div className={clsx("flex flex-col items-center justify-center h-[800px] bg-[#10191c]", Nopost ? "" : "hidden")}>
        <IconComment className="w-[300px] !text-[#343c3e] !stroke-[#343c3e]" />
        <h1 className="text-[#343c3e] text-[40px] font-black ">No comment yet</h1>
        <h5 className="text-[#343c3e] text-xl font-black mt-2">Be the first to comment</h5>
      </div>
      {/* No post button to show when no posts on feed */}
      {friendExist ? <div className={clsx("flex w-full justify-center", Nopost ? "hidden" : "")}>
        <p className="w-50 h-40 text-[18px]"
        > You don't have friends yet. </p>
      </div> : posts.length === 0 && <div className={clsx("flex w-full justify-center", Nopost ? "hidden" : "")}>
        <button className="w-44 h-24 border-2 border-primary-sky"
          onClick={() => {
            setNopost(true)
          }}
        > No post from your friends.</button>
      </div>}
      {/* {noFollowingExist ? <div className={clsx("flex w-full justify-center",Nopost? "hidden":"")}>
        <p className="w-50 h-40 text-[18px]" 
        > You are not following to anyone. </p>
      </div> : posts.length === 0  && <div className={clsx("flex w-full justify-center",Nopost? "hidden":"")}>
        <button className="w-44 h-24 border-2 border-primary-sky" 
        onClick={() => {
          setNopost(true)
        }}
        > No post from your following.</button>
      </div>} */}

    </div>
  );
};

export default NewsFeed;
