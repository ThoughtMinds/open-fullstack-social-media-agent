interface ChatInputProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    sendMessage: () => void;
    isLoading: boolean;
  }
  
  export default function ChatInput({ inputValue, setInputValue, sendMessage, isLoading }: ChatInputProps) {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isLoading) {
        sendMessage();
      }
    };
  
    return (
      <div className="p-4 border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border border-[#BCD6FB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586V7a1 1 0 00-2 0v5a1 1 0 002 0v-3.586l3.293 3.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  