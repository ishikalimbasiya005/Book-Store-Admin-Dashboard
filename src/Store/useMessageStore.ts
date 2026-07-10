import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockMessages } from '../Data/Messages/mockData';
import type { MessageState } from '../Types/Message';
import { notifier } from '../Attributes/Notification';

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      messages: mockMessages,
      addMessage: (message) => {
        set((state) => ({ messages: [message, ...state.messages] }));
        notifier.success('Message added successfully.');
      },
      updateMessage: (updated) => {
        set((state) => ({
          messages: state.messages.map((m) => (m.id === updated.id ? updated : m)),
        }));
        notifier.success('Message updated successfully.');
      },
      deleteMessage: (id) => {
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        }));
        notifier.success('delete');
      },
      markAsRead: (id) => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id ? { ...m, status: 'read' as const } : m
          ),
        }));
      },
      addReply: (messageId, reply) => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === messageId
              ? {
                  ...m,
                  status: 'read' as const,
                  replies: [...m.replies, reply],
                }
              : m
          ),
        }));
        notifier.success('Reply sent successfully.');
      },
      bulkDelete: (ids) => {
        set((state) => ({
          messages: state.messages.filter((m) => !ids.includes(m.id)),
        }));
        notifier.success('Selected messages deleted.');
      },
    }),
    {
      name: 'message-store',
    }
  )
);
