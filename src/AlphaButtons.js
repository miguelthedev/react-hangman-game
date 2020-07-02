import React, { Component } from 'react';

class AlphaButtons extends Component {
  constructor(props) {
    super(props);
    this.guessHandler = this.guessHandler.bind(this);
  }

  guessHandler(evt) {
    this.props.handleGuess(evt)
  }

  render() {
    let buttons = this.props.letters.split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.guessHandler}
        disabled={this.props.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ))

    return (
      <p className='Hangman-btns'>
        {buttons}
      </p>
    );
  }
}

export default AlphaButtons;
