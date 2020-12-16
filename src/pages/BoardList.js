import React from 'react';
import {Row, Col, ListGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function BoardList({history}) {

  const [boardList, setBoardList] = React.useState([]);

  const [refresh, setRefresh] = React.useState(false);


  // fetch: HTTP 요청을 보내는 함수
  // fetch(url, <option>)

  // React.useEffect Hook
  React.useEffect(()=>{
    fetch("/api/board", {
      method:'GET',
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(data);
      setBoardList(data.result)
    })
  }, []);
  


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
