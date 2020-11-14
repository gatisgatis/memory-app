import React, { FC } from 'react';
import styles from './counter.module.scss';

type Props = {};

export const Counter: FC<Props> = () => {
  return (
    <div className={styles.wrapper}>
      <div>TE BŪS LAIKA UN MOVES SKATĪTĀJS (work in progress)</div>
    </div>
  );
};

export default Counter;
