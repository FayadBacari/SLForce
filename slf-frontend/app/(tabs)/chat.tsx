// import of the different libraries
import { useEffect, useMemo, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// import of the different components
import Icon from '../../components/Icon';

// Import CSS styles
import { styles } from '../../styles/chat';

// Firebase
import app, { auth } from '../../firebaseConfig';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  Timestamp,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';

const db = getFirestore(app);

interface ConversationListItem {
  id: string;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
  status: 'online' | 'offline';
}

const Chat: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [conversations, setConversations] = useState<ConversationListItem[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return; // L'utilisateur doit être connecté

    const q = query(
      collection(db, 'conversations'),
      where('members', 'array-contains', user.uid),
      orderBy('lastMessageAt', 'desc')
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: ConversationListItem[] = snap.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          const lastAt: Timestamp | null = (data.lastMessageAt as Timestamp) || null;
          const members: string[] = Array.isArray(data.members) ? data.members : [];
          const otherId = members.find((m) => m !== user.uid) || user.uid;
          const displayName: string =
            data.title || data.name || (data.memberNames && data.memberNames[otherId]) || 'Conversation';

          return {
            id: doc.id,
            name: displayName,
            avatar: data.avatar || '💬',
            lastMsg: typeof data.lastMessage === 'string' ? data.lastMessage : '',
            time: lastAt ? new Date(lastAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            unread: typeof data.unread === 'number' ? data.unread : 0,
            status: 'offline',
          };
        });
        setConversations(items);
      },
      (err) => {
        console.warn('Firestore conversations listener error:', err.code || err.message);
      }
    );

    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => c.name.toLowerCase().includes(q));
  }, [conversations, searchQuery]);

  return (
    <SafeAreaView style={styles.app}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.app__container}>
        {/* Header WhatsApp style */}
        <View style={styles.chatHeader}>
          <View style={styles.searchBar}>
            <Icon emoji="🔍" size={18} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher..."
              placeholderTextColor="#80CBC4"
              style={styles.searchBar__input}
            />
          </View>
        </View>

        {/* Chat List */}
        <ScrollView style={styles.chatList} contentContainerStyle={styles.chatList__content}>
          {filtered.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              onPress={() => router.push({ pathname: "/chat/[id]", params: { id: chat.id } })}
              style={styles.chatItem}
              activeOpacity={0.7}
            >
              <View style={styles.chatItem__avatarWrapper}>
                <View style={styles.chatItem__avatar}>
                  <Text style={styles.chatItem__avatarEmoji}>{chat.avatar}</Text>
                </View>
                {chat.status === 'online' && <View style={styles.chatItem__statusOnline} />}
              </View>
              <View style={styles.chatItem__content}>
                <View style={styles.chatItem__header}>
                  <Text style={styles.chatItem__name}>{chat.name}</Text>
                  <Text style={styles.chatItem__time}>{chat.time}</Text>
                </View>
                <View style={styles.chatItem__footer}>
                  <Text style={styles.chatItem__lastMsg} numberOfLines={1}>
                    {chat.lastMsg}
                  </Text>
                  {chat.unread > 0 && (
                    <View style={styles.chatItem__unreadBadge}>
                      <Text style={styles.chatItem__unreadText}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {filtered.length === 0 && (
            <View style={{ padding: 16 }}>
              <Text>Aucune conversation pour l’instant.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
