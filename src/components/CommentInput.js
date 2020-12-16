import React from 'react';
import {Form, Button} from 'react-bootstrap';

export default function CommentInput({onPost}){
  const [comment, setComment] = React.useState('')

  return (
    <div>
      <Form.Control value={comment} onChange={e=>setComment(e.target.value)} />
      <Button onClick={e=>{
          onPost(comment);
          setComment('');
        }}>
          입력
        </Button>
    </div>    
  )
}