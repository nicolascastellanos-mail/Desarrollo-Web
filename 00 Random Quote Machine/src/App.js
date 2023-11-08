// 05 oct 17:33

// React imports
import React from 'react';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.css';

// FontAwesome imports
import { faForward, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// SASS imports
import './App.scss';


const quotes = [
  [
    "Life shrinks or expands in proportion with one's courage",
    "Anaïs Nin"
  ],
  [
    "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times",
    "Bruce Lee"
  ],
  [
    "Computer science education cannot make anybody an expert programmer any more than studying brushes and pigment can make somebody an expert painter",
    "Eric Raymond"
  ],
  [
    "The more you know, the more you realize you know nothing",
    "Socrates"
  ],
  [
    "Optimism is an occupational hazard of programming; feedback is the treatment",
    "Kent Beck"
  ],
  [
    "A change in perspective is worth 80 IQ points",
    "Alan Kay"
  ]
]

class myApp extends React.Component {
  constructor(props) {
    super(props);
    const randomIndex = Math.floor(Math.random() * quotes.length)
    this.state = {
      quote: quotes[randomIndex][0],
      author: quotes[randomIndex][1]
    };
    this.changeQuote = this.changeQuote.bind(this);
  }

  changeQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    this.setState(
      {
        quote: quotes[randomIndex][0],
        author: quotes[randomIndex][1]
      }
    );
  }

  render() {
    return (
      <div id={"app-container"} className={"my-flex bg-light"}>
        <h1 id={"title"} className={"text-center text-primary"}>Random Quote Machine</h1>
        <div id={"quote-box"} className={"my-flex bg-dark"}>
          <div id={"quote"} className={"my-flex"}>
            <p id={"text"} className={"text-center text-light"}>{this.state.quote}</p>
            <p id={"author"} className={"text-center text-warning"}>{this.state.author}</p>
          </div>
          <div id={"buttons"} className={"bg-warning"}>
            <button className={"btn btn-success"} id={"new-quote"} onClick={this.changeQuote}>
              <FontAwesomeIcon icon={faForward} /> Next Quote
            </button>
            <button className={"btn btn-primary"}>
              <a id={"tweet-quote"} href={"twitter.com/intent/tweet"} target={"_blank"} rel={"noreferrer"}>
                <FontAwesomeIcon icon={faRetweet} /> Tweet Quote
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default myApp;

// Pause     05 oct 18:09
// Continue  06 oct 03:54
// Pause     06 oct 04:22. Not able to put the buttons in a row class div
// Continue  06 oct 19:54
// Finished  07 oct 00:37