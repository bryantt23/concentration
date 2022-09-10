import './index.css';
import React, { useState } from 'react';

/*
We are going to create a card game in React called concentration. 

Concentration is a single player card game played with N pairs of cards faced down. 
A player can choose any faced down card and flip it, revealing the card. 
The player then selects a second faced down card and flips it over. 
If the two cards have the same value, they stay face up. If they do not, 
they are flipped faced down again. A player wins the game when all cards are face up.

For our version, let's just play with 3 pairs of cards. Have the cards rendered out on
in a row and let's concentrate! 

Technical requirements:
 - Cards are 100px x 100px squares with background color #BEB7A4. 
 - Card values are "A", "B", and "C". They are presented to you already shuffled.
 - Faced down cards have a "?" in the center of the card.
 - Faced up cards have their original value.
 - When 2 cards are flipped up and not matching, wait 1 second before they flip down.
 - When all cards are matched, alert "You win!"

House rules:
 - Feel free to look anything up
 - "Concentrate" on the end goal and have fun!
*/

/* Step 1 - Style the cards and render it out. They should all be faced down by default */
const shuffledCards = ['A', 'C', 'A', 'B', 'B', 'C'];

const shuffledCardObjects = shuffledCards.map(card => {
  return { value: card, isHidden: true };
});
/* Step 2 - Implement flipping cards */

/* Step 3 - Matching the cards and winning the game */

/*
render 6 cards
onclick to flip
track if a card has already been flipped
if it's the second card, check if the 2 match
  if 2 cards match change their states to complete
    if all cards are flipped, game over
  if they don't match, change their states to hidden (after 1 second timeout)
styling
*/

export default function App() {
  const [cards, setCards] = useState(shuffledCardObjects);
  const [matchedCardCount, setMatchedCardCount] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);

  return (
    <div className='App'>
      <h1>Concentration</h1>
      {JSON.stringify(flippedCard)}
      <br />
      matchedCardCount
      {JSON.stringify(matchedCardCount)}
      <p>{JSON.stringify(cards)}</p>
      {matchedCardCount === cards.length ? (
        <p>You win</p>
      ) : (
        <div>
          {cards.map((card, index) => (
            <p
              key={index}
              onClick={e => {
                console.log(index);
                const curCard = shuffledCardObjects[index];
                const cardsCopy = [...cards];

                if (flippedCard && flippedCard.index === index) {
                  return;
                }

                if (curCard.isHidden) {
                  //else just flip it and check the next card
                  curCard.isHidden = false;
                  cardsCopy[index] = curCard;

                  if (flippedCard === null) {
                    setCards([...cardsCopy]);
                    setFlippedCard({ index, ...curCard });
                  } else {
                    //check for match if there is a flipped card
                    // is matched

                    if (
                      flippedCard.value === curCard.value &&
                      flippedCard.index !== index
                    ) {
                      setMatchedCardCount(
                        matchedCardCount => matchedCardCount + 2
                      );
                      const flippedCardCopy = { ...flippedCard };
                      flippedCardCopy.isHidden = false;
                      curCard.isHidden = false;

                      cardsCopy[flippedCardCopy.index] = flippedCardCopy;
                      cardsCopy[curCard.index] = curCard;

                      setCards(cardsCopy);
                    }
                    // is not matched
                    else {
                      debugger;
                      const flippedCardCopy = { ...flippedCard };
                      flippedCardCopy.isHidden = true;
                      curCard.isHidden = true;

                      cardsCopy[flippedCardCopy.index] = flippedCardCopy;
                      cardsCopy[curCard.index] = curCard;

                      setCards([...cardsCopy]);
                    }
                    setFlippedCard(null);
                  }
                }
              }}
            >
              {card.isHidden ? '?' : card.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
