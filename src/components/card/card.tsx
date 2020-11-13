import React, { useState } from 'react';
import styles from './card.module.css';

// @ts-ignore
const Card = ({ title }) => {
  return (
    <button type="button" className={styles.card}>
      this is card {title}
    </button>
  );
};

export default Card;
