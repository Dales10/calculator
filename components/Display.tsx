import styles from '../styles/display.module.scss';

type DisplayProps = {
    datas: {
        equation: string[];
        result: string;
        resultColor: { color: string };
    }
}

const Display = ({ datas }: DisplayProps) => {
    let formattedCalculation = (datas.equation.reduce((values, value) => {
        return values += value;
    }, '')).replaceAll('.', ',');

    return (
        <div className={styles.display}>
            <div style={{ color: '#e1e8f8' }} className={styles.calculation}>
                {formattedCalculation}
            </div>
            <div style={datas.resultColor} className={styles.result}>
                {datas.result.toString().replace('.', ',')}
            </div>
        </div>
    );
};

export default Display;