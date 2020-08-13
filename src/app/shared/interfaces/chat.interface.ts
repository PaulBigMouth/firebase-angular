export interface Chat {
  users: string[];
  messages: ChatMessage[];
}

export interface ChatMessage {
  uid: string;
  text: string;
  createdAt: string;
}
