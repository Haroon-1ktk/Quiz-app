import React from 'react'

const Start = ({numQuestions,dispatch}) => {
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz</h2>
        <h3>{numQuestions} number of questions to test your mastery</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'start'})}>Let's Start</button>
    </div>
  )
}

export default Start