import fetch from 'node-fetch';

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Método no permitido'});
  const {message,history}=req.body;
  if(!message) return res.status(400).json({error:'Falta el mensaje'});
  try{
    const response=await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        model:'gpt-4o-mini',
        messages:[
          {role:'system',content:'Eres Mate de Coco Bot, amigable y profesional, ayudas a crear sitios web y das consejos copados.'},
          ...history,
          {role:'user',content:message}
        ],
        temperature:0.7
      })
    });
    const data=await response.json();
    res.status(200).json({answer:data.choices[0].message.content});
  }catch(err){
    console.error(err);
    res.status(500).json({answer:'Ups, algo salió mal. 😅'});
  }
}