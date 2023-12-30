

function Square({ chooseSquare, val }) {// chooseSquare -> function reference
  return (
    <div className='square border-4 border-rose-500' onClick={chooseSquare}> {val} </div>
  )
}

export default Square