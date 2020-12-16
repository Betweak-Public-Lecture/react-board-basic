import React from 'react';
import {ListGroup} from 'react-bootstrap'

export default function CommentList({commentList, onDelete}){
  
  return (
    <ListGroup>
      {commentList.map(comment=>(
        <ListGroup.Item >
          <div style={{float:'left'}}>
            {comment.content}
          </div>
          
          <span style={{float:'right', cursor:'pointer'}} 
                onClick={()=>{
                  onDelete(comment.id)}
                }>
            x
          </span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}