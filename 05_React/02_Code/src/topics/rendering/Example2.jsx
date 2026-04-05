import React from 'react'

const Example2 = () => {
  return (
    <Parent />
  )
}

export default Example2;

function Parent() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      {/* <Child key={count} count={count} /> */}
      <Child count={count} />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

function Child({ count }) {
  React.useEffect(() => {
    console.log('Child mounted or key changed');
  }, []);

  return <p>{count}</p>;
}