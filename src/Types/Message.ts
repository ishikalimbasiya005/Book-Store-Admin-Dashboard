export interface MessageReply {
  id: string;
  sender: 'admin' | 'customer';
  text: string;
  date: string;
}

export interface MessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'read' | 'unread';
  avatar?: string;
  replies: MessageReply[];
}

export interface MessageState {
  messages: MessageRecord[];
  addMessage: (message: MessageRecord) => void;
  updateMessage: (message: MessageRecord) => void;
  deleteMessage: (id: string) => void;
  markAsRead: (id: string) => void;
  addReply: (messageId: string, reply: MessageReply) => void;
  bulkDelete: (ids: string[]) => void;
}
