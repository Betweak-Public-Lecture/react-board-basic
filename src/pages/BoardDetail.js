import React from 'react'
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap'

export default function BoardDetail({match, history, boardList, onDelete}) {
  const boardId = parseInt(match.params.boardId)
  
  const targetBoard = boardList.filter((item)=>{
    console.log(item.id)
    if(item.id===boardId){
      return true;
    }
    return false;
  })
  if (targetBoard.length !==1){
    return (
      <div>
        <h1>404..</h1>
      </div>
    )
  }
  
  return (
    <div>
      <Row>
        <Col>
          <h3>{targetBoard[0].title}</h3>
          <div style={{border:"1px solid black", padding:10, minHeight:250}}>
            {targetBoard[0].content}
          </div>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col>
          <ButtonGroup style={{float:'right'}}>
            <Button onClick={()=>{history.push(`/boardEdit/${boardId}`)}} variant='info'>수정</Button>
            <Button 
              onClick={()=>{
                onDelete(boardId);
                history.push('/board');
              }}
              variant='danger'>
              삭제
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  )
}
