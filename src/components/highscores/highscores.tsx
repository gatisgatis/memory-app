import React, { FC } from 'react';
import styles from './highscores.module.scss';
import type { HighScore } from '../../App';

type Props = {
  Data: HighScore[];
};

export const HighscoreTable: FC<Props> = ({ Data }) => {
  let counter4 = 0;
  let counter6 = 0;
  let counter8 = 0;

  const data4 = Data.filter((scr) => scr.grid === '4x4');
  const data6 = Data.filter((scr) => scr.grid === '6x6');
  const data8 = Data.filter((scr) => scr.grid === '8x8');

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>HighScores</div>
      <div className={styles.category}>Place/Name/Time/Moves</div>
      <div className={styles.category}>4x4 Category</div>
      {data4.map((score) => {
        counter4 += 1;
        return (
          <div key={score.name + score.time.toString()} className={styles.score}>
            {counter4}. {score.name} {score.time}s {score.moves}
          </div>
        );
      })}
      <div className={styles.category}>6x6 Category</div>
      {data6.map((score) => {
        counter6 += 1;
        return (
          <div key={score.name + score.time.toString()} className={styles.score}>
            {counter6}. {score.name} {score.time}s {score.moves}
          </div>
        );
      })}
      <div className={styles.category}>8x8 Category</div>
      {data8.map((score) => {
        counter8 += 1;
        return (
          <div key={score.name + score.time.toString()} className={styles.score}>
            {counter8}. {score.name} {score.time}s {score.moves}
          </div>
        );
      })}
    </div>
  );
};

export default HighscoreTable;
