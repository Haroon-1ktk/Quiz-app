import React from 'react'

const Finish = ({points,maxpossiblePoints,highscore,dispatch}) => {
    const percentage=(points/maxpossiblePoints)*100;
    let emoji;
    if(percentage===100) emoji='🥇';
    if(percentage>=80 &&percentage <100) emoji='🎉';
    if(percentage>=50 &&percentage <80) emoji='😃';
    if(percentage>=0 &&percentage <50) emoji='😞';
    if(percentage===0) emoji='🤦🏻‍♂️';
  return (
    <>
   <p className='result'><span>{emoji}</span>
    you score <strong>{points}</strong>{" "}
    out of {maxpossiblePoints}({Math.ceil(percentage)}%)
   </p>
   <p>highestscore:{highscore} points</p>
   <button
     className='btn btn-ui' 
     onClick={()=>dispatch({type:'restart'})}>Restart</button>
   </>
  )
}

export default Finish