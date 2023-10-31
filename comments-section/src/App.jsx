import "./App.css";
import CommentsContainer from "./containers/CommentsContainer";
import comments from "../mock-data/comments";

function App() {
  return (
    <>
      <h1>Comments Section</h1>
      <CommentsContainer comments={comments[0]} />
    </>
  );
}

export default App;
