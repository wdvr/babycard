import React, { useCallback, useRef, useState } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import styled from "styled-components";
import owl from "./owl.png"; // Tell webpack this JS file uses this image
import baby from "./baby.jpeg"
import cardpdf from "./card.pdf"; // Tell webpack this JS file uses this image
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faGift, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons' ;
import ReactGA from "react-ga";
import { openPopupWidget } from "react-calendly";

const GA_KEY = process.env.GOOGLE_ANALYTICS_KEY;

ReactGA.initialize(GA_KEY);
ReactGA.pageview("/hello");
const data = {
  across: {
    1: {
      clue: "Dit ben ik! // This is me!",
      answer: "PJOTR",
      row: 3,
      col: 0,
    },
    2: {
      clue: "Это я!",
      answer: "ПЕТР",
      row: 3,
      col: 6,
    },
  },
  down: {
    1: {
      clue: "Vaders van deze Antarctische vogel zorgen voor hun ongeboren jongen. Dads of this Antarctic bird take careof their unborn offspring (E=I)",
      answer: "PINGUIN",
      row: 3,
      col: 0,
    },
    3: {
      clue: "Nederlands voor счастлив. Dutch translation of счастлив",
      answer: "BLIJ",
      row: 0,
      col: 1,
    },
    4: {
      clue: "Hier ben ik vandaag geboren. Here I was born today",
      answer: "BOSTON",
      row: 2,
      col: 2,
    },
    5: {
      clue: "Hier ontmoetten mijn ouders elkaar. Here my parents met",
      answer: "GENT",
      row: 0,
      col: 3,
    },
    6: {
      clue: "Mijn mama’s favoriete Japanse soep, je kan er ook door kijken. Mom's favorive Japanese soup, you can also look through them (in Dutch)",
      answer: "RAMEN",
      row: 3,
      col: 4,
    },

    "": {
      clue: "",
      answer: "-",
      row: 3,
      col: 5,
    },
    7: {
      clue: "Звук, который издает мой папа, когда спит",
      answer: "ХРАП",
      row: 0,
      col: 6,
    },
    8: {
      clue: "Папин любимый сок из этого азиатского фрукта, наименование которого заимствовано из голландского",
      answer: "АПЕЛЬСИН",
      row: 1,
      col: 7,
    },
    9: {
      clue: "Кельвин является мне",
      answer: "БРАТ",
      row: 0,
      col: 8,
    },
    10: {
      clue: "Город, где вырос мой папа",
      answer: "БРЮГГЕ",
      row: 2,
      col: 9,
    },
  },
};

const Page = styled.div`
  padding: 2em;
`;

const Footer = styled.div`
  padding-bottom: 0.2em;
`;

const Header = styled.h1`
  margin-bottom: 1em;
`;

const Commands = styled.div``;

const Command = styled.button``;

const CalendarButton = ({ url, prefill, pageSettings, utm }) => {
  const onClick = () => openPopupWidget({ url, prefill, pageSettings, utm });

  return <button className="button1" onClick={onClick}> <span style={{ fontSize: "1.25em" }}>
  <FontAwesomeIcon icon={faCalendarAlt} />
</span> &nbsp; Book a meeting with me!</button>;
};

