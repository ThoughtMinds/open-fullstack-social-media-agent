import { Role } from "@copilotkit/runtime-client-gql";

interface ChatMessagesProps {
  visibleMessages: any[];
  isLoading: boolean;
}

export default function ChatMessages({ visibleMessages, isLoading }: ChatMessagesProps) {
  return (
    <div className="space-y-2">
      {visibleMessages.map((message, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg ${
            message.role === Role.User ? "bg-blue-500 text-white self-end" : "bg-gray-100 text-gray-800 self-start"
          } max-w-xs`}
        >
          {message.content}
        </div>
      ))}
      {isLoading && (
        <div className="text-gray-500 text-sm">Assistant is typing...</div>
      )}
    </div>
  );
}
