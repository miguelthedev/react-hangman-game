import React, { Component } from "react";
import { randomWord } from "./words";
import AlphaButtons from "./AlphaButtons";

import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    buttonsLetters: 'abcdefghijklmnopqrstuvwxyz'
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      hasWon: false
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /** guessedWord: show current-state of word:
   if guessed letters are {a,p,e}, show "app_e" for "apple"
   */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));

    this.setState(st => {
      let hasWon = st.answer.split('').every(ltr => st.guessed.has(ltr));
      return {hasWon};
    });
  }

  handleReset() {
    this.setState({nWrong: 0, guessed: new Set(), answer: randomWord(), hasWon: false});
  }

  /** render: render game */
  render() {
    const gameStatus = () => {
      if (this.state.hasWon) {
        return <p>You've won!</p>;
      } else if (this.props.maxWrong === this.state.nWrong) {
        return <p>You lose, the correct word was {this.state.answer}</p>;
      } else {
        return <AlphaButtons handleGuess={this.handleGuess}
                             letters={this.props.buttonsLetters}
                             guessed={this.state.guessed}/>;
      }
    };

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <div className="Hangman-container">
          <div className="Hangman-left">
            <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses`}/>
            <p>Wrong guesses: {this.state.nWrong}</p>
            <p className='Hangman-word'>{this.guessedWord()}</p>
          </div>
          <div className="Hangman-right">
            <button
              onClick={this.handleReset}
              style={{display: 'block', width: '100%', margin: '1.5rem 0'}}>
              Restart Game
            </button>
            {gameStatus()}
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;


/** generateButtons: return array of letter buttons to render */
// generateButtons() {
//   return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
//     <button
//       key={ltr}
//       value={ltr}
//       onClick={this.handleGuess}
//       disabled={this.state.guessed.has(ltr)}
//     >
//       {ltr}
//     </button>
//   ));
// }
