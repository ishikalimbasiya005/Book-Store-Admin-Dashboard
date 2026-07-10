import React, { useState, useMemo } from 'react';
import { Select, Tag } from 'antd';
import { motion } from 'framer-motion';
import { FiMail, FiCheckSquare, FiTrash2, FiSend, FiInbox } from 'react-icons/fi';
import { CommonTable } from '../Common';
import { CommonButton } from '../../Attributes';
import { CommonDrawer } from '../Common/CommonDrawer';
import Lottie from 'lottie-react';
import typingAnimation from '../../animation/communication.json';
import { useMessageStore } from '../../Store/useMessageStore';
import { getMessageColumns } from '../../Data/Messages/columns';
import { handleCommonDeleteAction } from '../Common/CommonMsg';
import type { MessageRecord, MessageReply } from '../../Types/Message';

const LottieComponent = (Lottie as { default?: typeof Lottie }).default || Lottie;

const { Option } = Select;

type StatusFilter = 'all' | 'read' | 'unread';

const MessagesComponent: React.FC = () => {
  const { messages, deleteMessage, addReply } = useMessageStore();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedMessage, setSelectedMessage] = useState<MessageRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => m.status === 'unread').length;
  const readCount = messages.filter((m) => m.status === 'read').length;

  const statusFilteredMessages = useMemo(() => {
    if (statusFilter === 'all') return messages;
    return messages.filter((m) => m.status === statusFilter);
  }, [messages, statusFilter]);

  const handleViewMessage = (record: MessageRecord) => {
    setSelectedMessage(record);
    setDrawerOpen(true);
    setReplyText('');
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedMessage(null);
    setReplyText('');
  };

  const handleSendEmail = () => {
    if (!selectedMessage || !replyText.trim()) return;
    const reply: MessageReply = {
      id: `RPL-${Date.now()}`,
      sender: 'admin',
      text: replyText.trim(),
      date: new Date().toISOString(),
    };
    addReply(selectedMessage.id, reply);
    handleCloseDrawer();
  };

  const handleDeleteMessage = (id: string) => {
    handleCommonDeleteAction('Message', () => {
      deleteMessage(id);
      handleCloseDrawer();
    });
  };

  const columns = getMessageColumns(handleViewMessage);

  const statsCards = [
    { icon: <FiInbox size={22} />, label: 'Total Messages', value: totalCount, color: 'var(--sidebar-active)' },
    { icon: <FiMail size={22} />, label: 'Unread', value: unreadCount, color: '#f59e0b' },
    { icon: <FiCheckSquare size={22} />, label: 'Read', value: readCount, color: '#22c55e' },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="orders-banner relative overflow-hidden">
        <div className="rotating-circle orders-banner__circle" />
        <div className="orders-banner__row flex items-center justify-start gap-8 md:gap-12 lg:gap-16 w-full h-full pt-8 pb-0 px-6 md:px-16">
          <div className="w-full md:w-auto md:max-w-[60%] flex flex-col justify-center text-center md:text-left pb-8">
            <h1 className="orders-banner__title text-center md:text-left" style={{ marginBottom: '0.5rem' }}>Customer Messages</h1>
            <p className="orders-banner__desc text-center md:text-left mx-auto md:mx-0" style={{ maxWidth: '600px' }}>
              View, respond to, and manage all incoming customer inquiries and support messages in one place. Stay on top of unread messages and keep your customers happy.
            </p>
          </div>
          <div className="hidden md:flex items-end h-full">
            <LottieComponent animationData={typingAnimation} loop={true} style={{ width: '260px', transform: 'translateY(5px)' }} />
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="order-stats-grid" >
        {statsCards.map((card, idx) => (
          <div key={idx} className="order-stat-card">
            <div className="order-stat-card__icon-wrapper" style={{ color: card.color }}> {card.icon} </div>
            <div className="order-stat-card__content">
              <span className="order-stat-card__value">{card.value}</span>
              <span className="order-stat-card__title">{card.label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Table Card (Using automated CommonTable) */}
      <CommonTable titleText="Messages List" data={statusFilteredMessages} columns={columns} searchable={true} filters={true} pagination={true}
        customFilters={
          <Select value={statusFilter} onChange={(v) => setStatusFilter(v as StatusFilter)} className="msg-filter-select" popupMatchSelectWidth={false} >
            <Option value="all">All Status</Option>
            <Option value="unread">Unread</Option>
            <Option value="read">Read</Option>
          </Select>
        }
      />

      {/* Message Detail Drawer */}
      <CommonDrawer open={drawerOpen} onClose={handleCloseDrawer} title={undefined} >
        {selectedMessage && (
          <div className="msg-drawer-content">
            {/* Drawer Header */}
            <div className="msg-drawer-header">
              <div className="msg-drawer-avatar">
                {selectedMessage.avatar ? (
                  <img src={selectedMessage.avatar} alt={selectedMessage.name} className="msg-drawer-avatar__img" />
                ) : (
                  <span className="msg-drawer-avatar__initials">
                    {selectedMessage.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="msg-drawer-meta">
                <span className="msg-drawer-name">{selectedMessage.name}</span>
                <span className="msg-drawer-email">{selectedMessage.email}</span>
              </div>
              <div className="msg-drawer-actions">
                <Tag className={`badge-msg-status badge-msg-${selectedMessage.status}`}> {selectedMessage.status === 'read' ? 'Read' : 'Unread'} </Tag>
                <CommonButton className="msg-drawer-delete-btn" onClick={() => handleDeleteMessage(selectedMessage.id)} title="Delete message" icon={<FiTrash2 size={16} />} />
              </div>
            </div>

            <div className="msg-drawer-divider" />

            {/* Original Customer Message */}
            <div className="bg-main-background p-4 rounded-xl border border-border-color mt-4 mb-5">
              <div className="text-xs text-placeholder mb-2 flex justify-between">
                <span>Original Message</span>
                <span> {new Date(selectedMessage.date).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', })} </span>
              </div>
              <div className="font-semibold text-primary-text mb-2 text-sm">Subject: {selectedMessage.subject}</div>
              <p className="text-primary-text text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>

            {/* Email Composer */}
            <div className="flex-1 flex flex-col bg-background border border-border-color rounded-xl overflow-hidden shadow-sm">
              <div className="bg-main-background px-4 py-3 border-b border-border-color flex flex-col gap-1">
                <div className="text-sm text-primary-text"><span className="text-placeholder inline-block w-14">To:</span> <span className="font-medium">{selectedMessage.name}</span> &lt;{selectedMessage.email}&gt;</div>
                <div className="text-sm text-primary-text"><span className="text-placeholder inline-block w-14">Subject:</span> Re: {selectedMessage.subject}</div>
              </div>
              
              <textarea className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none text-primary-text text-sm min-h-[150px]" placeholder="Type your email response here..." value={replyText} onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSendEmail();
                  }
                }} />
              
              <div className="bg-main-background px-4 py-3 flex justify-between items-center border-t border-border-color">
                <span className="text-xs text-placeholder hidden sm:inline-block">Press Ctrl + Enter to send</span>
                <span className="text-xs text-placeholder sm:hidden"></span>
                <CommonButton className="flex items-center gap-2 bg-Banner-bg hover:opacity-90 text-white px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSendEmail();
                  }} 
                  disabled={!replyText.trim()} 
                  icon={<FiSend size={15} />} 
                  text="Send Email" />
              </div>
            </div>
          </div>
        )}
      </CommonDrawer>
    </div>
  );
};

export default MessagesComponent;