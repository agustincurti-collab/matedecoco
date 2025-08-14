# Mate de Coco Bot – IA (Vercel)

Proyecto listo para deploy con **chat de IA + WhatsApp** sin servidor local.

## Estructura
```
/index.html         -> Chat con diseño negro, llama a /api/chat
/api/chat.js        -> Endpoint serverless en Vercel que llama a OpenAI
```

## Deploy rápido en Vercel
1. Subí este repo a GitHub.
2. Entra a https://vercel.com -> New Project -> Importa tu repo.
3. En Settings -> Environment Variables agrega:
   - `OPENAI_API_KEY` = tu clave de OpenAI
4. Deploy. Tu sitio quedará en `https://TU-PROYECTO.vercel.app`

## Probar
- Abre la URL del sitio y el chat.
- El frontend llama a `POST /api/chat` (misma URL origen).
- El botón **“Enviar lead a WhatsApp”** arma un resumen de los últimos mensajes y abre WhatsApp a `+54 3364686510`.

## Notas
- No hace falta `node-fetch` ni dependencias extra.
- Si ves “This Serverless Function has crashed”, revisa:
  - que `OPENAI_API_KEY` exista y no tenga espacios,
  - vuelve a **Redeploy**.
