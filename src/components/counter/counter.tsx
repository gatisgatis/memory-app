import React, { FC } from 'react';
import styles from './counter.module.scss';

type Props = {
  moveCounter: number;
  timeCounter: number;
  showGameTime: boolean;
};

export const Counter: FC<Props> = ({
  moveCounter,
  timeCounter,
  showGameTime,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Total Moves: {moveCounter} </div>
      {showGameTime ? (
        <div className={styles.text}>Game Time: {timeCounter} s</div>
      ) : (
        <div className={styles.text}>Game Time: 0 s</div>
      )}
    </div>
  );
};

export default Counter;
