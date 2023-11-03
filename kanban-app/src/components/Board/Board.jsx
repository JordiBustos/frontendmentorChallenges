import PropTypes from 'prop-types';
import Column from '../Column/Column';
import './board.css';

const Board = ({board}) => {
  const columns = board.columns
  return (
    <div className='board-container'>
    {
      columns.map((column) => {
        return <Column key={column.name} name={column.name} tasks={column.tasks}  />
      })
    }
    <Column name="+ New Column" tasks={[]} />
    </div>
  )
}

Board.propTypes = {
  board: PropTypes.object.isRequired
}

export default Board;