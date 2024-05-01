declare namespace Message {
  export type Message = {
    id: number;

    // relative to user
    senderUUID: string;
    senderNickname: string | null;
    sender?: Partial<User.User> | null;

    content: string;
    read: boolean;
    mediaType: string | null;

    // relative to chat room
    chatRoomUUID?: string;
    chatRoom?: Partial<ChatRoom.ChatRoom> | null;

    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CreateMessageDto = {
    content: string;
    senderNickname: string;

    read?: boolean;
    mediaType?: string;

    createdAt?: string | Date;
    updatedAt?: string | Date;

    senderUUID: string;
    chatRoomUUID: string;
  };
}
