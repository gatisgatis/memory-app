import React, { FC } from 'react';
import styles from './highscores.module.scss';

type Props = {};

export const HighscoreTable: FC<Props> = () => {
  return (
    <div className={styles.wrapper}>
      <div>TE IR HIGHSCORES!!!!! (work in progress)</div>
    </div>
  );
};

export default HighscoreTable;
