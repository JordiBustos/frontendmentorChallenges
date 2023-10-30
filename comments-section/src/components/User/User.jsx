import PropTypes from "prop-types";
import "./user.css";

const User = ({ user }) => {
  User.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.shape({
        png: PropTypes.string.isRequired,
        webp: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  return (
    <div className="user">
      <img src={user.image.png} alt={user.username} />
      <div>
        <h4>{user.username}</h4>
      </div>
    </div>
  );
}

export default User;