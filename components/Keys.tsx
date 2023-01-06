import { useState } from 'react';
import styles from '../styles/keys.module.scss';

type KeysProps = {
    equationData: (value: string) => void;
    resultData: (value: number | string) => void;
    clearDisplay: (value: string) => void;
}

const Keys = ({ equationData, resultData, clearDisplay }: KeysProps) => {
    const [values, setValues] = useState<string[]>([]);

    //Adiciona novos valores no cálculo e no Display.
    const add = (value: string) => {
        let newValues = values;

        //Caso o último valor adicionado e o atual sejam ambos algum dos caracteres abaixo, trocará o anterior pelo atual no cálculo.
        const lastValueAdd = ["%", "/", "*", "-", "+", "."].some(elem => {
            return newValues[newValues.length - 1] == elem;
        });
        const valueAddNow = ["%", "/", "*", "-", "+", "."].some(elem => {
            return value == elem;
        });
        if (lastValueAdd && valueAddNow) {
            newValues.pop();
        }
        newValues.push(value);

        //Se o primeiro valor digitado for qualquer caractere do array abaixo, ele não será aceito como primeiro valor.
        if (newValues.length == 1 && isNaN(Number(newValues[0]))) {
            const firstValue = ["%", "/", "*", "-", "+", "."].some(elem => {
                return values[0] == elem;
            })
            if (firstValue) {
                newValues.pop();
            }
            resultData("message invalid")
            resetDisplay();
        } else {
            if (value == "/") {
                value = "÷";
            } else if (value == "*") {
                value = "×";
            }
            equationData(value);
        }
        setValues(newValues);
    };

    //Efetua o cálculo com base nos valores passados.
    const calculate = () => {
        var equation = '';
        var result: number;
        for (let loop = 0; loop < values.length; loop++) {
            equation += values[loop];
        }

        //Se o último valor do cálculo não for válido, irá ativar a messagem de valor inválido.
        const lastValue = ["%", "/", "*", "-", "+", "."].some(elem => {
            return elem == values[values.length - 1];
        })

        if (lastValue) {
            result = NaN;
        } else {
            result = eval(equation);
        }
        resultData(result);
        setValues([]);
    };

    //Limpa o Display.
    const resetDisplay = () => {
        equationData('clear');
        resultData('');
    }

    return (
        <>
            <div className={styles.rowKeys}>
                <button onClick={() => resetDisplay()}>c</button>
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