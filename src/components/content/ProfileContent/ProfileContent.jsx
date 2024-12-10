import React, { useEffect, useState } from "react";
import TextTitle from "../../card/textTitle/TextTitle";
import Separator from "../../separator/Separator";
import { Link } from "react-router-dom";
import { LoaderCircle } from 'lucide-react';
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const MiniThreadCard = ({ data }) => {
  return (
    <Link
      to={
        data.course_id !== "home"
          ? `/course/${data.course_id}/thread/${data.id}`
          : `/home/thread/${data.id}`
      }
      className="contents"
    >
      <article className="flex overflow-hidden flex-col self-center px-6 py-3 rounded-3xl bg-eerie-black hover:bg-general-highlight transition duration-200">
        <div className="text-software-orange">
          {data.course_id != "home" ? (
            <>
              <span className="text-gray-300">Course ID: </span>
              <span>{data.course_id}</span>
            </>
          ) : (
            <span>HOME</span>
          )}
        </div>
        <TextTitle title={data.title} className="line-clamp-3 text-ellipsis" />
        <div className="flex mt-2 items-center text-gray-400">
          {data.likes.length} Likes • {data.comments.length} Comments
        </div>
      </article>
    </Link>
  );
};

const MiniLikeCard = ({ data }) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/get-title?thread_id=${data.thread_id}`,
      {
        headers: {
          "x-token": localStorage.getItem("token")
        }
      }
    )
      .then((res) => {
        setTitle(res.data);
      }
      ).catch((err) => {
        console.log(err);
      });
  }, [data])
  return (
    <Link
      to={
        data.course_id !== "home"
          ? `/course/${data.course_id}/thread/${data.id}`
          : `/home/thread/${data.id}`
      }
      className="contents"
    >
      <article className="flex overflow-hidden flex-col self-center px-6 py-3 rounded-3xl bg-eerie-black hover:bg-general-highlight transition duration-200">
        <div className="text-software-orange">
          {data.course_id != "home" ? (
            <>
              <span className="text-gray-300">Course ID: </span>
              <span>{data.course_id}</span>
            </>
          ) : (
            <span>HOME</span>
          )}
        </div>
        <div className="flex gap-2 items-center">
        <TextTitle title={title} className="line-clamp-3 text-ellipsis" />
        <FaHeart className="text-cherry-red" />
        </div>
      </article>
    </Link>
  )
}

const MiniCommentCard = ({ data }) => {
  return (
    <Link
      to={
        data.course_id !== "home"
          ? `/course/${data.course_id}/thread/${data.comment_from}`
          : `/home/thread/${data.id}`
      }
      className="contents"
    >
      <article className="flex overflow-hidden flex-col self-center px-6 py-3 rounded-3xl bg-eerie-black hover:bg-general-highlight transition duration-200">
        <TextTitle
          title={data.body}
          className="line-clamp-3 text-ellipsis"
        />
        <div className="flex mt-2 items-center text-gray-400">
          {data.replies.length} Replies
        </div>
      </article>
    </Link>
  );
};

const ProfileContent = ({
  comments,
  posted,
  likedThreads,
  contentType,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentContentType, setCurrentContentType] = useState(contentType);

  useEffect(() => {
    setIsLoading(true);
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setCurrentContentType(contentType);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, [contentType]);

  if (isLoading) {
    return (
      <section className={`${className}`}>
        <div className="flex justify-center items-center h-full">
          <LoaderCircle strokeWidth={1} size={56} className='mt-20 text-white animate-spin' /> 
        </div>
      </section>
    );
  }

  return (
    <section className="animate-[fadeIn_0.15s_ease-in]">
      {contentType === "threads" && (
        <>
          {posted.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {posted.map((thread, index) => (
            <div>
              <MiniThreadCard data={thread} />
              {index < posted.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
        </>
      )}
      {contentType === "likedThreads" && (
        <>
          {likedThreads.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {likedThreads.map((thread, index) => (
            <div>
              <MiniLikeCard data={thread} />
              {index < likedThreads.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
        </>
      )}
      {contentType === "comments" && (
        <>
          {comments.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {comments.map((comment, index) => (
            <div>
              <MiniCommentCard data={comment} />
              {index < comments.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default ProfileContent;
