import chainlit as cl
import json
import os
import requests
from openai import OpenAI
from pydantic import BaseModel
from typing import Optional, Literal


API_URL = "http://127.0.0.1:8000"
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class InterpretacaoMensagem(BaseModel):
    acao: Literal[
        "listar",
        "criar",
        "atualizar",
        "deletar",
        "recomendar",
        "detalhar",
        "desconhecida",
    ]
    id: Optional[int] = None
    nome: Optional[str] = None
    descricao: Optional[str] = None
    carga_horaria: Optional[int] = None


# Response:
# def interpretar_mensagem(texto: str):
#     prompt = f"""
#     O usuário digitou: "{texto}".
#     Analise e retorne um JSON puro (sem explicações, texto extra ou comentários)
#     com a intenção e os dados detectados.

#     Sempre inclua todas as chaves no JSON, mesmo que o valor seja null.
#     Formato obrigatório:
#     {{
#         "acao": "listar" | "criar" | "atualizar" | "deletar" | "recomendar" | "detalhar",
#         "nome": <nome do curso ou null>,
#         "descricao": <descricao do curso ou null>,
#         "carga_horaria": <int ou null>,
#         "id": <int ou null>
#     }}
#     """

#     response = client.chat.completions.create(
#         model="gpt-4.1-nano",
#         messages=[
#             {
#                 "role": "system",
#                 "content": (
#                     "Você é um assistente que responde exclusivamente com um JSON puro. "
#                     "Nunca escreva texto explicativo. "
#                     "Sempre inclua todas as chaves no formato solicitado, mesmo que o valor seja null."
#                 ),
#             },
#             {"role": "user", "content": prompt},
#         ],
#         max_completion_tokens=200,
#     )

#     conteudo = response.choices[0].message.content.strip()

#     print("\n=== JSON retornado pelo modelo ===")
#     print(conteudo)
#     print("=================================\n")

#     try:
#         dados = json.loads(conteudo)
#         return dados
#     except Exception as e:
#         print("⚠️ Erro ao interpretar JSON:", e)
#         return {"acao": "desconhecida"}


# Biblioteca openai
def interpretar_mensagem(texto: str) -> InterpretacaoMensagem:
    response = client.chat.completions.parse(
        model="gpt-4.1-nano",
        messages=[
            {
                "role": "system",
                "content": (
                    "Você é um analisador de comandos em linguagem natural. "
                    "Dada a entrada do usuário, identifique a intenção (ação) e os dados mencionados. "
                    "A ação deve ser uma das seguintes: listar, criar, atualizar, deletar, recomendar, detalhar. "
                    "Se não for possível identificar, use 'desconhecida'."
                ),
            },
            {"role": "user", "content": texto},
        ],
        response_format=InterpretacaoMensagem,
    )
    print("\n=== Objeto retornado pelo modelo ===")
    dados = response.choices[0].message.parsed
    dados.descricao = texto if dados.acao == "recomendar" else dados.descricao
    print(dados)
    return dados


