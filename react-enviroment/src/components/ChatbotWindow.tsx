import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebaseConfig';
import './ChatbotWindow.css';

// Type declarations
type ChatbotWindowProps = {
  onClose: () => void;
};

interface Message {
  text: string;
  sender: 'user' | 'bot';
  type?: 'text' | 'options' | 'info-options' | 'confirmation';
}

interface FragranceData {
  fragranceName: string;
  notes?: {
    top_notes?: string[];
    middle_notes?: string[];
    base_notes?: string[];
  };
  accords?: string[];
  brandName?: string;
  description?: string;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [fragranceName, setFragranceName] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState<'main' | 'info-options' | null>('main');
  const hasSentIntroMessages = useRef(false);

  // Function to add messages
  const addMessage = (text: string, sender: 'user' | 'bot', type: 'text' | 'options' | 'info-options' | 'confirmation' = 'text') => {
    setMessages((prevMessages) => [...prevMessages, { text, sender, type }]);
  };

  // Function to send message
  const sendMessage = () => {
    if (input.trim()) {
      addMessage(input, 'user');
      handleBotResponse(input);
      setInput('');
    }
  };

  const soundex = (s: string): string => {
    const a = s.toUpperCase().split('');
    const f = a.shift();
    const mappings: { [key: string]: number } = { B: 1, F: 1, P: 1, V: 1, C: 2, G: 2, J: 2, K: 2, Q: 2, S: 2, X: 2, Z: 2, D: 3, T: 3, L: 4, M: 5, N: 5, R: 6 };
    const result = [f, ...a
      .map(v => mappings[v] || 0)
      .filter((v, i, a) => v !== a[i - 1])
      .join('').padEnd(3, '0').slice(0, 3)];
    return result.join('');
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    if (option === 'Fragrance Information') {
      addMessage("Please provide the name of the fragrance you want information on.", 'bot');
      setCurrentDirectory(null);
    } else if (option === 'Recommend Fragrances') {
      setCurrentDirectory('info-options');
      addMessage("What category should I recommend fragrances based on?", 'bot');
    } else if (option === 'Featured Fragrances') {
      addMessage("Here are some popular fragrances this week: Dior Homme Intense, Chanel Bleu, and Versace Eros.", 'bot');
      setCurrentDirectory(null);
    }
  };

  const handleConfirmationClick = (option: string) => {
    if (option === "Yes") {
      addMessage("Yes", 'user');
      handleBotResponse(fragranceName); // Proceed with matched fragrance
    } else {
      addMessage("No", 'user');
      addMessage("Please provide the name of the fragrance you want information on.", 'bot');
      setFragranceName(''); // Reset the fragrance name for a new attempt
    }
  };
  

  const handleInfoOptionClick = (option: string) => {
    addMessage(option, 'user');
    handleInfoSelection(option);
    setCurrentDirectory('main');
  };

  const handleBotResponse = async (userMessage: string) => {
    const lastMessage = messages[messages.length - 1]?.text;
    if (lastMessage === "Please provide the name of the fragrance you want information on.") {
      setFragranceName(userMessage);
      await searchFragranceByName(userMessage);
    } else if (lastMessage && lastMessage.startsWith("What information about")) {
      await handleInfoSelection(userMessage);
    }
  };

  const searchFragranceByName = async (nameInput: string) => {
    try {
      const userSoundex = soundex(nameInput);

      const fragranceCollection = collection(db, "Fragrance");
      const fragranceSnapshot = await getDocs(fragranceCollection);

      if (fragranceSnapshot.empty) {
        addMessage(`I couldn't find any fragrances in the database.`, 'bot');
        return;
      }

      let matchedFragrance: FragranceData | null = null;

      fragranceSnapshot.docs.forEach((doc) => {
        const fragranceData = doc.data() as FragranceData | null;
        if (fragranceData && fragranceData.fragranceName) {
          const fragranceSoundex = soundex(fragranceData.fragranceName);
          if (fragranceSoundex === userSoundex) {
            matchedFragrance = fragranceData;
          }
        }
      });

      if (matchedFragrance) {
        const fragrance = matchedFragrance as FragranceData;
        const isExactMatch = fragrance.fragranceName.toLowerCase() === nameInput.toLowerCase();
        if (isExactMatch) {
          setFragranceName(fragrance.fragranceName);
          addMessage(`What information about ${fragrance.fragranceName} would you like to know?`, 'bot', 'info-options');
          setCurrentDirectory('info-options');
        } else {
          addMessage(`Did you mean ${fragrance.fragranceName}?`, 'bot', 'confirmation');
          setFragranceName(fragrance.fragranceName);
        }
      } else {
        addMessage(`I couldn't find a fragrance with the name "${nameInput}".`, 'bot');
      }
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      addMessage("An error occurred while trying to retrieve information. Please try again later.", 'bot');
    }
  };

