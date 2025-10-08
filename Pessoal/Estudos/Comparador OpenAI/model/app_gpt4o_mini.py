from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import time
import os

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class Mensagem(BaseModel):
    prompt: str


@app.post("/chat")
def chat(mensagem: Mensagem):
    inicio = time.time()

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Você é o modelo GPT-4o-mini. Seja direto e objetivo.",
            },
            {"role": "user", "content": mensagem.prompt},
        ],
        stream=False,
        max_completion_tokens=300,
    )

    fim = time.time()

    return {
        "modelo": "gpt-4o-mini",
        "resposta": response.choices[0].message.content.strip(),
        "tempo_resposta": round(fim - inicio, 3),
    }
