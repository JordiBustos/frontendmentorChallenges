import PropTypes from "prop-types";
import { useState } from "react";

const Counter = ({ upvotes }) => {
  Counter.propTypes = {
    upvotes: PropTypes.number.isRequired,
  };

  const [currUpvotes, setUpvotes] = useState(upvotes);
  const [increaseWasClicked, setIncreaseWasClicked] = useState(false);
  const [decreaseWasClicked, setDecreaseWasClicked] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  

  const handleClick = (n) => {
    decreaseWasClicked || increaseWasClicked
      ? setUpvotes(currUpvotes + 2 * n)
      : setUpvotes(currUpvotes + 1 * n);
    
    if (isFirstTime) {
      n === 1 
        ? setIncreaseWasClicked(!increaseWasClicked)
        : setDecreaseWasClicked(!decreaseWasClicked)
    } else {
      setIncreaseWasClicked(!increaseWasClicked)
      setDecreaseWasClicked(!decreaseWasClicked)
    }
    setIsFirstTime(false);
  };

  return (
    <div>
      <button onClick={() => handleClick(1)} disabled={increaseWasClicked}>
        +
      </button>
      <p>{currUpvotes}</p>
      <button onClick={() => handleClick(-1)} disabled={decreaseWasClicked}>
        -
      </button>
    </div>
  );
};

export default Counter;
