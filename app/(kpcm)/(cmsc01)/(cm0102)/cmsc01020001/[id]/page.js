"use client"
import { useRouter } from "next/navigation";
import {useEffect, useState} from 'react';
import {
    TextField
   ,Button
} from '@mui/material';
import { Result } from "postcss";
export default  function Insert(props) {
   const id = props.params.id;
   const router = useRouter();
   const [title, setTitle] = useState('');
   const [contents, setContents] = useState('');
   const inputProps = {step: 300};
   const option = {
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body:JSON.stringify({title,contents})
  };

    async function handleSubmit(event) {
        event.preventDefault();
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, contents })
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insertBorad`, option)
            .then(res => res.json())
            .then(result => {
                // router.push('/kpcm/cm01/cm0101/selectBoardList/1').then(() => window.location.reload());
                router.push('/kpcm/cm01/cm0101/selectBoardList/1');
                router.refresh();
            })
            .catch(error => {
                console.error('Error:', error);
            });
   }

     return (

        <form onSubmit={handleSubmit}>
          <h2>insert!!</h2>
             <p>
             <Button variant="contained" type="submit">저장</Button>
             </p>
            <TextField id="title" name="title" label="제목을 입력하세요."   onChange={e=>setTitle(e.target.value)} value={title} type="text" inputProps={inputProps}  />
            <TextField
             id="contents"
             name="contents"
             label="게시글"
             multiline
             rows={13}
             width={600}
             onChange={e=>setContents(e.target.value)} value={contents}
             style={{ width: 700, height: 150, borderRadius: '50%' }}
             />
        </form>
     )
 }