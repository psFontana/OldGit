import styles from "./styles.module.css"

export default function ProfileSection (props) {
    return (
        <div {...props} className={` ${props.className} + ${styles.wrapper}`}>
            {props.children}
        </div>
    )
}