  const handleInfoSelection = async (selection: string) => {
    if (selection === "Notes") {
      await fetchFragranceInfo("notes", fragranceName, "notes");
    } else if (selection === "Brand") {
      await fetchFragranceInfo("brandName", fragranceName, "brand");
    } else if (selection === "Accords") {
      await fetchFragranceInfo("accords", fragranceName, "accords");
    } else if (selection === "Description") {
      await fetchFragranceInfo("description", fragranceName, "description");
    }
  };

  const fetchFragranceInfo = async (field: string, fragrance: string, label: string) => {
    try {
      const fragranceCollection = collection(db, "Fragrance");
      const fragranceQuery = query(fragranceCollection, where("fragranceName", "==", fragrance));
      const querySnapshot = await getDocs(fragranceQuery);

      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data() as FragranceData;
        let info = '';

        if (field === "notes" && data.notes) {
          const topNotes = data.notes.top_notes?.join(", ") || "N/A";
          const middleNotes = data.notes.middle_notes?.join(", ") || "N/A";
          const baseNotes = data.notes.base_notes?.join(", ") || "N/A";
          info = `Top Notes: ${topNotes}\nMiddle Notes: ${middleNotes}\nBase Notes: ${baseNotes}`;
        } else if (field === "accords" && data.accords) {
          info = data.accords.join(", ");
        } else if (field === "brandName" && data.brandName) {
          info = data.brandName;
        } else if (field === "description" && data.description) {
          info = data.description;
        } else {
          info = `Information not available.`;
        }

        addMessage(`Here is the ${label} for ${fragrance}: ${info}`, 'bot');
      } else {
        addMessage(`I couldn't find any information on "${fragrance}" in the ${label}.`, 'bot');
      }
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      addMessage("An error occurred while trying to retrieve information. Please try again later.", 'bot');
    }
  };

  useEffect(() => {
    if (!hasSentIntroMessages.current) {
      hasSentIntroMessages.current = true;
      const sendIntroMessages = async () => {
        addMessage("Hello, I am Scentopedia's virtual assistant. I am here to assist you in your fragrance finding.", 'bot');
        await new Promise(resolve => setTimeout(resolve, 3000));
        addMessage("How may I help you?", 'bot');
        addMessage("Please select an option:", 'bot', 'options');
        setCurrentDirectory('main');
      };

      sendIntroMessages();
    }
  }, []);

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <button onClick={onClose}>X</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
            <div className={`message-text ${msg.type === 'options' ? 'options-message' : ''}`}>
              {msg.type === 'options' && currentDirectory === 'main' ? (
                <div>
                  <p>{msg.text}</p>
                  <button onClick={() => handleOptionClick("Fragrance Information")}>Fragrance Information</button>
                  <button onClick={() => handleOptionClick("Recommend Fragrances")}>Recommend Fragrances</button>
                  <button onClick={() => handleOptionClick("Featured Fragrances")}>Featured Fragrances</button>
                </div>
              ) : msg.type === 'info-options' && currentDirectory === 'info-options' ? (
                <div>
                  <p>{msg.text}</p>
                  <button onClick={() => handleInfoOptionClick("Notes")}>Notes</button>
                  <button onClick={() => handleInfoOptionClick("Brand")}>Brand</button>
                  <button onClick={() => handleInfoOptionClick("Accords")}>Accords</button>
                  <button onClick={() => handleInfoOptionClick("Description")}>Description</button>
                </div>
              ) : msg.type === 'confirmation' ? (
                <div>
                  <p>{msg.text}</p>
                  <button onClick={() => handleConfirmationClick("Yes")}>Yes</button>
                  <button onClick={() => handleConfirmationClick("No")}>No</button>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type a message..."
          className="chatbot-input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button onClick={sendMessage} className="chatbot-send-button">Send</button>
      </div>
    </div>
)};

export default ChatbotWindow;
