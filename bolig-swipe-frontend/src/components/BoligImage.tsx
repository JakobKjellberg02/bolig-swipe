import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

interface Image {
  id: number;
  date: string;
  url: string;
}

interface Apartment {
  id: number;
  latitude: number;
  longitude: number;
  propertyType: number;
  priceChangePercentTotal: number;
  energyClass: string;
  openHouse: string;
  price: number;
  selfsale: boolean;
  rooms: number;
  size: number;
  lotSize: number;
  floor: number | null;
  buildYear: number;
  city: string;
  isForeclosure: boolean;
  isActive: boolean;
  municipality: number;
  zipCode: number;
  street: string;
  squaremeterPrice: number;
  area: number;
  daysForSale: number;
  createdDate: string;
  isPremiumAgent: boolean;
  images: Image[];
  net: number;
  exp: number;
  basementSize: number;
  inWatchlist: boolean;
  views: number;
  agentRegId: number;
  domainId: number;
  guid: string;
  agentDisplayName: string;
  groupKey: string | null;
  downPayment: number;
  itemType: number;
}

interface SwipeCardProps {
  image: string;
  title: string;
  nextImage: (action: 'like' | 'dislike') => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ image, title, nextImage }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage('dislike'),
    onSwipedRight: () => nextImage('like'),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      style={{
        width: 320,
        height: 440,
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
        style={{ width: '100%', height: '75%', objectFit: 'cover', pointerEvents: 'none' }}
      />
      <div style={{ padding: 15, textAlign: 'center', fontWeight: 'bold' }}>{title}</div>
    </div>
  );
};

const SwipeApartments: React.FC = () => {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchApartment = () => {
    setLoading(true);
    fetch('http://localhost:5212/apartments/random') 
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Apartment) => {
        setApartment(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApartment();
  }, []);

  const handleNextImage = (action: 'like' | 'dislike') => {
    console.log(`Apartment was ${action}`);
    fetchApartment();
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: 50 }}>Loading...</div>;
  if (!apartment) return <div style={{ textAlign: 'center', marginTop: 50 }}>No apartments found</div>;

  const imageUrl = apartment.images?.[0]?.url || '';
  const title = `${apartment.street}, ${apartment.city} - $${apartment.price.toLocaleString()}`;

  return (
    <SwipeCard image={imageUrl} title={title} nextImage={handleNextImage} />
  );
};

export default SwipeApartments;
