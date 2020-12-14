import React from 'react'
import {Row, Col, Button, Form} from 'react-bootstrap'

export default function BoardEdit({history, boardList, match, onEdit}) {
  const targetId = parseInt(match.params.boardId);

  // Hook 필요.
  const targetBoard = boardList.filter(item=>{
    if(item.id===targetId){
      return true;
    }
    return false;
  });
  const [titleInput, setTitleInput] = React.useState(targetBoard[0].title)
  const [contentInput, setContentInput] = React.useState(targetBoard[0].content)
  if (targetBoard.length !== 1){
    return (
      <div>
        <h2>404...</h2>
      </div>
    )
  }

  return (
    <div>
      <Row>
        <Col>
          <div>
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" value={titleInput} onChange={(e)=>{
              setTitleInput(e.target.value);
            }} />
          </div>
          <div>
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={7} value={contentInput} onChange={(e)=>{
              setContentInput(e.target.value)
            }}  />
          </div>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col>
            <Button onClick={
              ()=>{
                console.log(titleInput)
                onEdit(targetId, {id: targetId, title: titleInput,  content: contentInput})
                history.push('/board')
              }
            } 
              variant='info'>수정</Button>
        </Col>
      </Row>
    </div>
  )
}
