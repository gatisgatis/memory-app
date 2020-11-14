import React, { FC } from 'react';
import styles from './chose-level.module.scss';

type Props = {
  ClickOnThis: (event: React.MouseEvent<HTMLElement>) => void;
  customWindow: boolean;
  changeCount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  colCount: number;
  okCustomClick: () => void;
};

export const ChoseLevel: FC<Props> = ({
  ClickOnThis,
  customWindow,
  changeCount,
  rowCount,
  colCount,
  okCustomClick,
}) => {
  return (
    <div className={styles.window}>
      <div className={styles.title}>Choose Dificulty</div>
      <div className={styles.wrapper}>
        <button
          className={styles.button}
          id="4"
          type="button"
          onClick={ClickOnThis}
        >
          Easy 4x4
        </button>
        <button
          className={styles.button}
          id="6"
          type="button"
          onClick={ClickOnThis}
        >
          Medium 6x6
        </button>
        <button
          className={styles.button}
          id="8"
          type="button"
          onClick={ClickOnThis}
        >
          Hard 8x8
        </button>
        <button
          className={styles.button}
          id="0"
          type="button"
          onClick={ClickOnThis}
        >
          Custom
        </button>
      </div>
      {customWindow && (
        <div className={styles.customInputsWrapper}>
          <span> Rindu skaits: </span>
          <input
            type="number"
            className={styles.input}
            value={rowCount}
            id="row"
            onChange={changeCount}
          />
          <span> Kolonnu skaits: </span>
          <input
            type="number"
            className={styles.input}
            value={colCount}
            id="column"
            onChange={changeCount}
          />
          <button
            className={styles.buttonOk}
            type="button"
            onClick={okCustomClick}
          >
            Ok
          </button>
        </div>
      )}
    </div>
  );
};
