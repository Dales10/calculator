import { useState } from 'react';
import styles from '../styles/keys.module.scss';

type KeysProps = {
    data: (result: number) => void;
}

const Keys = ({ data }: KeysProps) => {
    const [values, setValues] = useState<string[]>([]);

    const add = (value: string) => {
        let newValues = values;
        newValues.push(value)
        setValues(newValues)
    };

    const calculate = () => {
        var equation = '';
        var result: number;
        for (let loop = 0; loop < values.length; loop++) {
            equation += values[loop];
        }

        const validation = ["%", "/", "*", "-", "+", "."].some(elem => {
            return elem == values[values.length - 1];
        })

        if (validation) {
            result = NaN
        } else {
            result = eval(equation);
        }
        data(result);
        setValues([]);
    };

    return (
        <>
            <div className={styles.rowKeys}>
                <button>c</button>
                <button>+/-</button>
                <button onClick={() => add("%")}>%</button>
                <button
                    className={styles.operations}
                    onClick={() => add("/")}
                >
                    ÷
                </button>
            </div>
            <div className={styles.rowKeys}>
                <button onClick={() => add("7")}>7</button>
                <button onClick={() => add("8")}>8</button>
                <button onClick={() => add("9")}>9</button>
                <button
                    className={styles.operations}
                    onClick={() => add("*")}
                >
                    ×
                </button>
            </div>
            <div className={styles.rowKeys}>
                <button onClick={() => add("4")}>4</button>
                <button onClick={() => add("5")}>5</button>
                <button onClick={() => add("6")}>6</button>
                <button
                    className={styles.operations}
                    onClick={() => add("-")}
                >
                    -
                </button>
            </div>
            <div className={styles.rowKeys}>
                <button onClick={() => add("1")}>1</button>
                <button onClick={() => add("2")}>2</button>
                <button onClick={() => add("3")}>3</button>
                <button
                    className={styles.operations}
                    onClick={() => add("+")}
                >
                    +
                </button>
            </div>
            <div className={styles.rowKeys}>
                <button className={styles.inactive}>ㅤ</button>
                <button onClick={() => add("0")}>0</button>
                <button onClick={() => add(".")}>,</button>
                <button
                    className={`${styles.operations} ${styles.equal}`}
                    onClick={() => calculate()}
                >
                    =
                </button>
            </div>
        </>
    );
};

export default Keys;