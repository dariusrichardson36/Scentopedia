import React from 'react';

type ChatbotIconProps = {
  onClick: () => void;
};

const ChatbotIcon: React.FC<ChatbotIconProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        backgroundColor: '#333',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      💬
    </div>
  );
};

export default ChatbotIcon;
