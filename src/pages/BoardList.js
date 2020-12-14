import React from 'react';
import {Row, Col, ListGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function BoardList({history, boardList}) {

  return (
    <div>
      <Row>
        <Col>
          <Button style={{marginBottom:10,float:'right'}} 
                      onClick={()=>{history.push('/boardWrite')}}>
                        글 쓰기
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <ListGroup>
            {boardList.map(item=>(
                <ListGroup.Item onClick={()=>{
                  history.push('/board/'+item.id)
                }} action key={item.id}>
                  {item.title}
                </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}
