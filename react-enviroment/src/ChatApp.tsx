import React, { useState } from 'react';
import ChatbotIcon from './components/ChatbotIcon';
import ChatbotWindow from './components/ChatbotWindow';

const ChatApp: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
  
    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);
  
    return (
      <div>
        {/* Other components for website */}
        <ChatbotIcon onClick={openChat} />
        {isChatOpen && <ChatbotWindow onClose={closeChat} />}
      </div>
    );
  };
  export default ChatApp;