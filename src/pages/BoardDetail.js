import React from 'react'
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap'

import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

export default function BoardDetail({match, history}) {
  const boardId = parseInt(match.params.boardId)
  
  
  // TargetBoard state
  // const [targetBoard, setTargetBoard] = React.useState([]);

  const [targetBoard, setTargetBoard] = React.useState({title: '', content:''});

  React.useEffect(()=>{
    fetch(`/api/board/${boardId}`, {
      method: 'GET',
    }).then(response=>{
      return response.json()
    }).then(data =>{
      setTargetBoard(data.result[0])
    })
  }, []);

  // if (targetBoard.length !== 1){
  //   return (
  //     <div>
  //       wait..
  //     </div>
  //   )
  // }

  const onDelete = function(boardId){
    fetch(`/api/board/${boardId}`, {
      method: 'DELETE'
    }).then(resp=>{
      return resp.json();
    }).then(data=>{
      if (data.status === 'success'){
        history.push('/board')
      }
    })
  }
  
  const postComment = function(comment){
    fetch(`/api/board/${boardId}/comment`,{
      method: 'POST',
      headers: {
        'CONTENT-TYPE': 'application/json'
      },
      body: JSON.stringify({
        comment: comment
      })
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      // const id = Math.floor(Math.random() * Date.now())
      // const _comment = commentList.concat({id: id, content: comment})
      // console.log(_comment)
      // setCommentList(_comment)
      setNetworkCount(networkCount+1)
    })
  }

  const [networkCount, setNetworkCount] =  React.useState(0);

  const [commentList, setCommentList] = React.useState([]);
  // 코멘트 입력시, 재요청을 안함!
  React.useEffect(()=>{
    fetch(`/api/board/${boardId}/comment`, {
      method: 'GET'
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      setCommentList(data.result);
    })
  }, [networkCount]);

  // setInterval(
  //   ()=>{
  //     fetch(`/api/board/${boardId}/comment`, {
  //       method: 'GET'
  //     }).then(resp=>{
  //       return resp.json()
  //     }).then(data=>{
  //       setCommentList(data.result);
  //     })
  //   },
  //   10000 // 10초
  // )


  const deleteCommentItem = function(commentId){
    fetch(`/api/board/${boardId}/comment/${commentId}`, {
      method: 'DELETE'
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      setNetworkCount(networkCount+1)
    })
  }
  
  return (
    <div>
      <Row>
        <Col>
          <h3>{targetBoard.title}</h3>
          <div style={{border:"1px solid black", padding:10, minHeight:250}}>
            {targetBoard.content}
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
                // history.push('/board');
              }}
              variant='danger'>
              삭제
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <CommentInput onPost={postComment}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <CommentList onDelete={deleteCommentItem} commentList={commentList} />
        </Col>
      </Row>
    </div>
  )
}
