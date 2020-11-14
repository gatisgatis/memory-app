import React, { FC } from 'react';
import styles from './finish-game.module.scss';

type Props = {
  time: number;
  moves: number;
  clickedSave: () => void;
  clickedReturn: () => void;
  inputFieldRef: React.MutableRefObject<null>;
};

export const FinishGame: FC<Props> = ({
  time,
  moves,
  clickedReturn,
  clickedSave,
  inputFieldRef,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span>Congratulations!</span>
        <span>You Finished the game!</span>
        <span>Game time: {time} s</span>
        <span>Moves: {moves}</span>
        <div className={styles.smallWrapper}>
          <span className={styles.smallText}>
            Enter Your name and save result
          </span>
          <input
            ref={inputFieldRef}
            className={styles.input}
            type="text"
            name=""
            id=""
          />
          <button
            className={styles.saveButton}
            onClick={clickedSave}
            type="button"
          >
            Save
          </button>
        </div>
        <button
          className={styles.bigButton}
          onClick={clickedReturn}
          type="button"
        >
          Return without saving
        </button>
      </div>
    </div>
  );
};

export default FinishGame;
