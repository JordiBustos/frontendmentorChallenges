import Comment from "../components/Comments/Comment/Comment";
import Input from "../components/Comments/Input/Input";
import PropTypes from "prop-types";
import { useState } from "react";

const CommentsContainer = ({ comments }) => {
  const [commentsList, setCommentsList] = useState(comments);

  return (
    <div>
      {commentsList.map((comment) => (
        <Comment
          comment={comment}
          key={comment.id}
          setCommentsList={setCommentsList}
          isReply={true}
        />
      ))}
      <Input
        updateComments={setCommentsList}
        isReply={false}
        commentId={null}
      />
    </div>
  );
};

CommentsContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentsContainer;
