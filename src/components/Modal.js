import React from "react";

const Modal = ({ isCorrect, turn, solution }) => {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h2>You Win!</h2>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses✨🎉</p>
          <p className="msg">Reload the page to play again</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h2>Never Mind!</h2>
          <p className="solution">{solution}</p>
          <p>Better luck next time😉</p>
          <p className="msg">Reload the page to play again</p>
        </div>
      )}
    </div>
  );
};

export default Modal;