const CrosswordWrapper = styled.div`
  margin: auto;
  max-width: 30em;

  /* and some fun making use of the defined class names */
  .crossword.correct {
    rect {
      stroke: rgb(100, 200, 100) !important;
    }
    svg > rect {
      fill: rgb(100, 200, 100) !important;
    }
    text {
      fill: rgb(100, 200, 100) !important;
    }
  }

  .clue.correct {
    ::before {
      content: "\u2713"; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: rgb(100, 200, 100);
      margin-right: 0.25em;
    }

    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
`;

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function App() {
  const crossword = useRef();

  const focus = useCallback((event) => {
    crossword.current.focus();
  }, []);

  const fillAllAnswers = useCallback((event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((event) => {
    crossword.current.reset();
    ReactGA.event({
      category: "Crossword",
      action: "Reset",
    });
  }, []);


  // onCorrect is called with the direction, number, and the correct answer.
  const onCorrect = useCallback(
    (direction, number, answer) => {
      ReactGA.event({
        category: "Crossword",
        action: "Correct word",
        value: answer,
        label: answer,
      });
    },
    []
  );

  // onLoadedCorrect is called with an array of the already-correct answers,
  // each element itself is an array with the same values as in onCorrect: the
  // direction, number, and the correct answer.
  const onLoadedCorrect = useCallback(
    (answers) => {
     
    },
    []
  );

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
    },
    []
  );

  // onCellChange is called with the row, column, and character.
  const onCellChange = useCallback(
    (row, col, char) => {
    },
    []
  );

  const theme = {
    gridBackground: "transparent",
    columnBreakpoint: "100000px",
  };
  const chatHtml =
    '<div id="tlkio" data-channel="bostonbaby" style="width:100%;height:500px;"></div>';

  const [showChatOverlay, setShowChatOverlay] = React.useState(true);
  const onClickChatOverlay = () => {
    setShowChatOverlay(false);
    ReactGA.event({
      category: "Chat",
      action: "Open",
    });
  };

  const onChatNewWindow = () => {
    ReactGA.event({
      category: "Chat",
      action: "OpenNewWindow",
    });
  };

  const onBabyListOpen = () => {
    ReactGA.event({
      category: "BabyList",
      action: "Open",
    });
  };

  const onGithubOpen = () => {
    ReactGA.event({
      category: "Github",
      action: "Open",
    });
  };
  const onCardPdfDownload = () => {
    ReactGA.event({
      category: "Card",
      action: "PdfDownload",
    });
  };
  const dp = showChatOverlay ? "flex" : "none";
  return (
    <div>
      <Page>
        <Header id="hello">Hi, my name is</Header>
        <p id="subhello">
          Привет, меня зовут
          <br />
          Hallo, mijn naam is
        </p>
        <p id="dashes">_ _ _ _ _</p>

        <br />
        <table className="datetable">
          <tbody>
            <tr>
              <td>
                <div className="day">22</div>
              </td>
              <td>
                <div className="month">
                  <sup>nd</sup> of July
                  <br />
                  juli
                  <br />
                  июля
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>4:12pm EDT</p><br/>
        {/* <img
            className="baby"
            src={baby}
            style={{ width: "70%", maxWidth: "300px", borderRadius: "50%" }}
          /> */}
        <p>
          Hi, I have just been born. <br />
          Since just giving you my name would not have been fun, we made you a
          little game. <br />
          Have fun!
        </p>
        <br/>

        <table
          className="heightweighttable"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <tbody>
            <tr style={{ width: "100%" }}>
              <td>
                <div className="height">0110101 cm</div>
              </td>
              <td>
                <div className="weight">
                  X kg (e<sup>4x-16.3</sup> = 1)
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="imgdiv">
          {" "}
          <img
            className="owlImg"
            src={owl}
            style={{ float: "left", width: "150px" }}
          />
        </div>

        <ul>
          <li>
            <CrosswordWrapper>
              <Crossword
                data={data}
                ref={crossword}
                onCorrect={onCorrect}
                onLoadedCorrect={onLoadedCorrect}
                onCrosswordCorrect={onCrosswordCorrect}
                onCellChange={onCellChange}
                theme={theme}
              />
            </CrosswordWrapper>
            <Commands>
              {/* <Command onClick={focus}>Focus</Command> */}
              {/* <Command onClick={fillAllAnswers}>Fill all answers</Command> */}
              <Command className="button1" onClick={reset}>
                Reset puzzle
              </Command>
            </Commands>
          </li>
          <li>
            <h2>Say hello or discuss questions</h2>
            <div>
              <div className="overlaywidth">
                <div
                  className="overlaydiv"
                  onClick={onClickChatOverlay}
                  style={{ display: dp }}
                >
                  <p className="chatdivtext">
                    Click for a collaborative chat (might contain spoilers)
                    <br />
                    <br />
                    Klik voor een hulplijn
                    <br />
                    <br />
                    Кликни сюда, если нужна помощь или ты хочешь сказать нам
                    привет
                  </p>
                </div>
              </div>
              <div
                className="chatdiv"
                dangerouslySetInnerHTML={{ __html: chatHtml }}
              ></div>
            </div>
            <p>
              Issues joining/typing above? Click{" "}
              <a
                href="https://tlk.io/bostonbaby"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onChatNewWindow}
              >
                here
              </a>{" "}
              to open the chat in a new window
            </p>
          </li>
        </ul>

        <p>
          <CalendarButton url="https://calendly.com/bostonbaby" />

          <br/>
          <br/>
          <span style={{ fontSize: "1.25em" }}>
            <FontAwesomeIcon icon={faGift} />
          </span>
          &nbsp;
          <a
            href="https://thelittleone.rocks/list"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onBabyListOpen}
          >
            thelittleone.rocks/list
          </a>{" "}
          - password: bostonbaby
          <br />
          <span style={{ fontSize: "1.25em" }}>
            <FontAwesomeIcon icon={faPiggyBank} />
          </span>
          &nbsp;BE40 0639 2839 9563
        </p>
        <p>
          Download my card as PDF{" "}
          <a
            href={cardpdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onCardPdfDownload}
          >
            here.
          </a>
        </p>
        <br />
      </Page>
      <hr />
      <Footer>
        <p>
          {" "}
          Made with <span style={{ color: "#e25555" }}>&hearts;</span> by mom
          and dad.
          <span style={{ fontSize: "1.25em" }}>
            <FontAwesomeIcon icon={faGithub} />
          </span>  <a
            href="https://github.com/wdvr/babycard"
            onClick={onGithubOpen}
          />
        </p>
      </Footer>
    </div>
  );
}

export default App;
