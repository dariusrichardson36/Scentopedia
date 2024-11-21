// src/pages/AccordDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import './Accords.css'; // Import the CSS file

const AccordDetail: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  // Define data for different accord types
  const accordData: Record<string, { title: string; description: string; videoSrc: string }> = {
    aquatic: {
      title: 'Aquatic Accord',
      description: `Aquatic accords capture the refreshing, revitalizing essence of ocean waves, coastal breezes, and the crisp, invigorating scent of fresh water. 
      These accords often blend ozonic, watery notes with hints of citrus or floral to evoke a feeling of serenity and boundless horizons. 
      The aquatic family aims to remind us of the sea's tranquility, its mystery, and its endless expanses—combining gentle marine facets with 
      a slightly salty minerality that resonates with the idea of a clean, pure environment. Such fragrances are perfect for those seeking 
      a calm yet exhilarating sensation that can transform any day into a breezy ocean escape.`,
      videoSrc: '/AquaticAccord.mp4',
    },
    woody: {
      title: 'Woody Accord',
      description: 'Woody accords evoke warmth and natural richness. They often include notes from trees such as sandalwood, cedarwood, and patchouli, delivering an earthy, comforting aroma that lingers.',
      videoSrc: '/WoodAccord.mp4',
    },
  };

  const accord = accordData[type || ''];

  if (!accord) {
    return (
      <div className="container mx-auto py-10 px-4 text-center text-black bg-white min-h-screen">
        <h2 className="text-4xl font-bold">Accord Not Found</h2>
        <p className="text-lg">Sorry, the accord you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white text-black">
      {/* Video Background */}
      <video
        className="video-background fade-in-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={accord.videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="content-overlay">
        <h2>{accord.title}</h2>
        <p>{accord.description}</p>
      </div>
    </div>
  );
};

export default AccordDetail;
