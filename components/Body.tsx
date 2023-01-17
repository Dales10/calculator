import styles from '../styles/body.module.scss';
import Display from "./Display";
import Keys from "./Keys";
import { useState } from 'react';

type DatasProps = {
    equation: string[];
    result: string;
    resultColor: { color: string };
}

const Body = () => {
    const [datas, setDatas] = useState<DatasProps>({ equation: [], result: '', resultColor: { color: '#a1a1a1' } });
    const [messageInvalid, setMessageInvalid] = useState({ opacity: 0 });
    const [messageBig, setMessageBig] = useState({ opacity: 0 });

    const print = (values: string[], result: string, origin: string) => {
        let equation: string[] = values;
        let resultColor = { color: '#a1a1a1' };
        if (equation.includes('/') || equation.includes('*')) {
            equation = equation.map(value => {
                if (value == '/')
                    return value.replace('/', '÷');
                else if (value == '*')
                    return value.replace('*', '×');
                else if (value == '.')
                    return value.replace('.', ',')
                return value;
            })
        }
        if (origin == 'btn')
            resultColor = { color: '#e1e8f8' };
        setDatas({ equation, result, resultColor });
    };

    const messageActivate = (alertBigMessage?: string) => {
        if (alertBigMessage == 'bigMessage')
            setMessageBig({ opacity: 1 });
        else
            setMessageInvalid({ opacity: 1 });
        setTimeout(() => {
            if (alertBigMessage == 'bigMessage')
                setMessageBig({ opacity: 0 });
            else
                setMessageInvalid({ opacity: 0 });
        }, 1000);
    };

    return (
        <div className={styles.body}>
            <Display datas={datas} />
            <Keys print={print} message={messageActivate} />

            <div style={messageInvalid} className={styles.messageStyle}>
                <p>Formato usado inválido.</p>
            </div>
            <div style={messageBig} className={styles.messageStyle}>
                <p>Cálculo muito grande.</p>
            </div>
        </div>
    );
};

export default Body;