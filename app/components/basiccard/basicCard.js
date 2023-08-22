import styles from './basiccard.module.css';

export default function BasicCard(props){
    return (
        <div className={`${styles.container} ${props.className}`}>
            <p className={styles.title}>{props.title}</p>
            <p className={styles.content}>{props.content}</p>
        </div>
    )
}