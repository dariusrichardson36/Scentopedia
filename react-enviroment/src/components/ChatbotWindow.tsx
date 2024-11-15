import { collection, getDocs, query, where } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { db } from '../firebaseConfig';
import './ChatbotWindow.css';

// Types and Interfaces
interface Fragrance {
    readonly fragranceName: string;
    readonly brandName: string;
    readonly brandImg: string;
    readonly description: string;
    readonly image: string;
    readonly perfumer: string;
    readonly accords: readonly string[];
    readonly combNotes: readonly string[];
    readonly notes: {
        readonly top_notes: readonly string[];
        readonly middle_notes: readonly string[];
        readonly base_notes: readonly string[];
    }
}

type MessageOptions = 
    | "Fragrance Information"
    | "Fragrance Finder"
    | "Recommend Fragrances"
    | "Brand"
    | "Notes"
    | "Accords"
    | "Description"
    | "Yes"
    | "No";

interface ChatMessage {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    options?: MessageOptions[];
    timestamp: number;
}

enum ErrorType {
    NETWORK = 'Network Error',
    DATABASE = 'Database Error',
    VALIDATION = 'Validation Error',
    TIMEOUT = 'Timeout Error',
    RATE_LIMIT = 'Rate Limit Error',
    DATA_FORMAT = 'Data Format Error'
}

class ChatbotError extends Error {
    constructor(public type: ErrorType, message: string) {
        super(message);
        this.name = 'ChatbotError';
    }
}

// Helper Components
const TypingIndicator: React.FC = () => (
    <div className="typing-indicator">
        {[1, 2, 3].map((dot) => (
            <div key={dot} className={`typing-dot typing-dot-${dot}`} />
        ))}
    </div>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="progress-bar">
        <div 
            className="progress-bar-fill"
            data-progress={progress}
        />
    </div>
);

// Utility Functions
const soundex = (str: string): string => {
    if (!str) return '';
    const a = str.toLowerCase().split('');
    const f = a.shift() || '';
    const r = a.map((v) => {
        switch (v) {
            case 'b': case 'f': case 'p': case 'v': return '1';
            case 'c': case 'g': case 'j': case 'k': 
            case 'q': case 's': case 'x': case 'z': return '2';
            case 'd': case 't': return '3';
            case 'l': return '4';
            case 'm': case 'n': return '5';
            case 'r': return '6';
            default: return '';
        }
    }).join('');
    return `${f}${r.replace(/(\d)?\1+/g, '$1')}`
        .replace(/^(.{4})(.*)/, '$1')
        .padEnd(4, '0')
        .toUpperCase();
};

