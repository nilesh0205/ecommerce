import React from "react";

export const SlowComponent = React.memo(({ handleClick, value }) => {
  // Intentially making the component slow
  for (let i = 0; i < 1000000000; i++) {}

  return (
    <div>
      <h1>Slow Component</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
});
