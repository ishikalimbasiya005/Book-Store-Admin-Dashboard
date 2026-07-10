import type { MessageRecord } from "../../Types";

export const mockMessages: MessageRecord[] = [
  {
    id: 'MSG-001',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    subject: 'Delayed shipment for Order #ORD-8941',
    message: 'Hello, my order #ORD-8941 was scheduled to arrive two days ago but I still have not received it. Could you please check the tracking status for me?',
    date: '2026-06-16T10:15:00Z', 
    status: 'unread',
    avatar: '/assets/Images/customer_avatar.png',
    replies: []
  },
  {
    id: 'MSG-002',
    name: 'Robert Smith',
    email: 'robert.smith@example.com',
    subject: 'Bulk discount inquiry for Clean Code',
    message: 'Hi, I want to purchase 50 copies of Clean Code for our upcoming developer training boot camp. Do you offer any volume discounts or bulk pricing?',
    date: '2026-06-16T09:30:00Z', 
    status: 'unread',
    replies: []
  },
  {
    id: 'MSG-003',
    name: 'Clara Oswald',
    email: 'clara.o@example.com',
    subject: 'Damaged book cover on arrival',
    message: 'Dear support, I received my order today, but the cover of Sapiens is completely torn. I have attached photos. Can I get a replacement copy shipped?',
    date: '2026-06-16T08:05:00Z', 
    status: 'read',
    replies: [
      {
        id: 'RPL-001',
        sender: 'admin',
        text: 'Hello Clara, we are sorry to hear that. A replacement order has been created for you free of charge. You will receive the tracking link soon.',
        date: '2026-06-16T08:45:00Z'
      }
    ]
  },
  {
    id: 'MSG-004',
    name: 'Daniel Craig',
    email: 'daniel.c@example.com',
    subject: 'Request for refund on returned item',
    message: 'I returned the Mahabharat book last week and the tracking shows it was delivered to your warehouse. When can I expect the refund to my credit card?',
    date: '2026-06-15T14:20:00Z', 
    status: 'unread',
    replies: []
  },
  {
    id: 'MSG-005',
    name: 'Emily Watson',
    email: 'emily.watson@example.com',
    subject: 'Pre-order question for upcoming sci-fi release',
    message: 'Hello, I see that the new sci-fi novel is listed as pre-order. Will it ship on the release day itself or does the shipping process start after the release date?',
    date: '2026-06-15T11:10:00Z', 
    status: 'read',
    replies: [
      {
        id: 'RPL-002',
        sender: 'admin',
        text: 'Hi Emily, pre-orders are processed in advance so they ship on the official release day itself!',
        date: '2026-06-15T12:00:00Z'
      }
    ]
  },
  {
    id: 'MSG-006',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    subject: 'Incorrect invoice details',
    message: 'The billing address on my invoice for Order #ORD-1082 has my old office address. Can you please update it and send me a corrected PDF?',
    date: '2026-06-14T16:45:00Z', 
    status: 'unread',
    replies: []
  },
  {
    id: 'MSG-007',
    name: 'Jessica Taylor',
    email: 'jessica.t@example.com',
    subject: 'Payment failed but money debited',
    message: 'I tried to place an order using my debit card. The checkout screen showed "Failed", but the money has been deducted from my account. Please help!',
    date: '2026-06-13T10:00:00Z', 
    status: 'unread',
    replies: []
  },
  {
    id: 'MSG-008',
    name: 'William Davis',
    email: 'william.d@example.com',
    subject: 'Suggestion for stock replenishment',
    message: 'Hi, Atomic Habits seems to be out of stock frequently. Is there a way to get email alerts when it is back in stock?',
    date: '2026-06-12T09:15:00Z', 
    status: 'read',
    replies: [
      {
        id: 'RPL-003',
        sender: 'admin',
        text: 'Hello William, we are replenishing stock weekly. You can sign up for notifications on the product detail page.',
        date: '2026-06-12T11:00:00Z'
      }
    ]
  },
  {
    id: 'MSG-009',
    name: 'Sophia Wilson',
    email: 'sophia.w@example.com',
    subject: 'Canceling order request',
    message: 'I made a mistake in my shipping address for Order #ORD-9823. Can you please cancel this order so I can place a new one with the correct address?',
    date: '2026-06-10T15:30:00Z', 
    status: 'read',
    replies: []
  },
  {
    id: 'MSG-010',
    name: 'James Martinez',
    email: 'james.m@example.com',
    subject: 'International shipping rates to Japan',
    message: 'Hello, do you ship to Tokyo, Japan? If yes, what are the shipping rates and the estimated delivery times for standard versus express shipping?',
    date: '2026-06-08T11:40:00Z', 
    status: 'unread',
    replies: []
  },
  {
    id: 'MSG-011',
    name: 'Isabella Anderson',
    email: 'isabella.a@example.com',
    subject: 'Wholesale partnership proposal',
    message: 'Good morning, we own a chain of boutique bookshops in Australia and are interested in sourcing local translations of Indian classics from your portal. Who should we contact?',
    date: '2026-06-05T09:00:00Z', 
    status: 'read',
    replies: []
  },
  {
    id: 'MSG-012',
    name: 'Oliver Thomas',
    email: 'oliver.t@example.com',
    subject: 'Gift wrapping option query',
    message: 'Does your online checkout support gift wrapping and personalized greeting cards? I want to send a book to a friend for their birthday.',
    date: '2026-06-02T14:10:00Z', 
    status: 'read',
    replies: []
  },
  {
    id: 'MSG-013',
    name: 'Charlotte Garcia',
    email: 'charlotte.g@example.com',
    subject: 'Account registration issues',
    message: 'I have been trying to create an admin partner account, but the verification link sent to my email keeps redirecting to an error 404 page.',
    date: '2026-05-28T10:00:00Z', 
    status: 'read',
    replies: []
  },
  {
    id: 'MSG-014',
    name: 'Lucas Robinson',
    email: 'lucas.r@example.com',
    subject: 'Author collaboration request',
    message: 'Hi, I am an indie author of historical fiction and wanted to inquire about the process of listing my digital and print books on your store.',
    date: '2026-05-20T16:25:00Z', 
    status: 'read',
    replies: []
  },
  {
    id: 'MSG-015',
    name: 'Amelia Clark',
    email: 'amelia.c@example.com',
    subject: 'Book Club monthly subscription rates',
    message: 'Hello, our book club of 15 members is looking to subscribe to your monthly reading bundle. Do you offer custom curators for book clubs?',
    date: '2026-05-10T12:00:00Z', 
    status: 'read',
    replies: []
  }
];
