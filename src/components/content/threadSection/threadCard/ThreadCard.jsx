import React from 'react';
import CommentBtn from '../../../button/post/CommentBtn';
import Profile from '../../../card/profile/Profile';
import TextBody from '../../../card/textBody/TextBody';
import TextTitle from '../../../card/textTitle/TextTitle';

const ThreadCard = ({ name, time, title, body, imageHeight }) => {
  return (
    <article className="flex overflow-hidden flex-col self-center pt-6 pb-3.5 mx-auto my-1 rounded-3xl bg-neutral-800 hover:bg-general-highlight min-w-96 w-4/5 max-md:mt-10">
      <div className="flex flex-col items-start mx-6 w-fit ">
        <Profile name={name} time={time}/>
        <TextTitle title={title} className='line-clamp-6 text-ellipsis' />
        <TextBody body={body} className='line-clamp-3 text-ellipsis' />
      </div>
      <CommentBtn />
    </article>
    );
}

export default ThreadCard;