const ChatbotWindow: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [selectedFragrance, setSelectedFragrance] = useState('');
    const [awaitingFragranceName, setAwaitingFragranceName] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isInitializing, setIsInitializing] = useState(true);
    const [lastOptionsTimestamp, setLastOptionsTimestamp] = useState<number>(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
        const timestamp = Date.now();
        const newMessage = {
            ...message,
            id: timestamp.toString() + Math.random().toString(36).substr(2, 9),
            timestamp
        };
        setMessages(prev => [...prev, newMessage]);
        if (message.options) {
            setLastOptionsTimestamp(timestamp);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const initializeChat = async () => {
            if (!isInitializing || !isMounted) return;
            
            setIsTyping(true);
            
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                if (!isMounted) return;
                
                addMessage({
                    text: "Hello. I am Scentopedia's virtual assistant. I am here to assist you in your fragrance search.",
                    sender: 'bot'
                });
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (!isMounted) return;
                
                addMessage({
                    text: "How may I help you?",
                    sender: 'bot'
                });
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (!isMounted) return;
                
                addMessage({
                    text: "Please select an option:",
                    sender: 'bot',
                    options: ["Fragrance Information", "Fragrance Finder", "Recommend Fragrances"]
                });
            } finally {
                if (isMounted) {
                    setIsTyping(false);
                    setIsInitializing(false);
                }
            }
        };

        initializeChat();

        return () => {
            isMounted = false;
        };
    }, [addMessage, isInitializing]);

    const handleDatabaseQuery = async (operation: () => Promise<any>, retryCount = 0): Promise<any> => {
        try {
            if (!navigator.onLine) {
                throw new ChatbotError(ErrorType.NETWORK, 'Please check your internet connection');
            }

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new ChatbotError(ErrorType.TIMEOUT, 'Request timed out')), 10000);
            });

            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 500);

            const result = await Promise.race([operation(), timeoutPromise]);
            
            clearInterval(progressInterval);
            setProgress(100);
            setTimeout(() => setProgress(0), 500);
            
            return result;

        } catch (err: any) {
            setProgress(0);

            if (err instanceof ChatbotError) {
                throw err;
            } else if (err.code === 'permission-denied') {
                throw new ChatbotError(ErrorType.DATABASE, 'Database access denied');
            } else if (err.code === 'resource-exhausted') {
                throw new ChatbotError(ErrorType.RATE_LIMIT, 'Too many requests, please try again later');
            } else if (err.code === 'invalid-argument') {
                throw new ChatbotError(ErrorType.DATA_FORMAT, 'Invalid data format');
            }

            if (retryCount < 3 && (err.type === ErrorType.NETWORK || err.type === ErrorType.TIMEOUT)) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                return handleDatabaseQuery(operation, retryCount + 1);
            }

            throw new ChatbotError(ErrorType.DATABASE, 'An unexpected error occurred');
        }
    };

    const findSimilarFragrances = async (searchName: string): Promise<Fragrance[]> => {
        try {
            const fragrancesRef = collection(db, 'Fragrance');
            const querySnapshot = await getDocs(fragrancesRef);
            
            const searchNameSoundex = soundex(searchName.toLowerCase());
            
            return querySnapshot.docs
                .map(doc => doc.data() as Fragrance)
                .filter(fragrance => 
                    soundex(fragrance.fragranceName.toLowerCase()) === searchNameSoundex
                );
        } catch (error) {
            console.error('Error finding similar fragrances:', error);
            throw error;
        }
    };

    const handleFragranceInfoRequest = async (fragranceName: string) => {
        setLoading(true);
        setIsTyping(true);
    
        try {
            if (!fragranceName.trim()) {
                throw new ChatbotError(ErrorType.VALIDATION, 'Please enter a fragrance name');
            }
    
            addMessage({
                text: fragranceName,
                sender: 'user'
            });
    
            const result = await handleDatabaseQuery(async () => {
                const fragrancesRef = collection(db, 'Fragrance');
                const q = query(fragrancesRef, where('fragranceName', '==', fragranceName));
                return getDocs(q);
            });
    
            if (!result.empty) {
                const fragranceData = result.docs[0].data() as Fragrance;
                setSelectedFragrance(fragranceData.fragranceName);
                addMessage({
                    text: `Please choose what information you would like to know about ${fragranceData.fragranceName}.`,
                    sender: 'bot',
                    options: ['Brand', 'Notes', 'Accords', 'Description']
                });
            } else {
                const similarFragrances = await findSimilarFragrances(fragranceName);
                
                if (similarFragrances.length > 0) {
                    addMessage({
                        text: `Did you mean ${similarFragrances[0].fragranceName}?`,
                        sender: 'bot',
                        options: ['Yes', 'No']
                    });
                } else {
                    addMessage({
                        text: "I apologize. I was not able to find a fragrance with that name. Would you like to try entering the fragrance name again?",
                        sender: 'bot',
                        options: ['Yes', 'No']
                    });
                }
            }
        } catch (err) {
            if (err instanceof ChatbotError) {
                addMessage({
                    text: `Error: ${err.message}`,
                    sender: 'bot'
                });
            }
        } finally {
            setLoading(false);
            setIsTyping(false);
            setCurrentInput('');
        }
    };

    const askIfAnythingElse = async () => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        addMessage({
            text: "Is there anything else I can help you with?",
            sender: 'bot',
            options: ["Yes", "No"]
        });
        setIsTyping(false);
    };
    
    const handleGetFragranceInfo = async (option: MessageOptions) => {
        setLoading(true);
        setIsTyping(true);

        try {
            const result = await handleDatabaseQuery(async () => {
                const fragrancesRef = collection(db, 'Fragrance');
                const q = query(fragrancesRef, where('fragranceName', '==', selectedFragrance));
                return getDocs(q);
            });

            if (!result.empty) {
                const fragranceData = result.docs[0].data() as Fragrance;
                let responseText = '';

                switch (option) {
                    case 'Brand':
                        responseText = `Here is the brand for ${selectedFragrance}:\n\n${fragranceData.brandName}`;
                        break;
                    case 'Notes':
                        responseText = `Here are the notes for ${selectedFragrance}:\n\n` +
                                     `Top Notes: ${fragranceData.notes.top_notes.join(', ')}\n\n` +
                                     `Middle Notes: ${fragranceData.notes.middle_notes.join(', ')}\n\n` +
                                     `Base Notes: ${fragranceData.notes.base_notes.join(', ')}`;
                        break;
                    case 'Accords':
                        responseText = `Here are the accords for ${selectedFragrance}:\n\n${fragranceData.accords.join(', ')}`;
                        break;
                    case 'Description':
                        responseText = `Here is the description for ${selectedFragrance}:\n\n${fragranceData.description}`;
                        break;
                }

                addMessage({ text: responseText, sender: 'bot' });
                await askIfAnythingElse();
            }
        } catch (err) {
            if (err instanceof ChatbotError) {
                addMessage({
                    text: `Error: ${err.message}`,
                    sender: 'bot'
                });
            }
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    };

    const handleOptionClick = async (option: MessageOptions) => {
        addMessage({ text: option, sender: 'user' });

        switch (option) {
            case 'Fragrance Information':
                setAwaitingFragranceName(true);
                setIsTyping(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                addMessage({
                    text: "Please enter the name of the fragrance you would like information on.",
                    sender: 'bot'
                });
                setIsTyping(false);
                break;

            case 'Brand':
            case 'Notes':
            case 'Accords':
            case 'Description':
                await handleGetFragranceInfo(option);
                break;

            case 'Yes':
                setIsTyping(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                addMessage({
                    text: "Please select an option:",
                    sender: 'bot',
                    options: ["Fragrance Information", "Fragrance Finder", "Recommend Fragrances"]
                });
                setIsTyping(false);
                break;

            case 'No':
                setAwaitingFragranceName(false);
                setSelectedFragrance('');
                setIsTyping(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                addMessage({
                    text: "Very well. Hopefully you found my help to be beneficial.",
                    sender: 'bot'
                });
                await new Promise(resolve => setTimeout(resolve, 1000));
                addMessage({
                    text: "Please feel free to close this chat now. Have a great day!",
                    sender: 'bot'
                });
                setIsTyping(false);
                break;
        }
    };

    return (
        <div className="message-container">
            <div className="messages-list">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-row ${message.sender === 'bot' ? 'message-row-bot' : 'message-row-user'}`}
                    >
                        <div
                            className={`message-bubble ${
                                message.sender === 'bot' ? 'message-bubble-bot' : 'message-bubble-user'
                            }`}
                            >
                            <p className="message-text">{message.text}</p>
                            {message.options && (
                                <div className="message-options">
                                    {message.options.map((option, optionIndex) => (
                                        <button
                                            key={optionIndex}
                                            onClick={() => handleOptionClick(option)}
                                            disabled={loading || message.timestamp !== lastOptionsTimestamp}
                                            className={`message-option-button ${
                                                loading || message.timestamp !== lastOptionsTimestamp 
                                                    ? 'button-disabled' 
                                                    : ''
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
                {isTyping && <TypingIndicator />}
                {progress > 0 && <ProgressBar progress={progress} />}
                <div ref={messagesEndRef} />
            </div>

            {awaitingFragranceName && (
                <div className="input-container">
                    <input
                        type="text"
                        value={currentInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentInput(e.target.value)}
                        className="text-input"
                        placeholder="Enter fragrance name..."
                        disabled={loading}
                        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter' && !loading) {
                                handleFragranceInfoRequest(currentInput);
                            }
                        }}
                    />
                    <button
                        onClick={() => handleFragranceInfoRequest(currentInput)}
                        disabled={loading}
                        className={`send-button ${loading ? 'button-disabled' : 'button-enabled'}`}
                        aria-label="Send message"
                    >
                        {loading ? (
                            <div className="button-loading">
                                <Loader2 className="loader-icon" />
                                <span>Processing...</span>
                            </div>
                        ) : (
                            'Send'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatbotWindow;