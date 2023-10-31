import Comment from "./Comment/Comment";
import Input from "./Input/Input";
import PropTypes from "prop-types";
import { useState } from "react";

const Comments = ({ comments }) => {
  const [commentsList, setCommentsList] = useState(comments);
  return (
    <div>
      {commentsList.map((comment) => (
        <Comment comment={comment} key={comment.id} setCommentsList={setCommentsList} isReply={true}/>
      ))}
      <Input updateComments={setCommentsList} isReply={false} commentId={null} />
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Comments;
