import React, { useState, useEffect } from 'react';
// import { forEachChild } from 'typescript';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
// import Card from './components/card/card';

let firstClickedIndex = 0;
let firstClickedPairIdentificator: number | undefined = 0;
let gameCards: CardData[] = []; // masīvs ar visām kartiņam, kurš sākumā tukšs

type CardData = {
  id: string; // unikāls identifikators katrai kartītei. tiks izmantots priekš key, kad renderēs. varēja arī šeit nemaz nelikt...
  pairID: number | undefined; // šis katrām divām kartītēm būs vienāds. tiks izmantots, lai paŗbaudītu, vai noclickotās
  // kartītes ir vienādas un arī zīmējot html šis numurs nodrošinās to, ka tām ir vienādas bildes izmainot bildes source linku
  imgSide: boolean; // pēc šī app zinās, vai vajag šo kartīti atvērtu vai aizvērtu zīmēt
};

let fieldSize: number = 1;

const MemoryApp = () => {
  const [clickedFirstCard, setClickedFirstCard] = useState<boolean | undefined>(
    true
  );
  const [rowCount, setRowCount] = useState<number>(4);
  const [columnCount, setColumnCount] = useState<number>(4);
  const [helper, setHelper] = useState<boolean>(false);

  useEffect(() => {
    fieldSize = rowCount * columnCount; // Kopējais kartiņu daudzums
    if (fieldSize % 2) fieldSize -= 1; // Tam jābūt pāra skaitlim
    const pairIDsArray: number[] = []; // masīvs, kur būs kartiņu dublikātu skaitļi/atradēji
    for (let i = 0; i < fieldSize / 2; i += 1) {
      pairIDsArray.push(i);
      pairIDsArray.push(i);
    }

    let tempPairIDindex;
    let tempHelperNumber = fieldSize;
    gameCards = [];
    // Aizpilda tukšo kartiņu masīvu random secībā
    for (let i = 0; i < fieldSize; i += 1) {
      tempPairIDindex = Math.floor(Math.random() * tempHelperNumber);
      gameCards.push({
        id: uuidv4(),
        pairID: pairIDsArray[tempPairIDindex],
        imgSide: false,
      });
      tempHelperNumber -= 1;
      pairIDsArray.splice(tempPairIDindex, 1);
    }
    setHelper(!helper);
  }, [rowCount, columnCount]);

  const fieldSizeChangeInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.id === 'row') {
      setRowCount(parseInt(event.target.value, 10));
    } else {
      setColumnCount(parseInt(event.target.value, 10));
    }
  };

  const clickCardHandler = (clickedCard: CardData, index: number) => {
    if (clickedFirstCard) {
      gameCards[index].imgSide = true;
      firstClickedPairIdentificator = clickedCard.pairID;
      firstClickedIndex = index;
      setClickedFirstCard(false);
    } else {
      gameCards[index].imgSide = true;
      setClickedFirstCard(undefined);
      setTimeout(() => {
        // @ts-ignore
        if (clickedCard.pairID !== firstClickedPairIdentificator) {
          gameCards[index].imgSide = false;
          gameCards[firstClickedIndex].imgSide = false;
        }
        setClickedFirstCard(true);
      }, 1000);
    }
  };

  // Izrēķina kartītes platumu un laukuma lielumu kopējo!
  const flexBasisValue = `${100 / columnCount}%`;
  const gameFieldWidth = `${1000}px`;

  return (
    <div className="main-app">
      <div>
        <span> Rindu skaits: </span>
        <input
          type="number"
          className="input"
          value={rowCount}
          id="row"
          onChange={fieldSizeChangeInputHandler}
        />
        <span> Kolonnu skaits: </span>
        <input
          type="number"
          className="input"
          value={columnCount}
          id="column"
          onChange={fieldSizeChangeInputHandler}
        />
      </div>
      <br />
      <div className="row gameField" style={{ width: gameFieldWidth }}>
        {gameCards.map((card, index) => {
          return (
            <div key={card.id} style={{ flexBasis: flexBasisValue }}>
              <button
                type="button"
                className="wraper"
                disabled={card.imgSide}
                onClick={() => clickCardHandler(card, index)}
              >
                {card.imgSide ? (
                  <img
                    className="img"
                    src={`https://picsum.photos/id/${
                      // @ts-ignore
                      card.pairID + 20
                    }/100/100`}
                    alt="card"
                  />
                ) : (
                  <div className="cardBack" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryApp;
