import React from 'react';
import Profile from '../../../card/profile/Profile';
import CommentDisplay from '../../../display/CommentDisplay';
import TextTitle from '../../../card/textTitle/TextTitle';

const HighlightCard = ({ title, taName, year, comments, className="" }) => {
  return (
    <div className={`flex overflow-hidden flex-col gap-2 items-start py-3 px-2.5 text-xs text-white rounded-2xl border border-solid bg-neutral-800 hover:bg-general-highlight border-neutral-700 transition duration-200 ${className}`}>
      <TextTitle title={title} className='line-clamp-5 text-ellipsis mt-0' />
      <div className='flex items-center mt-auto w-full'>
        <Profile name={taName} year={year} className='mr-auto' />
        <CommentDisplay number={comments.length} />
      </div>
    </div>
  );
}

export default HighlightCard;