import {useEffect} from 'react'

const Timer = ({dispatch,secondsRemaining}) => {
  const math=Math.floor(secondsRemaining/60);
  const seconds=secondsRemaining % 60
  useEffect(()=>{
   const id= setInterval(()=>{
     dispatch({type:'tick'})
    },1000)
    return()=>clearInterval(id)
  },[dispatch])
  return (
    <div className='timer'>{math <10 && '0'}{math}:{seconds<10 &&'0'}{seconds}</div>
  )
}

export default Timer