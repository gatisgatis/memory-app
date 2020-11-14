import React, { FC } from 'react';
import styles from './card.module.scss';

type Props = {
  isDisabled: boolean;
  clickOnCard: () => void;
  showImage: boolean;
  imgID: number;
};

export const Card: FC<Props> = ({
  isDisabled,
  clickOnCard,
  showImage,
  imgID,
}) => {
  return (
    <button
      type="button"
      className={styles.wrapper}
      disabled={isDisabled}
      onClick={clickOnCard}
    >
      {showImage ? (
        <>
          <img
            className={styles.img}
            src={`https://picsum.photos/id/${imgID * 2 + 15}/250/250`}
            alt={`Attēls Nr:  ${imgID}`}
          />
          <div className={styles.loader}> </div>
        </>
      ) : (
        <div className={styles.backSide} />
      )}
    </button>
  );
};

export default Card;
