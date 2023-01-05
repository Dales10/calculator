import styles from '../styles/body.module.scss';
import Display from "./Display";
import Keys from "./Keys";
import { useState } from 'react';

const Body = () => {
    const [result, setResult] = useState<number>(0);
    const [messageInvalid, setMessageInvalid] = useState({ opacity: 0 })

    const data = (value: number) => {
        setResult(value);
    }

    if (isNaN(result)) {
        setMessageInvalid({ opacity: 1 })
        setResult(0);
        setTimeout(() => {
            setMessageInvalid({ opacity: 0 })
        }, 1000);
    }

    return (
        <div className={styles.body}>
            <Display result={result} />
            <Keys data={data} />

            <div style={messageInvalid} className={styles.messageInvalid}>
                <p>Valor inválido</p>
            </div>
        </div>
    );
};

export default Body;