import styles from '../styles/keys.module.scss';
import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';

type KeysProps = {
    print: (values: string[], result: string, origin: string) => void;
    message: (alertBigMessage?: string) => void;
}

const Keys = ({ print, message }: KeysProps) => {
    //Manipula um array com todos os valores válidos adicionados.
    const [values, setValues] = useState<string[]>([]);
    const [colorIcon, setColorIcon] = useState('#6d6d6d');
    let result: string = '';

    const update = (origin: string) => {
        print(values, result, origin);
    };

    //Adiciona novos valores no cálculo e no Display.
    const valueIsNumber = () => {
        return values[values.length - 1];
    }

    const add = (value: string) => {
        if (values.length == 19) {
            message('bigMessage');
        } else {
            setColorIcon('#FFFFFF');
            const newValues = values;
            //Caso o último valor adicionado e o atual sejam ambos algum dos caracteres abaixo, trocará o anterior pelo atual no cálculo.
            const lastValueAdd = ['/', '*', '-', '+'].some(elem => {
                return valueIsNumber() == elem;
            });
            const valueAddNow = ['/', '*', '-', '+'].some(elem => {
                return value == elem;
            });
            if (lastValueAdd && valueAddNow)
                newValues.pop();

            if (value == '(') {
                //Fecha o parêntese que estiver aberto e antes dele tiver um número.
                for (let loop = values.length - 1; loop > 0; loop--) {
                    const numberFound = !isNaN(Number(newValues[loop]));
                    //Caso o valor anterior seja um operador aritmético, não deve-se colocar um parêntese de fechamento.
                    const arithmeticSign = ['/', '*', '-', '+'].some(elem => {
                        return elem == newValues[loop];
                    })
                    if (arithmeticSign) break;
                    if (numberFound) value = ')';
                }
                //Se um parêntese for aberto depois de um número, sem nenhum operador aritmético depois dele, será colocado o sinal de multiplicação antes do parêntese.
                if (!isNaN(Number((valueIsNumber()))) && value != ')')
                    newValues.push('*');
            }
            //Caso seja colocado um parêntese e antes tenha outro, um sinal de multiplicação será adicionado.
            if (value == ')' && valueIsNumber() == ')') {
                let opening = 0, closure = 0;
                for (let loop = values.length - 1; loop >= 0; loop--) {
                    const arithmeticSign = ['/', '*', '-', '+'].some(elem => {
                        return elem == newValues[loop];
                    });
                    if (arithmeticSign) break;

                    if (newValues[loop] == ')')
                        closure++;
                    else if (newValues[loop] == '(')
                        opening++;
                }
                if (opening == closure) {
                    newValues.push('*');
                    value = '(';
                }
            }

            if (value == '(-' && !isNaN(Number(valueIsNumber()))) {
                let countNumbers = 0;
                for (let loop = values.length - 1; loop >= 0; loop--) {
                    if (!isNaN(Number(newValues[loop])))
                        countNumbers++;
                }
                if (newValues[newValues.length - (1 + countNumbers)] == '(-')
                    newValues.splice(newValues.length - (1 + countNumbers), 1);
                else
                    newValues.splice(newValues.length - countNumbers, 0, value);
                value = '';
            }

            if (value == '.') {
                let noNumber = false;
                for (let loop = values.length - 1; loop >= 0; loop--) {
                    if (isNaN(Number(values[loop])) && values[loop] != '.')
                        break;
                    else if (values[loop] == '.')
                        noNumber = true;
                }
                if (noNumber)
                    value = '';
                else if (!isNaN(Number(valueIsNumber)) && valueIsNumber() != '.')
                    newValues.push('0');
            }

            if (value != '') newValues.push(value);

            const valueAfterRelatives = ['/', '*'].some(elem => {
                return value == elem;
            });
            if (valueAfterRelatives && values[values.length - 2] == '(')
                values.pop();

            if (newValues.length == 1 && isNaN(Number(newValues[0]))) {
                //Se o primeiro valor digitado for qualquer caractere do array abaixo, ele não será aceito como primeiro valor.
                const firstValue = ["/", "*", "-", "+"].some(elem => {
                    return newValues[0] == elem;
                })
                if (firstValue) {
                    newValues.pop();
                    message();
                }
            }
            setValues(newValues);
            calculate('addValue')
        }
    };

    //Efetua o cálculo com base nos valores passados.
    const calculate = (origin: string) => {
        var equation = '';
        for (let loop = 0; loop < values.length; loop++)
            equation += values[loop];

        //Se o último valor do cálculo não for válido, irá ativar a messagem de valor inválido.
        const lastValue = ["/", "*", "-", "+", "0."].some(elem => {
            return elem == valueIsNumber();
        });

        //Coloca parênteses no final para fechar os que foram abertos mas não fechados.
        const countOpening = (equation.match(/\(/g) || []).length;
        const countClosure = (equation.match(/\)/g) || []).length;
        let difference = countOpening - countClosure;
        if (difference != 0) {
            while (difference) {
                equation += ")";
                difference--;
            }
        }

        try {
            if (!lastValue)
                result = eval(equation);
            else if (!isNaN(Number(equation)))
                result = equation;
            if (result.toString().length >= 11)
                result = Number(result).toExponential(3);
            update(origin);
            if (origin == 'btn') {
                const newValues = result.toString().split('');
                setValues(newValues);
            }
        } catch (err) {
            if (origin == 'btn') message();
        }
    };

    const resetAll = () => {
        setColorIcon('#6d6d6d');
        values.length = 0;
        result = '';
        update('');
    }

    const deleteValue = () => {
        const newValues = values;
        newValues.pop();
        setValues(newValues);
        if (values.length == 0) setColorIcon('#6d6d6d');
        update('');
    }

    return (
        <>
            <div className={styles.delete}>
                <FiDelete
                    color={colorIcon}
                    className={styles.btnDelete}
                    onClick={deleteValue}
                />
            </div>
            <div className={styles.rowKeys}>
                <button onClick={(e) => { resetAll(); e.currentTarget.blur(); }}>c</button>
                <button onClick={(e) => { add('(-'); e.currentTarget.blur(); }}>+/-</button>
                <button onClick={(e) => { add("("); e.currentTarget.blur(); }}>()</button>
                <button
                    className={styles.operations}
                    onClick={(e) => { add("/"); e.currentTarget.blur(); }}
                >
                    ÷
                </button>
            </div>
            <div className={styles.rowKeys}>
                <button onClick={(e) => { add("7"); e.currentTarget.blur(); }}>7</button>
                <button onClick={(e) => { add("8"); e.currentTarget.blur(); }}>8</button>
                <button onClick={(e) => { add("9"); e.currentTarget.blur(); }}>9</button>
                <button
                    className={styles.operations}
                    onClick={(e) => { add("*"); e.currentTarget.blur(); }}
                >
                    ×
                </button>
            </div>
            <div className={styles.rowKeys}>
                <button onClick={(e) => { add("4"); e.currentTarget.blur(); }}>4</button>
                <button onClick={(e) => { add("5"); e.currentTarget.blur(); }}>5</button>
                <button onClick={(e) => { add("6"); e.currentTarget.blur(); }}>6</button>
                <button
                    className={styles.operations}
                    onClick={(e) => { add("-"); e.currentTarget.blur(); }}
                >
                    -
                </button>
            </div>
            <div className={styles.rowKeys}>
                <button onClick={(e) => { add("1"); e.currentTarget.blur(); }}>1</button>
                <button onClick={(e) => { add("2"); e.currentTarget.blur(); }}>2</button>
                <button onClick={(e) => { add("3"); e.currentTarget.blur(); }}>3</button>
                <button
                    className={styles.operations}
                    onClick={(e) => { add("+"); e.currentTarget.blur(); }}
                >
                    +
                </button>
            </div>
            <div className={styles.rowKeys}>
                <button disabled className={styles.disabled}>⠀</button>
                <button onClick={(e) => { add("0"); e.currentTarget.blur(); }}>0</button>
                <button onClick={(e) => { add("."); e.currentTarget.blur(); }}>,</button>
                <button
                    className={`${styles.operations} ${styles.equal}`}
                    onClick={(e) => { calculate('btn'); e.currentTarget.blur(); }}
                >
                    =
                </button>
            </div>
        </>
    );
};

export default Keys;