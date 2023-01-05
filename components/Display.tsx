import styles from '../styles/display.module.scss';

type DisplayProps = {
    equation: string[];
    result: number;
}

const Display = ({ equation, result }: DisplayProps) => {
    return (
        <div className={styles.display}>
            <div className={styles.calculation}>
                {equation.map((elem: string) => {
                    return `${elem} `;
                })}
            </div>
            <div className={styles.result}>
                {result.toLocaleString('pt-br')}
            </div>
        </div>
    );
};

export default Display;