export type ChatItem = {
  id: number;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
  status: 'online' | 'offline';
};

export const CHATS: ChatItem[] = [
  {
    id: 1,
    name: 'Coach Malik',
    avatar: '🦍',
    lastMsg: 'Prêt pour la session ? 🔥',
    time: '14:30',
    unread: 2,
    status: 'online',
  },
  {
    id: 2,
    name: 'Coach Sarah',
    avatar: '🏋️',
    lastMsg: "Super séance aujourd'hui ! 💪",
    time: '12:15',
    unread: 0,
    status: 'online',
  },
  {
    id: 3,
    name: 'Youssef Beast',
    avatar: '💯',
    lastMsg: 'Merci coach !',
    time: '15:00',
    unread: 0,
    status: 'offline',
  },
  {
    id: 4,
    name: 'Amine Warrior',
    avatar: '🎯',
    lastMsg: "J'ai terminé les dips !",
    time: '14:50',
    unread: 3,
    status: 'online',
  },
  {
    id: 5,
    name: 'Coach Karim',
    avatar: '🥇',
    lastMsg: 'Check ton programme',
    time: '11:45',
    unread: 1,
    status: 'offline',
  },
  {
    id: 6,
    name: 'Team Street',
    avatar: '🔥',
    lastMsg: 'RDV demain 18h au park',
    time: '09:20',
    unread: 0,
    status: 'online',
  },
];