def executar_acao(dados: InterpretacaoMensagem) -> str:
    # acao = dados.acao -> Request
    acao = dados.acao

    if acao == "listar":
        r = requests.get(f"{API_URL}/cursos")
        if r.status_code == 200:
            cursos = r.json()
            if cursos:
                texto = "\n".join(
                    f"📘 {c['id']}: {c['nome']} - ({c['carga_horaria']}h)"
                    for c in cursos
                )
                return f"Encontrei estes cursos:\n{texto}"
            return "Nenhum curso cadastrado ainda."
        return "Erro ao listar cursos: " + r.text

    elif acao == "criar":
        nome = dados.nome or "Curso sem nome"
        descricao = dados.descricao or ""

        if not descricao.strip():
            r_desc = requests.post(
                f"{API_URL}/sugerir_descricao",
                json={"nome": nome, "descricao_inicial": ""},
            )
            if r_desc.status_code == 200:
                descricao = r_desc.json().get("descricao_sugerida", "Sem descrição.")
            else:
                descricao = f"Sem descrição. Erro ao recomendar: {r_desc.text}"

        payload = {
            "nome": nome,
            "descricao": descricao,
            "carga_horaria": dados.carga_horaria or 0,
        }

        r = requests.post(f"{API_URL}/cursos", json=payload)
        if r.status_code == 200:
            return f"✅ Curso '{nome}' criado com sucesso!"
        return "Erro ao adicionar curso: " + r.text

    elif acao == "deletar":
        curso_id = dados.id
        if not curso_id:
            return "Preciso do ID do curso para remover."
        r = requests.delete(f"{API_URL}/cursos/{curso_id}")
        if r.status_code == 200:
            return f"🗑️ Curso {curso_id} removido com sucesso!"
        return "Erro ao remover curso: " + r.text

    elif acao == "atualizar":
        curso_id = dados.id
        if not curso_id:
            return "Preciso do ID do curso para atualizar."

        payload = {
            "nome": dados.nome or "",
            "descricao": dados.descricao or "",
            "carga_horaria": dados.carga_horaria or 0,
        }

        r = requests.patch(f"{API_URL}/cursos/{curso_id}", json=payload)
        if r.status_code == 200:
            return f"✏️ Curso {curso_id} atualizado com sucesso!"
        return "Erro ao atualizar curso: " + r.text

    elif acao == "recomendar":
        texto = dados.descricao or ""
        filtro = {
            "recomende",
            "curso",
            "sobre",
            "para",
            "programação",
            "ensina",
            "ensinar",
            "ensinará",
            "ensinará",
            "ensinar",
            "ensine",
            "ensina",
            "aprender",
            "aprenderá",
        }

        palavras_usuario = [
            p for p in texto.lower().split() if len(p) > 2 and p not in filtro
        ]

        print("Palavras do usuário para recomendação:", palavras_usuario)

        if not palavras_usuario:
            return (
                "Poderia me dar mais detalhes sobre o tipo de curso que você procura?"
            )

        r = requests.get(f"{API_URL}/cursos")
        if r.status_code != 200:
            return "Erro ao acessar os cursos para recomendação."

        cursos = r.json()
        recomendados = [
            c["nome"]
            for c in cursos
            if any(
                p in c["nome"].lower() or p in c["descricao"].lower()
                for p in palavras_usuario
            )
        ]

        if recomendados:
            return "📚 Recomendo estes cursos:\n" + "\n".join(
                f"- {c}" for c in recomendados
            )
        return "Hmm... não encontrei um curso que combine com seu interesse."

    elif acao == "detalhar":
        curso_id = dados.id
        if not curso_id:
            return "Por favor, informe o ID do curso que deseja visualizar."

        r = requests.get(f"{API_URL}/cursos/{curso_id}")
        if r.status_code == 200:
            curso = r.json()
            return (
                f"📘 **{curso['nome']}**\n"
                f"🕒 Carga horária: {curso['carga_horaria']} horas\n"
                f"📝 Descrição: {curso['descricao']}"
            )
        return "Não encontrei um curso com esse ID."

    else:
        return (
            "Desculpe, não entendi o que deseja fazer. "
            "Tente algo como:\n"
            "- 'Liste os cursos'\n"
            "- 'Crie um curso de Python iniciante com 40 horas'\n"
            "- 'Mostre o curso 2'\n"
            "- 'Recomende um curso sobre React'"
        )


@cl.on_chat_start
async def start():
    await cl.Message(
        content=(
            "Olá 👋 Sou o assistente do catálogo de cursos!\n"
            "Posso criar, listar, atualizar, excluir ou sugerir cursos para você.\n\n"
            "Exemplos:\n"
            "- 'Cadastre um curso de Python com 30 horas'\n"
            "- 'Liste os cursos disponíveis'\n"
            "- 'Atualize o curso 1 para ter 50 horas'\n"
            "- 'Apague o curso com ID 2'\n"
            "- 'Recomende um curso sobre Data Science'"
        )
    ).send()


@cl.on_message
async def processar(msg: cl.Message):
    texto = msg.content.strip()
    await cl.Message(content="⏳ Processando sua solicitação...").send()

    dados = interpretar_mensagem(texto)
    ultimo_curso = cl.user_session.get("ultimo_curso")

    # Guarda o último curso criado para atualizações contextuais
    if dados.acao == "criar" and dados.nome:
        cl.user_session.set("ultimo_curso", dados.nome)

    elif dados.acao == "atualizar" and not dados.id:
        if ultimo_curso:
            cursos = requests.get(f"{API_URL}/cursos").json()
            for c in cursos:
                if ultimo_curso.lower() in c["nome"].lower():
                    dados["id"] = c["id"]
                    break

    resposta = executar_acao(dados)
    await cl.Message(content=resposta).send()
