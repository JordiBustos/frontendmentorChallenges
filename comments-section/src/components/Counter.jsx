import PropTypes from 'prop-types';

const Counter = ({ upvotes }) => {
  Counter.propTypes = {
    upvotes: PropTypes.number.isRequired,
  }

  return (
    <div>
      <p>{upvotes} upvotes</p>
    </div>
  );
}

export default Counter;