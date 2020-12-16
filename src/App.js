import React from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BoardDetail from './pages/BoardDetail';
import BoardEdit from './pages/BoardEdit';
import BoardList from './pages/BoardList';
import BoardWrite from './pages/BoardWrite';
import MyNavbar from './components/MyNavbar';

import {Container} from 'react-bootstrap';
import defaultBoardList from './variables/board'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      boardList: defaultBoardList
    }
  }

  deleteBoardItem(boardId){
    let targetId = parseInt(boardId);
    
    const newBoardList = this.state.boardList.filter((item)=>{
      if (item.id === targetId){
        return false;
      }
      return true;
    });

    this.setState({boardList: newBoardList});
  }

  editBoardItem(boardId, board){
    let targetId = parseInt(boardId);
    const newBoardList = this.state.boardList.map((item)=>{
      if (item.id === targetId){
        return {
          ...item,
          ...board
        }
      }
      return item
    })
    this.setState({boardList:newBoardList})
  }

  postBoardItem(board){
    const newBoardList = this.state.boardList.concat({id:this.state.boardList.length + 1, ...board});
    this.setState({boardList: newBoardList})
  }


  render(){
    return (
      <Router>
        <MyNavbar/>
        <Container style={{marginTop: 100}}>
          <Switch>
            <Route exact path={['/', '/board']} component={
              (beforeProps)=>(<BoardList {...beforeProps} boardList={this.state.boardList} />)
            }/>
            <Route path='/board/:boardId' component={
              (beforeProps)=>(<BoardDetail {...beforeProps} boardList={this.state.boardList} 
                onDelete={this.deleteBoardItem.bind(this)}
                // onDelete={this.deleteBoardItem}
                // onDelete={(boardId)=>{
                //   this.deleteBoardItem(boardId)
                // }}
              />)
            }/>
            <Route path='/boardEdit/:boardId' component={
              (beforeProps)=>(<BoardEdit {...beforeProps} boardList={this.state.boardList}
                // onEdit={(boardId, board)=>{
                //   this.editBoardItem(boardId, board)
                // }} 
                onEdit={
                  this.editBoardItem.bind(this)
                } 
                />)
            }/>
            <Route path='/boardWrite' component={
              (beforeProps)=>(<BoardWrite {...beforeProps} onPost={this.postBoardItem.bind(this)} />)
            }/>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
