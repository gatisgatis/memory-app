import React, { FC } from 'react';
import styles from './intro-header.module.scss';

type Props = {
  rowCount: number;
  colCount: number;
  startGameClick: () => void;
  choseLevelClick: () => void;
};

export const IntroHeader: FC<Props> = ({
  colCount,
  rowCount,
  startGameClick,
  choseLevelClick,
}) => {
  return (
    <div className={styles.wrapper}>
      <span>Welcome to Memory Game! </span>
      <div className={styles.title}>
        You are going to play{' '}
        <span className={styles.extraTitle}>
          {rowCount} x {colCount}
        </span>{' '}
        size game! Are You ready to start?
      </div>
      <button
        className={`${styles.button} ${styles.buttonStart}`}
        type="button"
        onClick={startGameClick}
      >
        Start Playin
      </button>
      <button className={styles.button} type="button" onClick={choseLevelClick}>
        Change Dificulty{' '}
      </button>
    </div>
  );
};

export default IntroHeader;
