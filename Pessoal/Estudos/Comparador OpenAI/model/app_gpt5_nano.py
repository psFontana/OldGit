from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import time
import os

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), timeout=120)


class Mensagem(BaseModel):
    prompt: str


@app.post("/chat")
def chat(mensagem: Mensagem):
    inicio = time.time()

    response = client.chat.completions.create(
        # Definindo o modelo GPT-5-nano (obrigatório)
        model="gpt-5-nano",  # ID do modelo que será usado para gerar a resposta
        messages=[
            {
                "role": "system",
                "content": "Você é o modelo GPT-5-nano. Seja direto e objetivo.",  # Mensagem de sistema que define o comportamento do modelo
            },
            {
                "role": "user",
                "content": mensagem.prompt,  # Entrada do usuário que será interpretada pelo modelo
            },
        ],
        max_completion_tokens=300,  # Limite máximo de tokens que o modelo pode gerar na resposta
        # temperature=1.0,  # Grau de aleatoriedade da resposta (0 = determinístico, 2 = criativo). Valores muito altos podem gerar respostas incoerentes.
        # store=False,  # Default = true; Define se a resposta deve ser armazenada para uso posterior via API
        # previous_response_id=None,  # ID da resposta anterior, útil para manter contexto em conversas multi-turn (ID armazenado no servidor da OpenAI, graças ao atributo store=true)
        # stream=False,  # Se True, a resposta será transmitida em tempo real (streaming via SSE) (não gerar completamente antes de entregar resposta)
        # parallel_tool_calls=True,  # Permite que o modelo execute múltiplas chamadas de ferramentas em paralelo (ex: Me diga o clima em São Paulo, Curitiba e Recife -> A consulta seria feita de maneira paralela)
        # reasoning={  # Configurações específicas para modelos com capacidade de raciocínio (gpt-5 e o-series)
        #     "effort": "medium",  # Pode ser usado para ajustar o nível de esforço cognitivo do modelo
        #     "summary": "concise",  # Resumo do raciocínio, se desejado
        # },
        # text={  # Configurações para o tipo de saída textual (texto ou JSON)
        #     "format": {"type": "text"},  # Define que o retorno será texto simples
        #     "verbosity": "medium",  # Nível de detalhamento da resposta (low, medium, high)
        # },
        # tool_choice="auto",  # Permite ao modelo escolher automaticamente qual ferramenta usar (se houver)
        # tools=[],  # Lista de ferramentas disponíveis para o modelo (ex: web search, file search, funções customizadas)
        # metadata={},  # Dicionário opcional com até 16 pares chave-valor para rastrear informações adicionais
        # background=False,  # Se True, executa a resposta em segundo plano
    )
    fim = time.time()

    return {
        "modelo": "gpt-5-nano",
        "resposta": response.choices[0].message.content.strip(),
        "tempo_resposta": round(fim - inicio, 3),
    }
