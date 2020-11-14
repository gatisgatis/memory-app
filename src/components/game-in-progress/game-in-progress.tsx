import React, { FC } from 'react';
import styles from './game-in-progress.module.scss';

type Props = {
  clickedSetUpGame: () => void;
};

export const GameInProgress: FC<Props> = ({ clickedSetUpGame }) => {
  return (
    <div className={styles.wrapper}>
      <div>Good Luck and Have Fun!</div>
      <button
        className={styles.button}
        type="button"
        onClick={clickedSetUpGame}
      >
        Give Up and Set Up New Game
      </button>
    </div>
  );
};

export default GameInProgress;
