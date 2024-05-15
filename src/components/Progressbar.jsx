import React from 'react'

const Progressbar = ({numQuestions,index,maxpossiblePoints,points,answer}) => {
  return (
    <>
    <header className='progress'>
    <progress max={numQuestions} value={index +Number(answer!==null)}></progress>
    <p>Question <strong>{index+1}</strong>/{numQuestions}</p>
    <p><strong>{points}</strong>/{maxpossiblePoints}</p>
    </header>
    </>
  )
}

export default Progressbar