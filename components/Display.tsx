import styles from '../styles/display.module.scss';

type DisplayProps = {
    result: number;
}

const Display = ({ result }: DisplayProps) => {
    return (
        <div className={styles.display}>
            <div className={styles.calculation}>
                0
            </div>
            <div className={styles.result}>
                {result.toLocaleString('pt-br')}
            </div>
        </div>
    );
};

export default Display;