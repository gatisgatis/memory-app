import React, { useState, useEffect } from 'react';
// import { forEachChild } from 'typescript';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Card } from './components/card/card';
import { ChoseLevel } from './components/chose-level/chose-level';
import { HighscoreTable } from './components/highscores/highscores';
import { Counter } from './components/counter/counter';

let firstClickedIndex = 0;
let secondClickedIndex = 0;
let firstClickedPairIdentificator: number | undefined = 0;
let secondClickedPairIdentificator: number | undefined = 1;
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
  const [choseLevel, setChoseLevel] = useState<boolean>(false);
  const [customLevel, setCustomLevel] = useState<boolean>(false);
  const [showGameField, setShowGameField] = useState<boolean>(false);

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
      // Pārbauda, vai iepriekšējā ciklā abas atvērtās kārtis nebija vienādas.
      // Šis nodrošina to, ka pēdējās atvērtās kārtis stāv vaļā tik ilgi,kamēr tiek nospiests jauns click.
      if (secondClickedPairIdentificator !== firstClickedPairIdentificator) {
        gameCards[secondClickedIndex].imgSide = false;
        gameCards[firstClickedIndex].imgSide = false;
      }
      gameCards[index].imgSide = true;
      firstClickedPairIdentificator = clickedCard.pairID;
      firstClickedIndex = index;
      setClickedFirstCard(false);
    } else {
      gameCards[index].imgSide = true;
      secondClickedPairIdentificator = clickedCard.pairID;
      secondClickedIndex = index;
      setClickedFirstCard(true);
    }
  };

  const ChoseLevelHandler = (event: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore
    const buttonID = event.target.id;
    if (buttonID !== '0') {
      const count = parseInt(buttonID, 10);
      setRowCount(count);
      setColumnCount(count);
      setCustomLevel(false);
    } else {
      setCustomLevel(true);
    }
  };

  // Izrēķina gridu laukumam
  const flexBasisValue = `${100 / columnCount}%`;

  return (
    <div className="main-app">
      <div className="sideBar">
        <Counter />
        <HighscoreTable />
      </div>
      <div className="header">
        <ChoseLevel
          ClickOnThis={ChoseLevelHandler}
          customWindow={customLevel}
          changeCount={fieldSizeChangeInputHandler}
          rowCount={rowCount}
          colCount={columnCount}
          cancelClick={() => setCustomLevel(false)}
        />
      </div>
      <div className="row gameField">
        {gameCards.map((card, index) => {
          return (
            <div
              key={card.id}
              className="fieldColumn"
              style={{ flexBasis: flexBasisValue }}
            >
              <Card
                isDisabled={card.imgSide}
                clickOnCard={() => clickCardHandler(card, index)}
                showImage={card.imgSide}
                // @ts-ignore
                imgID={card.pairID}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryApp;
