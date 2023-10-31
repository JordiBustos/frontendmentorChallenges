import PropTypes from "prop-types";
import "./user.css";

const User = ({ user, isCurrent }) => {
  return (
    <section>
      <div className="user">
        <img src={user.image.png} alt={user.username} />
        <div className="user--username">
          <h4>{user.username}</h4>
          {isCurrent ? <p className="user--current">you</p> : null}
        </div>
      </div>
    </section>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.shape({
      png: PropTypes.string.isRequired,
      webp: PropTypes.string.isRequired,
    }),
  }).isRequired,
  isCurrent: PropTypes.bool,
};

export default User;
