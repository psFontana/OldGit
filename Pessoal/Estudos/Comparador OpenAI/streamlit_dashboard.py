import streamlit as st
import requests
import time

st.set_page_config(layout="wide", page_title="Comparador de Modelos OpenAI")

st.title("🤖 Comparador de Modelos OpenAI")
st.write(
    "Compare lado a lado as respostas dos modelos GPT-5-nano, GPT-4.1-nano e GPT-4o-mini."
)

# URLs das APIs
MODELOS = {
    "GPT-5-nano": "http://127.0.0.1:8001/chat",
    "GPT-4.1-nano": "http://127.0.0.1:8002/chat",
    "GPT-4o-mini": "http://127.0.0.1:8003/chat",
}

prompt = st.text_area(
    "🗣️ Pergunta:", placeholder="Digite aqui sua pergunta para os três modelos..."
)

if st.button("Enviar para todos os modelos 🚀"):
    if not prompt.strip():
        st.warning("Digite uma pergunta primeiro!")
    else:
        col1, col2, col3 = st.columns(3)

        with st.spinner("Consultando modelos..."):
            respostas = {}
            tempos = {}
            for nome, url in MODELOS.items():
                inicio = time.time()
                try:
                    resp = requests.post(url, json={"prompt": prompt}, timeout=30)
                    data = resp.json()
                    respostas[nome] = data.get("resposta", "Erro ao gerar resposta.")
                    tempos[nome] = data.get(
                        "tempo_resposta", round(time.time() - inicio, 2)
                    )
                except Exception as e:
                    respostas[nome] = f"❌ Erro: {e}"
                    tempos[nome] = None

        # Exibir resultados lado a lado
        for col, nome in zip((col1, col2, col3), MODELOS.keys()):
            col.subheader(f"🤖 {nome}")
            if tempos[nome] is not None:
                col.caption(f"⏱️ {tempos[nome]} segundos")
            col.write(respostas[nome])
