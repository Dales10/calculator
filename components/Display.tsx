import styles from '../styles/display.module.scss';
import { useEffect, useState } from 'react';

type DisplayProps = {
    equation: string;
    result: number | string;
}

const Display = ({ equation, result}: DisplayProps) => {
    //Responsável por armazenar os valores inseridos em um array para manipulação.
    const [arrayEquation, setArrayEquation] = useState<string[]>([]);
    //Responsável por armazenar a string do cálculo que será ixibida no Display.
    const [stringEquation, setStringEquation] = useState('');

    useEffect(() => {
        if (equation == 'clear') {
            //Limpa o Display.
            setArrayEquation([]);
            setStringEquation('');
        } else {
            //Cria o array com os valores passados.
            const newArray = arrayEquation;
            if (isNaN(Number(newArray[newArray.length - 1])) && isNaN(Number(equation))) {
                newArray.pop();
            }
            newArray.push(equation);
            setArrayEquation(newArray);

            //Cria a string do cálculo.
            let printEquation = '';
            arrayEquation.forEach((elem: string) => {
                printEquation += `${elem} `;
            })
            setStringEquation(printEquation);
        }

    }, [equation]);

    return (
        <div className={styles.display}>
            <div className={styles.calculation}>
                {stringEquation}
            </div>
            <div className={styles.result}>
                {result.toLocaleString('pt-br')}
            </div>
        </div>
    );
};

export default Display;