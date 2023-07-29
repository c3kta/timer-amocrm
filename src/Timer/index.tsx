import React from 'react';

const Timer = () => {
    const [[h, m, s], setTime] = React.useState([0, 0, 0]);
    const [done, setDone] = React.useState(false);
    const [input, setInput] = React.useState('');

    const handleClick = () => {
        if (input === '') {
            setTime([0, 0, 0]);
        } else {
            let hours = Math.floor(parseInt(input) / 60 / 60);
            let minutes = Math.floor(parseInt(input) / 60) - hours * 60;
            let seconds = parseInt(input) % 60;
            setTime([hours, minutes, seconds]);
            setInput('');
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const times = () => {
        if (done) return;

        if (h === 0 && m === 0 && s === 0) {
            setDone(true);
        } else if (m === 0 && s === 0) {
            setTime([h - 1, 59, 59]);
        } else if (s === 0) {
            setTime([h, m - 1, 59]);
        } else {
            setTime([h, m, s - 1]);
        }
    }

    React.useEffect(() => {
        const timerId = setInterval(() => times(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <>
            <h3>{`${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`}</h3>

            <div>
                <input value={input}
                       type="number"
                       placeholder="Секунды"
                       onChange={handleChange} />

                <button onClick={handleClick}>
                    Начать
                </button>
            </div>
        </>
    );
}

export default Timer;