import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import './feature.scss';
import { FeatureProps } from '../../types';

const Feature = ({ image, name, description }: FeatureProps) => {
  const { mode } = useContext(ThemeContext);
  return (
    <div data-aos='fade-up' className='feature'>
      <div className='feature-img'>
        <img src={image} alt='' className='f-image' />
      </div>
      <p className={`feature-title ${mode}`}>{name}</p>
      <p className='feature-desc'>{description}</p>
    </div>
  );
};

export default Feature;
