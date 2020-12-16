import React from 'react'
import {Row, Col, Button, Form} from 'react-bootstrap'

export default function BoardEdit({history, match}) {
  const targetId = parseInt(match.params.boardId);
  
  const [titleInput, setTitleInput] = React.useState('')
  const [contentInput, setContentInput] = React.useState('')

  React.useEffect(()=>{
    fetch(`/api/board/${targetId}`, {
      method: 'GET'
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      setTitleInput(data.result[0].title)
      setContentInput(data.result[0].content)
    })
  }, []);

  const onEdit = function(targetId, {title, content}){
    fetch(`/api/board/${targetId}`, {
      method: 'PUT',
      headers: {
        'CONTENT-TYPE': 'application/json'
      },
      body: JSON.stringify({
        title,
        content
      })
    }).then(resp=>{
      return resp.json();
    }).then(data=>{
      alert("수정되었습니다.");
      history.push(`/board/${targetId}`)
    })
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
                onEdit(targetId, {title: titleInput,  content: contentInput})
                // history.push('/board')
              }
            } 
              variant='info'>수정</Button>
        </Col>
      </Row>
    </div>
  )
}
