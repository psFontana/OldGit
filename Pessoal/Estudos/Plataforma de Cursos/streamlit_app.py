import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"

st.set_page_config(page_title="Gerenciador de Cursos", page_icon="🎓", layout="wide")

st.sidebar.title("📚 Navegação")
pagina = st.sidebar.selectbox(
    "Ir para:", ["Listar cursos", "Adicionar curso", "Remover curso"]
)

# ===== CSS global (cards, grid, dark/light compatível) =====
st.markdown(
    """
<style>
    .curso-card {
        background-color: var(--background-color, #ffffff);
        margin-bottom: 25px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        border-left: 6px solid #ff4b4b;
        transition: all 0.3s ease;
        height: 100%;
        max-width: 300px;
        max-height: 350px;
        overflow-y: auto;
        border-radius: 15px;
        background-color: #fff;
        padding: 15px;
    }
    .curso-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    .curso-titulo {
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 6px;
    }
    .curso-descricao {
        color: #555;
        font-size: 1.05rem;
        text-align: justify;
    }
    .curso-info {
        margin-top: 8px;
        color: #777;
        font-size: 0.9rem;
    }
</style>
""",
    unsafe_allow_html=True,
)

# ===== Página: Listar cursos =====
if pagina == "Listar cursos":
    st.header("📘 Lista de Cursos")

    if "mostrar_assistente" not in st.session_state:
        st.session_state["mostrar_assistente"] = False

    texto_botao = f"💬 {'Fechar' if st.session_state['mostrar_assistente'] else 'Abrir'} assistente de cursos"
    if st.button(texto_botao):
        st.session_state["mostrar_assistente"] = not st.session_state[
            "mostrar_assistente"
        ]
        st.rerun()

    if st.session_state["mostrar_assistente"]:
        st.markdown(
            """<iframe src="http://localhost:8502" height="600" style="border-radius: 16px; border: 1px solid #ccc; width: 100%;"></iframe>""",
            unsafe_allow_html=True,
        )

    response = requests.get(f"{API_URL}/cursos")
    if response.status_code != 200:
        st.error("Erro ao carregar cursos.")
    else:
        cursos = response.json()
        if not cursos:
            st.info("Nenhum curso cadastrado ainda.")
        else:
            tab_cards, tab_lista = st.tabs(
                ["📇 Visualizar em Cards", "📜 Visualizar em Lista"]
            )

            # ===== Modo Cards =====
            with tab_cards:
                cols = st.columns(4)
                for idx, curso in enumerate(cursos):
                    col = cols[idx % 4]
                    with col:
                        st.html(
                            f"""
                            <div class="curso-card">
                                <div class="curso-titulo">{curso['nome']}</div>
                                <div class="curso-info">⏱️ {curso['carga_horaria']} horas</div>
                                <div class="curso-descricao">{curso['descricao']}</div>
                            </div>
                            """,
                        )
                    if (idx + 1) % 4 == 0:
                        cols = st.columns(4)

            # ===== Modo Lista =====
            with tab_lista:
                for curso in cursos:
                    st.subheader(curso["nome"])
                    st.write(f"⏱️ {curso['carga_horaria']} horas")
                    st.write(f"📝 {curso['descricao']}")
                    st.divider()

# ===== Página: Adicionar curso =====
elif pagina == "Adicionar curso":
    st.header("➕ Adicionar novo curso")
    nome = st.text_input("Nome do curso")

    if "descricao" not in st.session_state:
        st.session_state["descricao"] = ""

    descricao = st.text_area(
        "Descrição",
        value=st.session_state["descricao"],
        height=None,
        max_chars=None,
        key=None,
        help="Digite o que você já imaginou, o assistente vai levar em consideração ;)",
        on_change=None,
        args=None,
        kwargs=None,
        placeholder="Digite o que você já pensou, o assistente vai levar em consideração ;)",
    )
    if st.button("💬 Recomendar descrição"):
        if nome:
            with st.spinner("Consultando o assistente..."):
                response = requests.post(
                    f"{API_URL}/sugerir_descricao",
                    json={"nome": nome, "descricao_inicial": descricao},
                )
                if response.status_code == 200:
                    st.session_state["descricao"] = response.json()[
                        "descricao_sugerida"
                    ]
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

# ===== Página: Remover curso =====
elif pagina == "Remover curso":
    st.header("🗑️ Remover curso")

    response = requests.get(f"{API_URL}/cursos")
    if response.status_code == 200:
        cursos = response.json()
        if not cursos:
            st.info("Nenhum curso cadastrado ainda.")
        else:
            with st.form("form_remover"):
                curso_id = st.number_input("ID do curso", min_value=1)
                submitted = st.form_submit_button("Remover")
                if submitted:
                    response = requests.delete(f"{API_URL}/cursos/{int(curso_id)}")
                    if response.status_code == 200:
                        st.success("Curso removido com sucesso!")
                    else:
                        st.error("Erro ao remover curso.")

            tab_cards, tab_lista = st.tabs(
                ["📇 Visualizar em Cards", "📜 Visualizar em Lista"]
            )

            # ===== Modo Cards =====
            with tab_cards:
                cols = st.columns(4)
                for idx, curso in enumerate(cursos):
                    col = cols[idx % 4]
                    with col:
                        st.markdown(
                            f"""
                            <div class="curso-card" style="margin-bottom: 10px;">
                                <div class="curso-titulo">{curso['nome']}</div>
                                <div class="curso-info">⏱️ {curso['carga_horaria']} horas | ID: {curso['id']}</div>
                                <div class="curso-descricao">{curso['descricao']}</div>
                            </div>
                            """,
                            unsafe_allow_html=True,
                        )
                        if st.button(
                            f"Remover {curso['nome']}",
                            key=f"remover_card_{curso['id']}",
                            help=None,
                            on_click=None,
                            args=None,
                            kwargs=None,
                            type="secondary",
                            icon=None,
                            disabled=False,
                            use_container_width=None,
                            width=300,
                        ):
                            response = requests.delete(
                                f"{API_URL}/cursos/{curso['id']}"
                            )
                            if response.status_code == 200:
                                st.success("Curso removido com sucesso!")
                                st.rerun()
                            else:
                                st.error("Erro ao remover curso.")
                    if (idx + 1) % 4 == 0:
                        cols = st.columns(4)

            with tab_lista:
                for curso in cursos:
                    col1, col2 = st.columns([4, 1])
                    with col1:
                        st.write(f"**ID:** {curso['id']} - **{curso['nome']}**")
                    with col2:
                        if st.button(
                            f"Remover {curso['nome']}",
                            key=f"remover_lista_{curso['id']}",
                            help=None,
                            on_click=None,
                            args=None,
                            kwargs=None,
                            type="secondary",
                            icon=None,
                            disabled=False,
                            use_container_width=None,
                            width=300,
                        ):
                            requests.delete(f"{API_URL}/cursos/{curso['id']}")
                            st.rerun()
    else:
        st.error("Erro ao carregar cursos.")
