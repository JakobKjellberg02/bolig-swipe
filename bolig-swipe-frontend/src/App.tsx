import React, { useState } from 'react';
import SwipeCard from './components/BoligImage';

interface ImageData {
  url: string;
  title: string;
}

const images: ImageData[] = [
  { url: 'https://fastly.picsum.photos/id/689/200/200.jpg?hmac=2KHWG2UlfLNAWC1jiBz-LQ7b-TMOB4bcW-FVvdQ_7a4', title: 'image 1' },
  { url: 'https://fastly.picsum.photos/id/519/200/200.jpg?hmac=7MwcBjyXrRX5GB6GuDATVm_6MFDRmZaSK7r5-jqDNS0', title: 'image 2' },
  { url: 'https://fastly.picsum.photos/id/227/200/200.jpg?hmac=_HAD3ZQuIUMd1tjQfU5i21RCLHRDH_r_Xuq0q6iRN-o', title: 'image 3' },
];

const App: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const like = images[index];
  const disLike = images[index];

  const nextImage = (action: ImageData) => {
    console.log(`${action.title} was ${action === like ? 'Liked' : 'Disliked'}`);
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div style={{ marginTop: 50, textAlign: 'center' }}>
      <SwipeCard
        image={images[index].url}
        title={images[index].title}
        nextImage={nextImage}
        like={like}
        dislike={disLike}
      />
    </div>
  );
};

export default App;
