import React, { FC } from 'react';
import styles from './highscores.module.scss';
import type { HighScore } from '../../App';

type Props = {
  Data: HighScore[];
};

export const HighscoreTable: FC<Props> = ({ Data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>HighScores</div>
      <div>Place/Name/Grid/Time/Moves</div>
      {Data.map((score, index) => {
        return (
          <div key={score.name + score.time.toString()}>
            {index+1}. {score.name} {score.grid} {score.time}s {score.moves}
          </div>
        );
      })}
    </div>
  );
};

export default HighscoreTable;
