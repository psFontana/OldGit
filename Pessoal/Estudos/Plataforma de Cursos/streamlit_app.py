import streamlit as st
import requests
import subprocess

API_URL = "http://127.0.0.1:8000"

st.sidebar.title("📚 Navegação")
pagina = st.sidebar.selectbox(
    "Ir para:", ["Listar cursos", "Adicionar curso", "Remover curso"]
)

if pagina == "Listar cursos":
    st.header("Lista de cursos")
    if "mostrar_assistente" not in st.session_state:
        st.session_state["mostrar_assistente"] = False

    texto_botao = f"💬 {"Fechar" if st.session_state["mostrar_assistente"] else "Abrir"} assistente de cursos"

    if st.button(texto_botao):
        st.session_state["mostrar_assistente"] = not st.session_state[
            "mostrar_assistente"
        ]
        st.rerun()

    # Mostra o chatbot se o estado for verdadeiro
    if st.session_state["mostrar_assistente"]:
        st.markdown(
            """
            <iframe src="http://localhost:8502?" height="600" style="border-radius: 16px; border: 1px solid #ccc; width: 100%;"></iframe>
            """,
            unsafe_allow_html=True,
        )

    response = requests.get(f"{API_URL}/cursos")
    if response.status_code == 200:
        for curso in response.json():
            st.subheader(curso["nome"])
            st.write(f"📝 {curso['descricao']}")
            st.write(f"⏱️ {curso['carga_horaria']} horas")
            st.divider()
    else:
        st.error("Erro ao carregar cursos.")

elif pagina == "Adicionar curso":
    st.header("Adicionar novo curso")
    nome = st.text_input("Nome do curso")

    if "descricao" not in st.session_state:
        st.session_state["descricao"] = ""

    descricao = st.text_area("Descrição", value=st.session_state["descricao"])
    if st.button("💬 Recomendar descrição"):
        if nome:
            with st.spinner("Consultando o assistente..."):
                response = requests.post(
                    f"{API_URL}/sugerir_descricao",
                    json={"nome": nome, "descricao_inicial": descricao},
                )
                if response.status_code == 200:
                    descricao_sugerida = response.json()["descricao_sugerida"]
                    st.session_state["descricao"] = descricao_sugerida
                    st.success("Descrição sugerida com sucesso!")
                    st.rerun()
                else:
                    st.error(f"Erro na API: {response.text}")
        else:
            st.warning("Por favor, insira o nome do curso para obter uma sugestão.")

    carga_horaria = st.number_input("Carga horária", min_value=1)
    with st.form("form_adicionar"):
        submitted = st.form_submit_button("Adicionar curso")
        if submitted:
            if nome and descricao and carga_horaria:
                response = requests.post(
                    f"{API_URL}/cursos",
                    json={
                        "nome": nome,
                        "descricao": descricao,
                        "carga_horaria": int(carga_horaria),
                    },
                )
                if response.status_code == 200:
                    st.session_state["descricao"] = ""
                    st.success("Curso adicionado com sucesso!")
                else:
                    st.error("Erro ao adicionar curso.")
            else:
                st.warning("Por favor, preencha todos os campos.")

elif pagina == "Remover curso":
    st.header("Remover curso")
    with st.form("form_remover"):
        curso_id = st.number_input("ID do curso", min_value=1)
        submitted = st.form_submit_button("Remover")
        if submitted:
            response = requests.delete(f"{API_URL}/cursos/{int(curso_id)}")
            if response.status_code == 200:
                st.success("Curso removido com sucesso!")
            else:
                st.error("Erro ao remover curso.")
    for curso in requests.get(f"{API_URL}/cursos").json():
        st.write(f"ID: {curso['id']} - {curso['nome']}")
        remover = st.button(f"Remover {curso['nome']}", key=f"remover_{curso['id']}")
        if remover:
            response = requests.delete(f"{API_URL}/cursos/{curso['id']}")
            st.rerun()
            if response.status_code == 200:
                st.success("Curso removido com sucesso!")
            else:
                st.error("Erro ao remover curso.")
