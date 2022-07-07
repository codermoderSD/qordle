import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const Wordle = ({ solution }) => {
  const [showModal, setShowModal] = useState(false);
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn, showModal]);

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
      <div className="vkeyboard">
        <Keyboard
          onKeyPress={(button) => {
            handleKeyup({ key: button });
            console.log(button);
          }}
          mergeDisplay={true}
          layoutName="default"
          layout={{
            default: [
              "q w e r t y u i o p",
              "a s d f g h j k l",
              "{shift} z x c v b n m Backspace",
              "{numbers} {space} Enter",
            ],
            shift: [
              "Q W E R T Y U I O P",
              "A S D F G H J K L",
              "{shift} Z X C V B N M Backspace",
              "{numbers} {space} Enter",
            ],
            numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 Backspace"],
          }}
          display={{
            "{numbers}": "123",
            Enter: "enter",
            "{escape}": "esc ⎋",
            "{tab}": "tab ⇥",
            Backspace: "⌫",
            "{capslock}": "caps lock ⇪",
            "{shift}": "⇧",
            "{controlleft}": "ctrl ⌃",
            "{controlright}": "ctrl ⌃",
            "{altleft}": "alt ⌥",
            "{altright}": "alt ⌥",
            "{metaleft}": "cmd ⌘",
            "{metaright}": "cmd ⌘",
            "{abc}": "ABC",
          }}
        />
      </div>
    </div>
  );
};

export default Wordle;
