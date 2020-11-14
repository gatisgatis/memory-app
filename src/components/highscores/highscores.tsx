import React, { FC } from 'react';
import styles from './highscores.module.scss';
import type { HighScore } from '../../App';

type Props = {
  Data: HighScore[];
};

export const HighscoreTable: FC<Props> = ({ Data }) => {
  return (
    <div className={styles.wrapper}>
      <div>HighScores: (work in progress) </div>
      <div>
        Vards: {Data[0].name} Grids: {Data[0].grid} Laiks: {Data[0].time} Moves:{' '}
        {Data[0].moves}
      </div>
    </div>
  );
};

export default HighscoreTable;
