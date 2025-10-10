from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import json
from pathlib import Path
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv

DATA_PATH = Path("data/cursos.json")
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError(
        "OPENAI_API_KEY não está definida no ambiente ou no arquivo .env"
    )

client = OpenAI(api_key=api_key)


class Curso(BaseModel):
    nome: str
    descricao: str
    carga_horaria: int


class SugestaoDescricao(BaseModel):
    nome: str
    descricao_inicial: str = ""


app = FastAPI()


def carregar_cursos():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def salvar_cursos(cursos):
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(cursos, f, indent=4)


@app.get("/")
def home():
    return {"mensagem": "API do Catálogo de Cursos funcionando!"}


@app.get("/cursos")
def listar_cursos():
    return carregar_cursos()


@app.get("/cursos/{curso_id}")
def obter_curso(curso_id: int):
    cursos = carregar_cursos()
    for curso in cursos:
        if curso["id"] == curso_id:
            return JSONResponse(content=curso)
    raise HTTPException(status_code=404, detail="Curso não encontrado")


@app.patch("/cursos/{curso_id}")
def atualizar_curso(curso_id: int, atualizacao: Curso):
    cursos = carregar_cursos()
    for curso in cursos:
        if curso["id"] == curso_id:
            if atualizacao.nome != "" and atualizacao.nome != "string":
                curso["nome"] = atualizacao.nome
            if atualizacao.descricao and atualizacao.descricao != "string":
                curso["descricao"] = atualizacao.descricao
            if atualizacao.carga_horaria != 0:
                curso["carga_horaria"] = atualizacao.carga_horaria
            salvar_cursos(cursos)
            return JSONResponse(content=curso)
    raise HTTPException(status_code=404, detail="Curso não encontrado")


@app.post("/cursos")
def adicionar_curso(curso: Curso):

    cursos = carregar_cursos()
    # em JS seria:
    # const novoId = cursos.length ? Math.max(...cursos.map(curso => curso.id)) + 1 : 1;
    novo_id = max(curso["id"] for curso in cursos) + 1 if cursos else 1
    novo_curso = {
        "id": novo_id,
        "nome": curso.nome,
        "descricao": curso.descricao,
        "carga_horaria": curso.carga_horaria,
    }
    cursos.append(novo_curso)
    salvar_cursos(cursos)
    return JSONResponse(content=novo_curso)


@app.delete("/cursos/{curso_id}")
def deletar_curso(curso_id: int):
    cursos = carregar_cursos()
    for i, curso in enumerate(cursos):
        if curso["id"] == curso_id:
            del cursos[i]
            salvar_cursos(cursos)
            return JSONResponse(content={"mensagem": "Curso deletado com sucesso"})
    raise HTTPException(status_code=404, detail="Curso não encontrado")


@app.post("/sugerir_descricao")
def sugerir_descricao_request(sugestao: SugestaoDescricao):
    if not sugestao.nome:
        raise HTTPException(status_code=400, detail="Nome do curso é obrigatório.")

    prompt = (
        f"Você é um especialista em criar descrições de cursos online. "
        f'Baseado no nome do curso: "{sugestao.nome}",'
        + (
            f' e na descrição inicial (se houver): "{sugestao.descricao_inicial}",'
            if sugestao.descricao_inicial
            else ""
        )
        + """

Gere uma descrição detalhada, persuasiva e otimizada para um catálogo de cursos. Inclua:
- O que o aluno aprenderá.
- Habilidades adquiridas.
- Por que é útil (benefícios).
- Mantenha em 3-5 frases, em português brasileiro, e foque em engajar o público iniciante ou intermediário.

Exemplo de saída: "Neste curso de [Nome], você mergulhará nos fundamentos de [tema], aprendendo [habilidades]. Ao final, estará pronto para [aplicação prática]. Ideal para quem quer [benefício]!"
"""
    )

    print("Prompt enviado para a API:", prompt)
    print(sugestao.nome)
    print(sugestao.descricao_inicial)

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {
                    "role": "system",
                    "content": "Você é um redator de descrições de cursos criativo e profissional.",
                },
                {"role": "user", "content": prompt},
            ],
            max_completion_tokens=200,
        )

        descricao_sugerida = response.choices[0].message.content.strip()
        print("Descrição sugerida:", descricao_sugerida)
        print(response)

        return JSONResponse(content={"descricao_sugerida": descricao_sugerida})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar sugestão: {str(e)}")
