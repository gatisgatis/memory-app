import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Card } from './components/card/card';
import { ChoseLevel } from './components/chose-level/chose-level';
import { HighscoreTable } from './components/highscores/highscores';
import { Counter } from './components/counter/counter';
import { GameInProgress } from './components/game-in-progress/game-in-progress';
import { IntroHeader } from './components/intro-header/into-header';
import { FinishGame } from './components/finish-game/finish-game';

let firstClickedIndex = 0;
let secondClickedIndex = 0;
let firstClickedPairIdentificator: number | undefined = 0;
let secondClickedPairIdentificator: number | undefined = 1;
let gameCards: CardData[] = []; // masīvs ar visām kartiņam, kurš sākumā tukšs
let fieldSize: number = 1;
let movesCount: number = 0;
let gameTimeFinish: number = 0;
let savedName = 'Unknown';

type CardData = {
  id: string; // unikāls identifikators katrai kartītei. tiks izmantots priekš key, kad renderēs. varēja arī šeit nemaz nelikt...
  pairID: number | undefined; // šis katrām divām kartītēm būs vienāds. tiks izmantots, lai paŗbaudītu, vai noclickotās
  // kartītes ir vienādas un arī zīmējot html šis numurs nodrošinās to, ka tām ir vienādas bildes izmainot bildes source linku
  imgSide: boolean; // pēc šī app zinās, vai vajag šo kartīti atvērtu vai aizvērtu zīmēt
};

export type HighScore = {
  name: string;
  grid: string;
  time: number;
  moves: number;
};

const MemoryApp = () => {
  const [clickedFirstCard, setClickedFirstCard] = useState(true);
  const [rowCount, setRowCount] = useState(2);
  const [columnCount, setColumnCount] = useState(2);
  const [showChooseLevelWindow, setShowChooseLevelWindow] = useState(false);
  const [showCustomLevelInputs, setShowCustomLevelInputs] = useState(false);
  const [showGameField, setShowGameField] = useState(false);
  const [showIntroHeader, setShowIntroHeader] = useState(true);
  const [showGameInProgressHeader, setShowGameInProgressHeader] = useState(
    false
  );
  const [counter, setCounter] = useState(0);
  const [showFinishGameWindow, setShowFinishGameWindow] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  const saveNameInputField = useRef(null);

  // Nodrošina taimera darbību. ne līdz galam skaidrs, kopēts risinājums...
  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  // Nodrošina random spēles kartiņu ģenerāciju atbilstoši prasītajiem izmēriem
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
  }, [rowCount, columnCount, showGameField]);

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
    movesCount += 1;
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
    // Game Finish
    if (!gameCards.some((card) => !card.imgSide)) {
      gameTimeFinish = counter;
      setShowFinishGameWindow(true);
    }
  };

  const ChoseLevelHandler = (event: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore
    const buttonID = event.target.id;
    if (buttonID !== '0') {
      const count = parseInt(buttonID, 10);
      setRowCount(count);
      setColumnCount(count);
      setShowCustomLevelInputs(false);
      setShowChooseLevelWindow(false);
      setShowGameField(false);
      setShowIntroHeader(true);
    } else {
      setShowCustomLevelInputs(true);
    }
  };

  const startNewGame = () => {
    setCounter(0);
    fieldSize = 1;
    movesCount = 0;
    setClickedFirstCard(true);
    setShowGameField(true);
    setShowGameInProgressHeader(true);
    setShowIntroHeader(false);
  };

  const saveDataFinishedGame = () => {
    setShowIntroHeader(true);
    setShowGameField(false);
    setShowFinishGameWindow(false);
    // @ts-ignore
    savedName = saveNameInputField.current.value;
    const updated = [
      ...highScores,
      {
        name: savedName,
        grid: `${rowCount}x${columnCount}`,
        time: gameTimeFinish,
        moves: movesCount,
      },
    ];
    setHighScores(updated);
  };
  // Izrēķina gridu laukumam
  const flexBasisValue = `${100 / columnCount}%`;

  return (
    <div className="main-app">
      {showFinishGameWindow && (
        <FinishGame
          time={gameTimeFinish}
          moves={movesCount}
          inputFieldRef={saveNameInputField}
          clickedReturn={() => {
            setShowIntroHeader(true);
            setShowGameField(false);
            setShowFinishGameWindow(false);
          }}
          clickedSave={saveDataFinishedGame}
        />
      )}
      <div className="sideBar">
        <Counter
          moveCounter={movesCount}
          timeCounter={counter}
          showGameTime={showGameField}
        />
        <HighscoreTable
          Data={
            highScores.length > 0
              ? highScores
              : [{ name: '---', grid: '---', time: 999, moves: 999 }]
          }
        />
      </div>
      <div className="header">
        {showIntroHeader && (
          <IntroHeader
            rowCount={rowCount}
            colCount={columnCount}
            choseLevelClick={() => {
              setShowChooseLevelWindow(true);
              setShowIntroHeader(false);
            }}
            startGameClick={startNewGame}
          />
        )}
        {showChooseLevelWindow && (
          <ChoseLevel
            ClickOnThis={ChoseLevelHandler}
            customWindow={showCustomLevelInputs}
            changeCount={fieldSizeChangeInputHandler}
            rowCount={rowCount}
            colCount={columnCount}
            okCustomClick={() => {
              setShowCustomLevelInputs(false);
              setShowChooseLevelWindow(false);
              setShowGameField(false);
              setShowIntroHeader(true);
            }}
          />
        )}
        {showGameInProgressHeader && (
          <GameInProgress
            clickedSetUpGame={() => {
              setShowIntroHeader(true);
              setShowGameInProgressHeader(false);
              setShowGameField(false);
            }}
          />
        )}
      </div>
      {showGameField ? (
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
      ) : (
        <div className="GameFieldBackGround" />
      )}
    </div>
  );
};

export default MemoryApp;
