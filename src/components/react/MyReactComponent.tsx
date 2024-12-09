// MyReactComponent.tsx
import React from 'react';

interface Props {
  text: string;
}

const MyReactComponent: React.FC<Props> = ({ text }) => {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--color)' }}>
      React Component: {text}
    </div>
  );
};

export default MyReactComponent;
