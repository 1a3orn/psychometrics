import React, { useState, useCallback, memo } from 'react';

interface NavbarMenuProps {
  onToggle: (isOpen: boolean) => void;
  menuElements: { text: string, onClick: () => void }[];
}

const menuElementStyle: React.CSSProperties = { 
    padding: '10px 20px',
    cursor: 'pointer',
    color: '#333',
    borderBottom: '1px solid #ccc'
};

const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#f0f0f0',
    transition: 'transform 0.3s linear'
};

export const NavbarMenu: React.FC<NavbarMenuProps> = memo(({ onToggle, menuElements }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle(newIsOpen);
  }, [isOpen, onToggle]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '30px',
    height: '25px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  };

  const barStyle: React.CSSProperties = {
    width: '30px',
    height: '3px',
    background: '#333',
    transition: 'all 0.3s linear',
    transformOrigin: '3px'
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={handleClick} style={containerStyle} aria-label="Toggle menu">
        <div style={{
          ...barStyle,
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
        }} />
        <div style={{
          ...barStyle,
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'translateX(20px)' : 'translateX(0)',
        }} />
        <div style={{
          ...barStyle,
          transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)',
        }} />
      </button>
      {isOpen && (
        <div style={{ ...menuStyle }}>
          {menuElements.map((element, index) => (
            <div key={index} onClick={element.onClick} style={menuElementStyle}>
              {element.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
