import styles from '../styles/body.module.scss';
import Display from "./Display";
import Keys from "./Keys";
import { useState } from 'react';

const Body = () => {
    const [equation, setEquation] = useState<string>('');
    const [result, setResult] = useState<number | string>('');
    const [clear, setClear] = useState('');
    const [messageInvalid, setMessageInvalid] = useState({ opacity: 0 });

    const equationData = (value: string) => {
        setEquation(value);
    };

    const resultData = (value: number | string) => {
        setResult(value);
    };

    const clearDisplay = (value: string) => {
        setClear(value);
    }

    if (isNaN(Number(result))) {
        setMessageInvalid({ opacity: 1 })
        setResult("");
        setTimeout(() => {
            setMessageInvalid({ opacity: 0 })
        }, 1000);
    }

    return (
        <div className={styles.body}>
            <Display equation={equation} result={result}  />
            <Keys equationData={equationData} resultData={resultData} clearDisplay={clearDisplay} />

            <div style={messageInvalid} className={styles.messageInvalid}>
                <p>Formato usado inválido.</p>
            </div>
        </div>
    );
};

export default Body;