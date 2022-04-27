import {useState} from 'react';
import './App.css';
import { createStore} from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

function reducer(currentState, action) {
  if(currentState === undefined){
    return {
      reduxNum : 1
    }
  }
  const newState = {...currentState};

  if(action.type==='INCREMENT') {
    newState.reduxNum++;
  }

  return newState;
}
const store =  createStore(reducer);

export default function App() {

  /** 
   * 
   * Using Vanila 
   * 
  */
  const [num, setNum] = useState(0);
  return (
    <div id="container">
      <h1>VanilaRoot: {num}</h1>
      <UseVanila num={num} IncreaseNum={()=>{
        setNum(num+1);
      }}></UseVanila>
      <Provider store={store}>
        <UseRedux ></UseRedux>
      </Provider>
    </div>
  );
}

function UseVanila(props) {
  return (
    <div id="grid_vanila" >
      <Vanila1 num={props.num}></Vanila1>
      <Vanila3 num={props.num} IncreaseNum={()=>{
        props.IncreaseNum();
      }}></Vanila3>
    </div>
  );
}

function Vanila1(props) {
  return (
    <div>
      <h1>Vanila1: {props.num}</h1>
      <Vanila2 num={props.num}></Vanila2>
    </div>
  )
}

function Vanila2(props) {
  return (
    <div>
      <h1>Vanila2: {props.num}</h1>
    </div>
  )
}

function Vanila3(props) {
  return (
    <div>
      <h1>Vanila3</h1>
      <Vanila4 IncreaseNum={()=>{
        props.IncreaseNum();
      }}></Vanila4>
    </div>
  )
}

function Vanila4(props) {
  return (
    <div>
      <h1>Vanila4</h1>
      <input type="button" value="+" onClick={()=>{
        props.IncreaseNum();
      }}></input>
    </div>
  )
}

/** 
 * 
 * Using Redux 
 * 
 * */

function UseRedux(props) {
  return (
    <div id="grid_redux" >
      <Redux1></Redux1>
      <Redux3></Redux3>
    </div>
  );
}

function Redux1() {
  return (
    <div>
      <h1>Redux1:</h1>
      <Redux2></Redux2>
    </div>
  )
}

function Redux2() {
  const reduxNum = useSelector(state=> state.reduxNum);
  return (
    <div>
      <h1>Redux2: {reduxNum}</h1>
    </div>
  )
}

function Redux3() {
  return (
    <div>
      <h1>Redux3:</h1>
      <Redux4></Redux4>
    </div>
  )
}

function Redux4() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Redux4:</h1>
      <input type="button" value="+" onClick={()=>{
        dispatch({type:"INCREMENT"});
      }}></input>
    </div>
  )
}