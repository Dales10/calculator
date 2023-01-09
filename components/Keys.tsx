import styles from '../styles/keys.module.scss';
import { useState } from 'react';

type KeysProps = {
    print: (values: string[], result: number) => void;
    message: () => void;
}

const Keys = ({ print, message }: KeysProps) => {
    const [values, setValues] = useState<string[]>([]);
    const [newCalculation, setNewCalculation] = useState(false);
    let result: number = NaN;

    const update = () => {
        print(values, result);
    };

    //Adiciona novos valores no cálculo e no Display.
    const valueIsNumber = () => {
        return values[values.length - 1];
    }
    const add = (value: string) => {
        //Quando o primeiro valor do novo cálculo for feito, resetar o array de 'values'.
        if (newCalculation) {
            setNewCalculation(false);
            values.length = 0;
        }
        const newValues = values;
        //Caso o último valor adicionado e o atual sejam ambos algum dos caracteres abaixo, trocará o anterior pelo atual no cálculo.
        const lastValueAdd = ["/", "*", "-", "+"].some(elem => {
            return valueIsNumber() == elem;
        });
        const valueAddNow = ["/", "*", "-", "+"].some(elem => {
            return value == elem;
        });
        if (lastValueAdd && valueAddNow) {
            newValues.pop();
        }

        if (value == '(') {
            //Fecha o parêntese que estiver aberto e antes dele tiver um número.
            for (let loop = values.length - 1; loop != 0; loop--) {
                const numberFound = !isNaN(Number(newValues[loop])) && newValues[loop] != ')' && newValues[loop] != '(';
                if (numberFound) value = ')';
            }
            if (!isNaN(Number((valueIsNumber()))) && value != ')') {
                //Se um parêntese for aberto depois de um número, sem nenhum operador aritmético depois dele, será colocado o sinal de multiplicação antes do parêntese.
                newValues.push('*');
            }
        }

        //Caso seja colocado um parêntese e antes tenha outro, um sinal de multiplicação será adicionado.
        if (value == ')' && valueIsNumber() == ')') {
            newValues.push('*');
            value = '(';
        }

        newValues.push(value);

        //Troca o sinal do último valor adicionado. Se estiver positivo fica negativo, ou o inverso.
        if (value == '(-' && !isNaN(Number(values[values.length - 2]))) {
            if (newValues[newValues.length - 3] == '(-') {
                newValues.splice(newValues.length - 3, 1);
                newValues.pop();
            } else {
                newValues.splice(newValues.length - 2, 0, value);
                newValues.pop();
            }
        }

        const valueAfterRelatives = ['%', '/', '*'].some(elem => {
            return value == elem;
        });
        if (valueAfterRelatives && values[values.length - 2] == '(') {
            values.pop();
        }

        if (newValues.length == 1 && isNaN(Number(newValues[0]))) {
            //Se o primeiro valor digitado for qualquer caractere do array abaixo, ele não será aceito como primeiro valor.
            const firstValue = ["%", "/", "*", "-", "+"].some(elem => {
                return newValues[0] == elem;
            })
            if (firstValue) {
                newValues.pop();
                message();
            }
        }
        //console.log(newValues);
        setValues(newValues);
        update();
    };

    //Efetua o cálculo com base nos valores passados.
    const calculate = () => {
        var equation = '';
        for (let loop = 0; loop < values.length; loop++) {
            equation += values[loop];
        }
        if (values.includes('(-')) {
            const positionError = values.indexOf('(-');
            const number = values[positionError + 1];
            values.splice(positionError, 2, `(-${number})`);
            calculate();
        }

        //Se o último valor do cálculo não for válido, irá ativar a messagem de valor inválido.
        const lastValue = ["%", "/", "*", "-", "+", "0."].some(elem => {
            return elem == valueIsNumber();
        });

        try {
            if (!lastValue) {
                result = eval(equation);
            }
            update();
            setNewCalculation(true)
        } catch (err) {
            message();
        }
    };

    const resetAll = () => {
        values.length = 0;
        result = NaN;
        update();
    }

    return (
        <>
            <div className={styles.rowKeys}>
                <button onClick={resetAll}>c</button>
                <button onClick={() => add("(")}>()</button>
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
                <button onClick={() => add('(-')}>+/-</button>
                <button onClick={() => add("0")}>0</button>
                <button onClick={() => add("0.")}>,</button>
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