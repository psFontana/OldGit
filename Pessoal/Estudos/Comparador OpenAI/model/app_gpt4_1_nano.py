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
        model="gpt-4.1-nano",
        messages=[
            {
                "role": "system",
                "content": "Você é o modelo GPT-4.1-nano. Seja direto e objetivo.",
            },
            {"role": "user", "content": mensagem.prompt},
        ],
        max_completion_tokens=300,
    )

    fim = time.time()

    return {
        "modelo": "gpt-4.1-nano",
        "resposta": response.choices[0].message.content.strip(),
        "tempo_resposta": round(fim - inicio, 3),
    }
