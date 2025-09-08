"use client";
/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface CarouselCardProps {
  image: string;
  title: string;
  description: string;
  cta?: { label: string; onClick: () => void };
}

const CarouselCard: React.FC<CarouselCardProps> = ({ image, title, description, cta }) => (
  <div className="bg-white rounded-lg shadow-md flex flex-col h-full overflow-hidden border border-gray-200">
    {image && (
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover bg-gray-100"
        draggable={false}
      />
    )}
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4 flex-1">{description}</p>
      {cta && (
        <button
          className="mt-auto inline-block bg-accent-blue hover:bg-accent-purple text-white py-2 px-4 rounded shadow transition"
          onClick={cta.onClick}
        >
          {cta.label}
        </button>
      )}
    </div>
  </div>
);

export default CarouselCard;
