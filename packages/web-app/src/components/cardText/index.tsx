import React from 'react';

export interface CardTextProps {
  title: string;
  content: string;
}

const CardText: React.FC<CardTextProps> = ({title, content}) => {
  return (
    <div className="p-2 font-normal rounded-xl bg-ui-0 space-y-0.25 text-ui-600">
      <p className="text-sm font-bold text-ui-500">{title}</p>
      <p>{content}</p>
    </div>
  );
};

export default CardText;
