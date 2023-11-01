import Comment from "../components/Comment/Comment";
import Input from "../components/Comment/Input/Input";
import comments from "../../mock-data/comments";
import { useState } from "react";

const CommentsContainer = () => {
  const [commentsList, setCommentsList] = useState(comments[0]);

  const renderedComments = commentsList.map((comment) => {
    return (
      <Comment
        comment={comment}
        setCommentsList={setCommentsList}
        isReply={true}
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

export default CommentsContainer;
