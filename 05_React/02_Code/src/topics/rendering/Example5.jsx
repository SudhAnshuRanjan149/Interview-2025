import React from 'react'

const Example5 = () => {
    return (

        <>
            <div>Example5</div>
            <App />
        </>
    )
}

export default Example5


function App() {
    const [count, setCount] = React.useState(0);

    const handleClick = () => {
        setCount(count + 1);
        setCount(count + 1);
    };

    const handleAsyncClick = async () => {
        await Promise.resolve();
        setCount(count + 1);
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={handleClick}>Sync</button>
            <button onClick={handleAsyncClick}>Async</button>
            <p>{count}</p>
        </div>
    );
}