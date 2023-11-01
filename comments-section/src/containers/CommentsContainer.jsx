import Comment from "../components/Comment/Comment";
import Input from "../components/Comment/Input/Input";
import PropTypes from "prop-types";
import { useState } from "react";

const CommentsContainer = ({ comments }) => {
  const [commentsList, setCommentsList] = useState(comments);

  const renderedComments = commentsList.map((comment) => {
    return (
      <Comment
        comment={comment}
        setCommentsList={setCommentsList}
        key={comment.id}
      />
    );
  });

  return (
    <div>
      {renderedComments}

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
