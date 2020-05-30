
 import React, { useEffect,useContext } from 'react'
 import  'rsuite/dist/styles/rsuite-default.css'
 import { Table ,Button} from 'rsuite';
 import {UserContext,UPDATEUSER,UPDATEPHONE} from './App';
const { Column, HeaderCell, Cell } = Table;

export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
      <Cell {...props} className={editing ? 'table-content-editing' : ''}>
        {editing ? (
          <input
            className="rs-input"
            defaultValue={rowData[dataKey]}
            onChange={event => {
              onChange && onChange(rowData.id, dataKey, event.target.value);
            }}
          />
        ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
      </Cell>
    );
  };
  
  const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: '6px 0' }}>
        <Button
          appearance="link"
          onClick={() => {
            onClick && onClick(rowData.id);
          }}
        >
          {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
        </Button>
      </Cell>
    );
  };
 
 
  const GridOfUsers = () => {
   
    const {state,dispatch} = useContext(UserContext);
    const [data, setData] = React.useState(state.users);
    

    const handleChange = (id, key, value) => {
      const nextData = Object.assign([], data);
      nextData.find(item => item.id === id)[key] = value;
      setData(nextData);
    };
    const handleEditState = id => {
      const nextData = Object.assign([], data);
      const activeItem = nextData.find(item => item.id === id);
      activeItem.status = activeItem.status ? null : 'EDIT';
      setData(nextData);
      if(!activeItem.status){
        dispatch({type:UPDATEUSER,value:nextData});
      }
    };
  
    return (
      <Table height={420} data={data}>
        <Column width={200}>
          <HeaderCell>First Name</HeaderCell>
          <EditCell dataKey="id" onChange={handleChange} />
        </Column>
  
        <Column width={200}>
          <HeaderCell>Last Name</HeaderCell>
          <EditCell dataKey="name" onChange={handleChange} />
        </Column>
  
        <Column width={300}>
          <HeaderCell>Email</HeaderCell>
          <EditCell dataKey="phone" onChange={handleChange} />
        </Column>
  
        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey="website" onClick={handleEditState} />
        </Column>
      </Table>
    );
  };
  
export default GridOfUsers;