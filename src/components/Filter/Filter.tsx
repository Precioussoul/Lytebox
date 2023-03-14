import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import './Filter.scss';
import { filterProps } from '../../types';

export default function Filter({ imgUrl, count, link, type }: filterProps) {
  const { mode } = useContext(ThemeContext);
  return (
    <Link to={link} className={`filter ${mode}`}>
      <div className='filter-img'>
        <img src={imgUrl} alt='' className='image' />
      </div>
      <Typography noWrap className='filter-type'>
        {type}
      </Typography>
      <p className='filter-count'>
        {count} <span>files</span>{' '}
      </p>
    </Link>
  );
}
