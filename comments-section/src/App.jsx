import './App.css'
import Comments from './components/Comments'
import comments from "../mock-data/comments";


function App() {

  return (
    <>
      <h1>Comments Section</h1>
      <Comments comments={comments[0]}/>      
    </>
  )
}

export default App
