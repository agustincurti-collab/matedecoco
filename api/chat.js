export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'Falta el mensaje' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Eres Mate de Coco Bot, amigable y profesional, ayudas a crear sitios web y das consejos copados.' },
          ...history,
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      res.status(200).json({ answer: data.choices[0].message.content });
    } else if (data?.error) {
      console.error('OpenAI error:', data.error);
      res.status(500).json({ answer: 'Error de OpenAI: ' + (data.error.message || 'sin mensaje') });
    } else {
      console.error('Respuesta inesperada de OpenAI:', data);
      res.status(500).json({ answer: 'Ups, respuesta inesperada de OpenAI 😅' });
    }

  } catch (err) {
    console.error('Error en handler:', err);
    res.status(500).json({ answer: 'Ups, algo salió mal 😅' });
  }
}
