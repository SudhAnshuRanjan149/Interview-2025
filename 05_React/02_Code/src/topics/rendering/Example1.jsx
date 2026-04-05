import React from 'react'

const Example1 = () => {

    const [name, setName] = React.useState('Alice');

    React.useEffect(() => {
        console.log('Name changed:', name);
    }, [name]);

    return (
        <div>
            <button onClick={() => setName('Bob')}>Change</button>
            <button onClick={() => setName('Alice')}>Reset</button>
            <p>{name}</p>
        </div>
    )
}

export default Example1