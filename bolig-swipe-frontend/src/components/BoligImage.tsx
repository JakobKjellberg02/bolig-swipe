import React from 'react';
import { useSwipeable } from 'react-swipeable';

interface SwipeBolig {
    image: string;
    title: string;
    nextImage: (action: ImageData) => void;
    like: ImageData;
    dislike: ImageData;
}

interface ImageData {
    url: string;
    title: string;
}

const SwipeCard: React.FC<SwipeBolig> = ({ image, title, nextImage, like, dislike }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(dislike),
    onSwipedRight: () => nextImage(like),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      style={{
        width: 300,
        height: 400,
        borderRadius: 15,
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        userSelect: 'none',
        touchAction: 'pan-y',
        backgroundColor: '#fff',
        margin: 'auto',
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: '100%', height: '75%', objectFit: 'cover', pointerEvents: 'none'}}
      />
      <div style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
        {title}
      </div>
    </div>
  );
};

export default SwipeCard;
