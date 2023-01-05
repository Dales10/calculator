import styles from '../styles/body.module.scss';
import Display from "./Display";
import Keys from "./Keys";
import { useState } from 'react';

const Body = () => {
    const [equation, setEquation] = useState<string[]>([]);
    const [result, setResult] = useState<number>(0);
    const [messageInvalid, setMessageInvalid] = useState({ opacity: 0 });

    const equationData = (value: string) => {
        const arrayEquation = equation;
        arrayEquation.push(value);
        setEquation(arrayEquation);
    };

    const resultData = (value: number) => {
        setResult(value);
    };

    if (isNaN(result)) {
        setMessageInvalid({ opacity: 1 })
        setResult(0);
        setTimeout(() => {
            setMessageInvalid({ opacity: 0 })
        }, 1000);
    }

    return (
        <div className={styles.body}>
            <Display equation={equation} result={result} />
            <Keys equationData={equationData} resultData={resultData} />

            <div style={messageInvalid} className={styles.messageInvalid}>
                <p>Valor inválido</p>
            </div>
        </div>
    );
};

export default Body;