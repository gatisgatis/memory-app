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
      {showGameTime ? (
        <div>
          <div className={styles.text}>Total Moves: {moveCounter} </div>
          <div className={styles.text}>Game Time: {timeCounter} s</div>
        </div>
      ) : (
        <div>
          <div className={styles.text}>Total Moves: 0 </div>
          <div className={styles.text}>Game Time: 0 s</div>
        </div>
      )}
    </div>
  );
};

export default Counter;
