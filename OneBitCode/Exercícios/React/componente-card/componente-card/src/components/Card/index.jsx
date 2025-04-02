import Button from "../Button"
import styles from  "./styles.module.css"

export default function Card ({title, img}) {
    return (
        <div className={styles.container}>
            <img className={styles.poster} src={img} alt="Poster Star Wars 1997" />
            <div>
                <h2>{title}</h2>
                <p>Um pôster decorativo épico do filme Star Wars, com moldura de MDF e tamanho A3. Uma otima recordaçao de um dos mais icônicos filmes de todos os tempos. Este clássico pôster trará aventura, nostalgia e a magia de Star Wars para qualquer lugar que voce decidir pendurar. Nao perca a chance de adicionar essa linda memória ao seu acervo!</p>
                <Button />
            </div>
        </div>
    )
}