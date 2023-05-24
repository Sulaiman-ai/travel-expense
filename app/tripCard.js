import styles from './tripcard.module.css';
import { useRouter } from 'next/navigation';

export default function TripCard (props){
    const router = useRouter();

    const handleClick = () => {
        router.push(`/dashboard/${props.id}`)
    };

    return (
        <div onClick={handleClick} className={styles.container}>
            <h2>{props.location}</h2>
            <p>{props.budget}</p>
        </div>
    )
}