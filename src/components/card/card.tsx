import React, { FC } from 'react';
import styles from './card.module.scss';

type Props = {
  isDisabled: boolean;
  clickOnCard: () => void;
  showImage: boolean;
  imgID: number;
};

const randomer = Math.floor(Math.random()*5)+1;

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
            src={`https://picsum.photos/id/${imgID * randomer  + 15 }/300/150`}
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
