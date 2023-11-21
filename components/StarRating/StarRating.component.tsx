import React from 'react';

const StarRatingComponent = ({ rating }) => {
  const MAX_STARS = 10;
  const fullStars = rating;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: 'gold' }}>&#9733;</span>);
    }

    for (let i = stars.length; i < MAX_STARS; i++) {
      stars.push(<span key={i} style={{ color: 'gold'}}>&#9734;</span>);
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRatingComponent;
