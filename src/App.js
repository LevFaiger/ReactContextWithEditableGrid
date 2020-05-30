import React, {createContext,useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import  GridOfUsers from './GridOfUsers';
import fakeData from './mockup/users.json';

const initialState = {users:fakeData};
export const UPDATEUSER='updateuser';
export const UPDATEPHONE='updatephone';



const reducer = (state,action)=>{
  debugger;
  switch(action.type){
    case UPDATEUSER:{
      return {...state,...action.value}
    }
    case UPDATEPHONE:{
      let user = state.users.find(item => item.id==action.value.id);
      if(user){
        return {...state.users,...user.phone=action.value.phone }
      }
      return state;
    }
  }
}


export const UserContext = React.createContext(null);
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state,dispatch}}>
      <GridOfUsers></GridOfUsers>
    </UserContext.Provider>
  );
}

export default App;
