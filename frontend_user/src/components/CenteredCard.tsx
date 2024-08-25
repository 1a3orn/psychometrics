import React from 'react';
const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const cardStyle = {
  position: 'relative' as 'relative',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '400px',
};

const titleStyle = {
  position: 'absolute' as 'absolute',
  top: '-32px',
  left: '-8px',
  backgroundColor: '#fff',
  padding: '5px 10px',
};

export const CenteredCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div style={cardContainerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>
          <strong>{title}</strong>
        </div>
        {children}
      </div>
    </div>
  );
};
