import React, { FC } from 'react';
import styles from './new-game.module.scss';

type Props = {};

export const NewGameWindow: FC<Props> = () => {
  return (
    <div className={styles.wrapper}>
      <div>Sākt Jaunu spēli logs</div>
    </div>
  );
};

export default NewGameWindow;
