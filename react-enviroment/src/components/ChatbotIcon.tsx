import React from 'react';
import './ChatbotIcon.css';

type ChatbotIconProps = {
  onClick: () => void;
};

const ChatbotIcon: React.FC<ChatbotIconProps> = ({ onClick }) => {
  return (
    <div className="chatbot-icon" onClick={onClick}>
      💬
    </div>
  );
};

export default ChatbotIcon;
