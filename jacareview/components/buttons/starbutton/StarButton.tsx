import { useState } from 'react';
import styles from './StarButton.module.css';

interface StarButtonProps{
    filled:any;
    onClick:any
}

const StarButton: React.FC<StarButtonProps> = ({ filled, onClick }) => {
  return (
    <button className={`${styles.starButton} ${filled ? styles.filled : ''}`} onClick={onClick}
    type='button'>
      ★
    </button>
  );
};

export default StarButton;