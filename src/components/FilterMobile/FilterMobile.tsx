import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import './FilterMobile.scss';
import { filterMobileProps } from '../../types';

export default function FilterMobile({
  count,
  type,
  imgUrl,
  totalSize,
  link,
}: filterMobileProps) {
  const { mode } = useContext(ThemeContext);
  return (
    <Link to={link}>
      <div className={`f-Mobile ${mode}`}>
        <div className='f-Mobile-img'>
          <img src={imgUrl} alt={type} className='image' />
        </div>
        <p className='f-Mobile-name'>{type}</p>
        <p className='f-Mobile-count-mb'> {`${totalSize} MB (${count})`} </p>
      </div>
    </Link>
  );
}
