import {useEffect, useReducer} from 'react';
import Header from './Header';
import Mains from './Mains';
import Loader from './Loader';
import Error from './Error';
import Question from './Question';
import Start from './Start';
import Nextbutton from './components/Nextbutton';
import Progressbar from './components/Progressbar';
import Finish from './components/Finish';
import Footer from './components/Footer';
import Timer from './Timer';

//secs per questions
const secs=30;

const initialState={
  questions:[],
  status:'loading',
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondsRemaining:null
}
const reducer=(state,action)=>{
switch (action.type) {
  case "dataRecieved":
    return{
      ...state,
      questions:action.payload,
      status:'ready'
    }
   case "dataFailed":
    return{
      ...state,
      status:'error'
    } 
    case "start":
      return{
        ...state,
        status:'active',
        secondsRemaining:state.questions.length * secs
      } 
   case "newAnswer":
    const question=state.questions.at(state.index)
    return{
      ...state,
      answer:action.payload ,
      points:action.payload===question.correctOption ? state.points+question.points:state.points 
    }
    case "nextQuestion":
      return{
        ...state,
        index:state.index+1,
        answer:null
      }
      case "finish":
        return{
          ...state,
          status:'finished',
          highscore:state.points>state.highscore?state.points :state.highscore
        }
        case "restart":
        return{
         ...initialState,questions:state.questions,status:'ready'
        }
        case "tick":
          return{
            ...state,secondsRemaining:state.secondsRemaining-1,status:state.secondsRemaining<0 ?"finished":state.status
          }
  default:
   throw new Error('Unknown Error')
}
}
const App = () => {
  const [{questions,status,index,answer,points,highscore,secondsRemaining},dispatch]=useReducer(reducer,initialState)

 const numQuestions=questions.length;
const maxpossiblePoints=questions.reduce((prev,cur)=>prev +cur.points,0);
  useEffect(function () {
   fetch('http://localhost:8000/questions').then((res=>res.json()))
   .then((data)=>dispatch({type:'dataRecieved',payload:data}))
   .catch((err)=>dispatch({type:'dataFailed'}))
  }, [])
  return (
   <div className='app'>   
   <Header/>
   <Mains>
   {status==='loading' && <Loader/>}
   {status==='error' && <Error/>}
   {status==='ready' && <Start  numQuestions={numQuestions} dispatch={dispatch}/>}
   {status==='active' && 
   <>
   <Progressbar 
   numQuestions={numQuestions} 
   index={index} 
   maxpossiblePoints={maxpossiblePoints} 
   points={points}
   answer={answer}/>
   <Question 
   question={questions[index]}
   dispatch={dispatch} 
   answer={answer}/>
   <Footer>
   <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
   <Nextbutton 
   dispatch={dispatch} 
   answer={answer}
   index={index}
   numofQuestions={numQuestions}/>
   </Footer>
   </>
   }
   {/**when the quiz is finshed and we display the points */}
   
   {status ==='finished' && <Finish 
   maxpossiblePoints={maxpossiblePoints} 
   points={points} 
   highscore={highscore}
   dispatch={dispatch}/>}
   </Mains>
   </div>
  )
}

export default App