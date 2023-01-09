import styles from '../styles/display.module.scss';

type DisplayProps = {
    datas: {
        equation: string[];
        result: number;
    }
}

const Display = ({ datas }: DisplayProps) => {
    const formattedCalculation = datas.equation.reduce((values, value) => {
        return values += value;
    }, '');

    const result = () => {
        if (isNaN(datas.result)) {
            return '';
        } else {
            return datas.result;
        }
    };


    return (
        <div className={styles.display}>
            <div className={styles.calculation}>
                {formattedCalculation}
            </div>
            <div className={styles.result}>
                {result()}
            </div>
        </div>
    );
};

export default Display;