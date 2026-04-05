import React from 'react'

const Example4 = () => {
    return (
        <>
            <div>Example4</div>
            <Counter />
        </>
    )
}

export default Example4



function Counter() {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const handleKeyPress = () => {
            console.log('Count:', count);
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [count]);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <p>{count}</p>
        </div>
    );
}


// Clicks button twice, presses key. Console logs?

// A) Count: 2
// B) Count: 1 (old reference)
// C) Error
// D) Multiple logs