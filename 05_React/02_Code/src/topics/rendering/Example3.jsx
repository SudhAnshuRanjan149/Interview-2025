import React from 'react'

const Example3 = () => {
    return (
        <>
            <div>Example3</div>
            <App />
        </>

    )
}

export default Example3


// What will this output?

function App() {
    const [items, setItems] = React.useState([1, 2, 3]);

    const handleClick = () => {
        setItems([...items, 4]);
    };

    React.useEffect(() => {
        console.log('Items changed');
    }, [items]);

    return (
        <div>
            <button onClick={handleClick}>Add</button>
            <p>{items.length}</p>
        </div>
    );
}


// Clicks Add twice. Console logs?

// A) "Items changed" once
// B) "Items changed" twice
// C) "Items changed" three times
// D) Never logs