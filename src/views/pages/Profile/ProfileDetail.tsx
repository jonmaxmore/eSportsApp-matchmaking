import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useReducer } from "react";
import style from "./style.module.css";
import clsx from "clsx";
import ICArrowBack from "../../../assets/images/Profile/ic-arrow-back.png";
import ICSearch from "../../../assets/images/Profile/ic-search.png";
import Avatar from "../../../assets/images/Profile/avatar.png";
import UserAPI from "@api/UserAPI";
import config from "../../../config/app.config";
import moment from "moment";
import NLike from "@Image/Home/ic-like_inactive.png";
import Like from "@Image/Home/ic-like_active.png";
import SocialAPI from "@api/SocialAPI";
import _ from "lodash";
import { Popover } from "antd";
import Picker from "emoji-picker-react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import Comment from "@Image/Home/ic-comment.png";
import { Modal } from "antd";
import RemoveFollowerPopup from "./RemoveFollowerPopup";

const ProfileDetail = () => {
  const chats = require("@chatscope/chat-ui-kit-react/");
  const navigate = useNavigate();
  const location = useLocation();
  const userData: any = location.state;
  const userID = userData.id;

  const [activeSocial, setActiveSocial] = useState<string>("followers");
  const [text, setText] = useState("");

  const [activeFollwersData, setActiveFollwersData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: config.paginationPerPage,
    followers_id: 0,
  });
  const [activeFollowingData, setActiveFollowingData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: config.paginationPerPage,
    followers_id: 0,
  });
  const [activePostData, setActivePostData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: config.paginationPerPage,
  });
  const [activeCommentData, setActiveCommentData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: 10,
  });
  const [commentData, setCommentData] = useState([]);
  const [activeshowrepile, setactiveshowrepile] = useState(true);
  const [activeshowrepile2, setactiveshowrepile2] = useState(false);

  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      followersdata: [],
      followingdata: [],
      posthistorydata: [],
      postCount: 0,
    }
  );

  const [pageFollowers, setFollowersPage] = useState(1);
  const [loadingfollowers, setFollowersLoading] = useState(false);

  const [pageFollowing, setFollowingPage] = useState(1);
  const [loadingfollowing, setFollowingLoading] = useState(false);
  const [removeFollowerPopup, setRemoveFollowerPopup] = useState(false);
  const [followerAvatarName, setFollowerAvatarName] = useState("");

  const [pagePost, setPostPage] = useState(1);
  const [loadingpost, setPostLoading] = useState(false);
  const [commentHide, setCommentHide] = useState(false);
  const [postID, setPostId] = useState(null);
  const [postIndex, setPostIndex] = useState([] as any);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setText(text + emojiObject.emoji);
  };

  useEffect(() => {
    getPostHistory(activePostData);
    getFollowers(activeFollwersData);
    getFollowing(activeFollowingData);
  }, []);

  const token = localStorage.getItem("token");
  const onClikPostPaginate = (pageNo: any) => {
    activePostData.activePage = pageNo;
    setActivePostData({
      activePage: pageNo,
      totalPage: 1,
      limit: config.paginationPerPage,
    });
    getPostHistory(activePostData);
  };

  const getPostHistory = (activePostData: any) => {
    UserAPI.getPostHistory(activePostData)
      .then((res) => {
        if (res.data.success) {
          activePostData.totalPage = Math.ceil(
            res.data.posthistories.length / activePostData.limit
          );
          setActivePostData({
            activePage: activePostData.activePage,
            totalPage: activePostData.totalPage,
            limit: config.paginationPerPage,
          });
          setPostPage(activePostData.activePage);
          console.log(res.data.posthistories);

          const myNewsPosts: any = res.data.posthistories;
          myNewsPosts.map((post: any) => {
            if (post.Like && post.Like.is_liked) {
              post.isLike = true;
            } else {
              post.isLike = false;
            }
            post.LikeData && post.LikeData.length > 0
              ? (post.likeCount = post.LikeData.length)
              : (post.likeCount = 0);
            post.Comment && post.Comment.length > 0
              ? (post.commentCount = post.Comment.length)
              : (post.commentCount = 0);
            post.Comment &&
              post.Comment.length > 0 &&
              (post.isCommentShow = false);
            post.clickComment = false;
          });

          setState({
            posthistorydata: [...state.posthistorydata, ...myNewsPosts],
            postCount: res.data.postCount,
          });
          setPostLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // start code followers

  const onClikFollowersPaginate = (pageNo: any) => {
    activeFollwersData.activePage = pageNo;
    setActiveFollwersData({
      activePage: pageNo,
      totalPage: 1,
      limit: 3,
      followers_id: 0,
    });
    getFollowers(activeFollwersData);
  };

  const getFollowers = (activeFollwersData: any) => {
    UserAPI.getFollowers(activeFollwersData)
      .then((res) => {
        if (res.data.success) {
          activeFollwersData.totalPage = Math.ceil(
            res.data.followers.count / activeFollwersData.limit
          );
          setActiveFollwersData({
            activePage: activeFollwersData.activePage,
            totalPage: activeFollwersData.totalPage,
            limit: config.paginationPerPage,
            followers_id: 0,
          });
          setFollowersPage(activeFollwersData.activePage);
          setState({
            followersdata: [...state.followersdata, ...res.data.followers.rows],
          });
          setFollowersLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFollowers = () => {
    const payload = {
      follower_id: activeFollwersData.followers_id,
    };
    UserAPI.removeFollowers(payload)
      .then((res) => {
        if (res.data.success) {
          const arr = state.followersdata;
          var filteredArray = arr.filter(function (itm: any) {
            return itm.id !== activeFollwersData.followers_id;
          });
          setState({
            followersdata: filteredArray,
          });
          setRemoveFollowerPopup(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //end code followers

  // start code following
  const onClikFollowingPaginate = (pageNo: any) => {
    activeFollowingData.activePage = pageNo;
    setActiveFollowingData({
      activePage: pageNo,
      totalPage: 1,
      limit: 3,
      followers_id: 0,
    });
    getFollowing(activeFollowingData);
  };

  const getFollowing = (activeFollowingData: any) => {
    UserAPI.getFollowing(activeFollowingData)
      .then((res) => {
        if (res.data.success) {
          activeFollowingData.totalPage = Math.ceil(
            res.data.following.count / activeFollowingData.limit
          );
          setActiveFollowingData({
            activePage: activeFollowingData.activePage,
            totalPage: activeFollowingData.totalPage,
            limit: config.paginationPerPage,
            followers_id: 0,
          });
          setFollowingPage(activeFollowingData.activePage);
          setState({
            followingdata: [...state.followingdata, ...res.data.following.rows],
          });
          setFollowingLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFollowing = (activeFollowingData: any, following_id: any) => {
    activeFollowingData.following_id = following_id;
    UserAPI.removeFollowing(activeFollowingData)
      .then((res) => {
        if (res.data.success) {
          //getFollowing(activeFollowingData);
          const arr = state.followingdata;
          var filteredArray = arr.filter(function (itm: any) {
            return itm.id !== following_id;
          });
          setState({
            followingdata: filteredArray,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRemoveFollowerHandler = (
    followerID: any,
    followerAvatarName: any
  ) => {
    setFollowerAvatarName(followerAvatarName);
    setActiveFollwersData({
      activePage: activeFollwersData.activePage,
      totalPage: 1,
      limit: 3,
      followers_id: followerID,
    });
    setRemoveFollowerPopup(true);
  };

  const likeHandler = (post_id: any, index: number, status: boolean) => {
    let likeData;
    if (status) {
      likeData = {
        post_id: post_id,
        is_liked: false,
      };
    } else {
      likeData = {
        post_id: post_id,
        is_liked: true,
      };
    }

    SocialAPI.like(likeData)
      .then((res) => {
        if (res.data.success) {
          const tempNewsFeedData: any = _.cloneDeep(state.posthistorydata);
          const editNewsFeedData: any = tempNewsFeedData[index];
          if (!status) {
            editNewsFeedData.likeCount = editNewsFeedData.likeCount + 1;
          } else {
            editNewsFeedData.likeCount = editNewsFeedData.likeCount - 1;
          }
          editNewsFeedData.isLike = !editNewsFeedData.isLike;
          tempNewsFeedData.splice(index, 1, editNewsFeedData);
          setState({
            posthistorydata: tempNewsFeedData,
            postCount: tempNewsFeedData.length,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onComment = () => {
    if (text != "") {
      const postData = {
        comment: text,
        parent_id: 0,
        post_id: postID,
      };
      SocialAPI.postComment(postData)
        .then((res) => {
          if (res.data.success) {
            const tempNewsFeedData: any = _.cloneDeep(state.posthistorydata);
            const editNewsFeedData: any = tempNewsFeedData[postIndex];
            editNewsFeedData.commentCount = editNewsFeedData.commentCount + 1;
            editNewsFeedData.isCommentShow = false;
            editNewsFeedData.clickComment = false;
            tempNewsFeedData.splice(postIndex, 1, editNewsFeedData);
            setState({
              posthistorydata: tempNewsFeedData,
              postCount: tempNewsFeedData.length,
            });
            setText("");
            setCommentHide(!commentHide);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getComentsByPostId = (post_id: any, index: number) => {
    setPostIndex(index);
    SocialAPI.getPostComments(activeCommentData, post_id)
      .then((res) => {
        if (res.data.success) {
          hideShowCommentHanlder(index);
          // setCommentHide(!commentHide)
          setActiveCommentData({
            activePage: activeCommentData.activePage,
            totalPage: res.data.totalCounts,
            limit: activeCommentData.limit,
          });
          setCommentData(res.data.comments);
          setPostId(post_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hideShowCommentHanlder = (index: number) => {
    const tempNewsFeedData: any = _.cloneDeep(state.posthistorydata);
    const editNewsFeedData: any = tempNewsFeedData[index];
    editNewsFeedData.isCommentShow = !editNewsFeedData.isCommentShow;
    tempNewsFeedData.splice(index, 1, editNewsFeedData);
    setState({
      posthistorydata: tempNewsFeedData,
      postCount: tempNewsFeedData.length,
    });
  };

  const Showcomment = ({ data, position }: any) => {
    if (!data.isCommentShow && data.commentCount > 0) {
      return (
        <div
          className="text-[13px] text-[#448ff3] cursor-pointer "
          onClick={(e) => {
            getComentsByPostId(data.id, position);
          }}
        >
          View {data.commentCount > 0 ? `${data.commentCount}` : "0"} comments
        </div>
      );
    } else if (data.isCommentShow && data.commentCount > 0) {
      return (
        <div
          className="text-[13px] text-[#448ff3] cursor-pointer "
          onClick={(e) => {
            hideShowCommentHanlder(position);
            setCommentHide(!commentHide);
          }}
        >
          Hide all comments
        </div>
      );
    } else {
      return <></>;
    }
  };

  const Showcomment2 = ({ data }: any) => {
    if (data.isCommentShow === true) {
      return (
        <div>
          {commentData.map((value: any, index) => {
            return <FormFeed2 key={index} {...value} />;
          })}
        </div>
      );
    } else {
      return (
        <div
          className="text-[13px] text-[#448ff3] cursor-pointer "
          onClick={(e) => {
            setCommentHide(true);
          }}
        ></div>
      );
    }
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
        return (
          <div
            className="text-[13px] text-[#448ff3] cursor-pointer "
            onClick={(e) => {
              setactiveshowrepile(false);
              setactiveshowrepile2(true);
            }}
          >
            View {value.comment} repiles
          </div>
        );
      }
      if (value.comment === 0) {
        return (
          <div
            className="text-[13px] text-[#448ff3] cursor-pointer "
            onClick={(e) => {}}
          ></div>
        );
      } else {
        return (
          <div
            className="text-[13px] text-[#448ff3] cursor-pointer "
            onClick={(e) => {
              setactiveshowrepile(true);
              setactiveshowrepile2(false);
            }}
          >
            Hide all repiles
          </div>
        );
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
          <div className="h-[100px] w-[130px] row-span-2 rounded-[10px] relative flex justify-center items-center">
            <img
              src={value.User.avatar_image}
              className="w-[120px] h-[100px]"
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
              <p className="h-auto w-full text-[13px]">{value.comment}</p>

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

  const onClickComment = (id: any, position: any) => {
    setPostId(id);
    setPostIndex(position);
    // setCommentHide(!commentHide)
    const tempNewsFeedData: any = _.cloneDeep(state.posthistorydata);
    const editNewsFeedData: any = tempNewsFeedData[position];
    editNewsFeedData.clickComment = !editNewsFeedData.clickComment;
    tempNewsFeedData.splice(position, 1, editNewsFeedData);
    setState({
      posthistorydata: tempNewsFeedData,
      postCount: tempNewsFeedData.length,
    });
  };

  const ContentImage = ({ postAttachmentData }: any) => {
    if (postAttachmentData.length > 0) {
      return postAttachmentData.map((row: any, key: number) => {
        if (row.file_name.split(".").pop() === "mp4") {
          return (
            <video
              id="videoPreviw"
              src={row.post_attachment}
              className="m-[10px] h-auto w-2/4"
              autoPlay
              playsInline
              loop
              muted
            ></video>
          );
        } else {
          return (
            <img
              src={row.post_attachment}
              alt="avatar"
              className="m-[10px] h-auto w-2/4"
            />
          );
        }
      });
    }
    return <></>;
  };

  return (
    <div className="bg-[#0e1619] h-full">
      <div className="flex flex-col bg-[#0e1619] w-full h-full relative px-16 py-6 shadow-lg">
        {/* Tab & Search */}
        <div className="grid grid-cols-12 gap-6 mb-7">
          <div className="col-span-4 relative">
            <button
              className={`absolute h-[60px] px-6 border-2 border-[#6BB8E7] text-lg font-bold tracking-widest
              `}
              onClick={() => navigate("/profile", { state: { id: userID } })}
            >
              <img src={ICArrowBack} alt="back" className="inline mr-2" /> BACK
            </button>
          </div>
          {/* Tab */}
          <div className="col-span-4 flex items-center justify-center">
            <p className="text-center text-xl font-bold uppercase">
              Profile Details
            </p>
          </div>
          {/* Search */}
          {/* <div className="col-span-4 relative h-[60px]">
            <img
              src={ICSearch}
              alt="Search"
              className="absolute left-4 w-6 h-full object-contain"
            />
            <input
              className="w-full h-full p-4 pl-12 rounded-xl from-[#122e3a] bg-gradient-to-r to-[#0e1719]"
              placeholder="Search profile..."
            />
          </div> */}
        </div>

        {/* Detail */}
        <div className="grid grid-cols-12 gap-6 only:">
          <div className="col-span-6 shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-row items-center gap-4 pl-4 pr-16 h-[55px] text-[#D8D8D8] from-[#122e3a] bg-gradient-to-r to-[#0e1719] border-l-[5px] border-[#95BE4C] overflow-hidden">
              <p className="font-bold uppercase">
                Post History{" "}
                <span className="font-thin">({state.postCount ?? 0})</span>
              </p>
            </div>

            {state.posthistorydata.map((posthistory: any, i: any) => (
              <div key={i}>
                <div className="flex flex-row gap-2 py-3 h-[165px]  border-b-[5px] border-[#95BE4C]">
                  <div className="flex flex-col flex-1 gap-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-[#8F8F8F]">
                        {moment(new Date(posthistory.created_at)).fromNow()}
                      </p>
                      <p className="text-lg">
                        {posthistory.User.avatar_unique_name}
                      </p>
                    </div>
                    {posthistory.TagUser.length > 0 && (
                      <span className="px-2 w-full">
                        <span className={clsx("text-white text-sm")}>
                          - with
                        </span>
                        {posthistory.TagUser.map((tag: any, index: number) => {
                          if (index === posthistory.TagUser.length - 2) {
                            return (
                              <span className="">
                                <span
                                  className={"ml-1 text-primary-sky text-sm"}
                                >
                                  {tag.User.avatar_unique_name}
                                </span>
                                <span className={"ml-1 text-white text-sm"}>
                                  and{" "}
                                </span>
                              </span>
                            );
                          } else if (index === posthistory.TagUser.length - 1) {
                            return (
                              <span className={"ml-1 text-primary-sky text-sm"}>
                                {" "}
                                {tag.User.avatar_unique_name}
                              </span>
                            );
                          } else {
                            return (
                              <span className="">
                                <span
                                  className={"ml-1 text-primary-sky text-sm"}
                                >
                                  {tag.User.avatar_unique_name}
                                </span>
                                <span className={"text-white text-sm"}>
                                  {" "}
                                  ,{" "}
                                </span>
                              </span>
                            );
                          }
                        })}
                      </span>
                    )}
                    <div className="p-6 bg-[#00000020] h-[80px] overflow-auto">
                      <p>{posthistory.message}</p>
                      {posthistory.PostAttachment.length > 0 && (
                        <ContentImage
                          postAttachmentData={posthistory.PostAttachment}
                        />
                      )}
                      {/* {posthistory?.PostAttachment.length > 0 && posthistory?.PostAttachment[0]?.file_name.split('.').pop() === 'mp4' ?
                       (<video
                      id="videoPreviw"
                      src={posthistory.PostAttachment[0].post_attachment}
                      className="m-[10px] h-auto w-2/4 cursor-pointer"
                      autoPlay
                      playsInline
                      loop
                      muted 
                      ></video>)
                     :
                      (<img src={posthistory.PostAttachment[0].post_attachment} alt="avatar" className="m-[10px] h-auto w-2/4 cursor-pointer" />)
                      } */}
                    </div>
                    <div className="flex flex-row justify-between">
                      {/* <div className="flex gap-2 items-center cursor-pointer">
                        <img
                          src={ICArrowBack}
                          alt="like"
                          className="inline w-4 h-4 object-contain"
                        />
                        Like
                      </div> */}
                      {!posthistory.isLike ? (
                        <div className="flex gap-2 items-center ">
                          <button
                            onClick={() => {
                              likeHandler(posthistory.id, i, false);
                            }}
                          >
                            <img src={NLike} />
                          </button>
                          <p className="text-[12px] text-white">
                            {posthistory.likeCount > 0
                              ? `(${posthistory.likeCount})`
                              : ""}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center ">
                          <button
                            onClick={() => {
                              likeHandler(posthistory.id, i, true);
                            }}
                          >
                            <img src={Like} />
                          </button>
                          <p className="text-[12px] text-white">
                            {posthistory.likeCount > 0
                              ? `(${posthistory.likeCount})`
                              : ""}
                          </p>
                        </div>
                      )}
                      <div className="flex items-end">
                        <button
                          className="flex items-center"
                          onClick={() => {
                            onClickComment(posthistory.id, i);
                          }}
                        >
                          <img src={Comment} />
                          <p className="text-[12px] text-white ml-[5px]">
                            Comment
                          </p>
                        </button>
                      </div>

                      {/* <div className="flex gap-2 items-center cursor-pointer text-sm text-[#58AFE6]">
                        View {posthistory.Comment.length} comments
                      </div> */}
                      <Showcomment data={posthistory} position={i} />
                    </div>
                  </div>
                  <div className="relative h-[141px]">
                    <img
                      src={posthistory.User.avatar_image}
                      alt="avatar"
                      className="h-full w-auto"
                    />
                    {/* Level */}
                    <div className="absolute bottom-0 left-0 w-5 h-5 rounded from-[#131B24] bg-gradient-to-tr to-[#2E363F]">
                      <p className="font-bold text-sm text-center leading-[20px]">
                        {posthistory.User.level}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={clsx(
                    posthistory.isCommentShow === true
                      ? "h-auto w-full"
                      : "h-auto w-full"
                  )}
                  id={`comment_${posthistory.id}`}
                >
                  <Showcomment2 data={posthistory} />
                </div>
                <div
                  className={clsx(
                    posthistory.clickComment ? "" : "h-0",
                    "overflow-clip duration-500"
                  )}
                >
                  <div className="max-w-[60%] wide:max-w-[60%] flex justify-between items-center text-[#fff] bg-[#05080a]">
                    <chats.MessageInput
                      placeholder="Type something..."
                      attachButton={false}
                      sendButton={false}
                      value={text}
                      onChange={(item: string) => setText(item)}
                      onSend={() => {
                        setText("");
                      }}
                    />
                    <div className=" h-[60px] bg-[#05080a] w-full px-2 flex items-center ">
                      <Popover
                        content={<Picker onEmojiClick={onEmojiClick} />}
                        trigger={"click"}
                        className="mr-6 cursor-pointer"
                        getPopupContainer={(trigger) => trigger}
                      >
                        <div className="relative">
                          <EmojiHappyIcon className="w-8 text-white cursor-pointer" />
                        </div>
                      </Popover>
                      <button
                        className="border-2 border-primary-sky bg-primary-sky/30 px-5 py-3 text-white uppercase font-bold text-sm z-[99]"
                        onClick={onComment}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {state.posthistorydata.length !== 0 &&
              activePostData.totalPage !== pagePost && (
                <div className="flex flex-col items-center">
                  <button
                    className="mt-5 mb-5 bg-primary-sky/30 w-40 h-10 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => {
                      onClikPostPaginate(pagePost + 1);
                    }}
                  >
                    {loadingpost ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}

            {state.posthistorydata.length === 0 && (
              <div className="flex flex-col text-center w-full p-8">
                <p className="font-bold"> No data available for post history</p>
              </div>
            )}
          </div>
          <div className="col-span-6 shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-row items-center gap-4 pl-4 pr-16 h-[55px] text-[#D8D8D8] from-[#122e3a] bg-gradient-to-r to-[#0e1719] border-l-[5px] border-[#95BE4C] overflow-hidden">
              <p className="font-bold uppercase">Social</p>
            </div>
            <div className="flex">
              <p
                className={`flex-1 py-4 text-center cursor-pointer
                  ${
                    activeSocial === "followers" &&
                    "text-[#95BE4C] font-bold border-b-[5px] border-[#95BE4C] transition"
                  }
                `}
                onClick={() => setActiveSocial("followers")}
              >
                Followers
              </p>
              <p
                className={`flex-1 py-4 text-center cursor-pointer
                  ${
                    activeSocial === "following" &&
                    "text-[#95BE4C] font-bold border-b-[5px] border-[#95BE4C] transition"
                  }
                `}
                onClick={() => setActiveSocial("following")}
              >
                Following
              </p>
            </div>

            <div
              className="flex flex-col gap-5 p-7 bg-[#0e1619] overflow-auto"
              style={{ height: "calc(100vh - 320px)" }}
            >
              {/* Followers */}
              {activeSocial === "followers" &&
                state.followersdata.length === 0 && (
                  <div className="flex flex-col text-center w-full p-8">
                    <p className="text-center h-7  h-[35px]">
                      People that followers you will be shown here.
                    </p>
                  </div>
                )}
              {activeSocial === "followers" &&
                state.followersdata.map((followers: any, index: any) => (
                  <div
                    className="flex justify-between h-[66px]"
                    key={`followers_${index}`}
                  >
                    <div className="flex gap-4 h-full">
                      <div className="relative">
                        <img
                          src={followers.UserFollowers.avatar_image}
                          alt="avatar"
                          className="h-full"
                        />
                        <div className="absolute bottom-0 left-0 w-5 h-5 rounded from-[#131B24] bg-gradient-to-tr to-[#2E363F]">
                          <p className="font-bold text-sm text-center leading-[20px]">
                            {followers.UserFollowers.level}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="">
                          {followers.UserFollowers.avatar_unique_name}
                        </p>
                        {followers.UserFollowers.is_online && (
                          <p className="text-[#58AFE6]">Online</p>
                        )}
                        {/* {followers.UserFollowers.is_online && (
                          <p className="text-[#95BE4C]">a</p>
                        )} */}
                        {!followers.UserFollowers.is_online && (
                          <p className="text-gray-400">Offline</p>
                        )}
                      </div>
                    </div>
                    <button
                      className="h-[46px] px-8 border-2 border-[#6BB8E7] tracking-widest rounded"
                      onClick={() =>
                        onRemoveFollowerHandler(
                          followers.id,
                          followers.UserFollowers.avatar_unique_name
                        )
                      }
                    >
                      REMOVE
                    </button>
                  </div>
                ))}
              <Modal
                visible={removeFollowerPopup}
                centered
                footer={null}
                title={null}
                closable={false}
                bodyStyle={{ padding: "0px" }}
                className="p-0 w-full h-auto flex items-center justify-center"
              >
                <RemoveFollowerPopup
                  setRemoveFollowerPopup={setRemoveFollowerPopup}
                  followerAvatarName={followerAvatarName}
                  removeFollower={removeFollowers}
                />
              </Modal>

              {activeSocial === "followers" &&
                state.followersdata.length !== 0 &&
                activeFollwersData.totalPage !== pageFollowers && (
                  <div className="flex flex-col items-center">
                    <button
                      className="mt-5 mb-5 bg-primary-sky/30 w-40 h-10 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                      onClick={() => {
                        onClikFollowersPaginate(pageFollowers + 1);
                      }}
                    >
                      {loadingfollowers ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}

              {/* Following */}
              {activeSocial === "following" &&
                state.followingdata.length === 0 && (
                  <div className="flex flex-col text-center w-full p-8">
                    <p className="text-center h-7  h-[35px]">
                      People that followed you will be shown here.
                    </p>
                  </div>
                )}
              {activeSocial === "following" &&
                state.followingdata.map((following: any, i: any) => (
                  <div className="flex justify-between h-[66px]">
                    <div className="flex gap-4 h-full">
                      <div className="relative">
                        <img
                          src={following.UserFollowing.avatar_image}
                          alt="avatar"
                          className="h-full"
                        />
                        <div className="absolute bottom-0 left-0 w-5 h-5 rounded from-[#131B24] bg-gradient-to-tr to-[#2E363F]">
                          <p className="font-bold text-sm text-center leading-[20px]">
                            {following.UserFollowing.level}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="">
                          {following.UserFollowing.avatar_unique_name}
                        </p>
                        {following.UserFollowing.is_online && (
                          <p className="text-[#58AFE6]">Online</p>
                        )}
                        {/* {following.UserFollowing.is_online && (
                          <p =className="text-[#95BE4C]">{inGame}</p>
                        )} */}
                        {!following.UserFollowing.is_online && (
                          <p className="text-gray-400">Offline</p>
                        )}
                      </div>
                    </div>
                    <button
                      className="h-[46px] px-8 border-2 border-[#6BB8E7] tracking-widest rounded"
                      onClick={() =>
                        removeFollowing(activeFollowingData, following.id)
                      }
                    >
                      UNFOLLOW
                    </button>
                  </div>
                ))}

              {activeSocial === "following" &&
                state.followingdata.length !== 0 &&
                activeFollowingData.totalPage !== pageFollowing && (
                  <div className="flex flex-col items-center">
                    <button
                      className="mt-5 mb-5 bg-primary-sky/30 w-40 h-10 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                      onClick={() => {
                        onClikFollowingPaginate(pageFollowing + 1);
                      }}
                    >
                      {loadingfollowing ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
