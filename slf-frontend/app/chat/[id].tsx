// import of the different libraries
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '../../components/Icon';
// Import CSS styles
import { styles } from '../../styles/chat';

// Firebase
import app, { auth } from '../../firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  getFirestore,
} from 'firebase/firestore';

const db = getFirestore(app);

interface UIMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export default function ConversationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState<string>('');
  const [header, setHeader] = useState<{ name: string; avatar: string; status: 'online' | 'offline' }>({
    name: 'Conversation',
    avatar: '💬',
    status: 'offline',
  });
  const [messages, setMessages] = useState<UIMessage[]>([]);

  useEffect(() => {
    if (!id) return;
    const user = auth.currentUser;
    // Header subscription (conversation meta)
    const convRef = doc(db, 'conversations', String(id));
    const unsubConv = onSnapshot(
      convRef,
      (snap) => {
        const data = (snap.data() || {}) as any;
        const members: string[] = Array.isArray((data as any).members) ? (data as any).members : [];
        const otherId = user ? members.find((m) => m !== user.uid) || user.uid : '';
        const name = (data as any).title || (data as any).name || ((data as any).memberNames && (data as any).memberNames[otherId]) || 'Conversation';
        setHeader({ name, avatar: (data as any).avatar || '💬', status: 'offline' });
      },
      (err) => {
        console.warn('Firestore conversation header error:', err.code || err.message);
      }
    );

    // Messages subscription
    const msgsRef = collection(convRef, 'messages');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));
    const unsubMsgs = onSnapshot(
      q,
      (snap) => {
        const items: UIMessage[] = snap.docs.map((d) => {
          const data = d.data() as any;
          const created = data.createdAt?.toDate?.() || new Date();
          const sender: 'me' | 'them' = user && data.senderId === user.uid ? 'me' : 'them';
          return {
            id: d.id,
            sender,
            text: String(data.text || ''),
            time: new Date(created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        });
        setMessages(items);
      },
      (err) => {
        console.warn('Firestore messages listener error:', err.code || err.message);
      }
    );

    return () => {
      unsubConv();
      unsubMsgs();
    };
  }, [id]);

  const handleSend = async () => {
    const user = auth.currentUser;
    if (!user || !id) return;
    const text = message.trim();
    if (!text) return;

    const convRef = doc(db, 'conversations', String(id));
    await addDoc(collection(convRef, 'messages'), {
      text,
      senderId: user.uid,
      createdAt: serverTimestamp(),
    });
    await updateDoc(convRef, {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
    });
    setMessage('');
  };

  if (!id) {
    return (
      <SafeAreaView style={styles.app}>
        <View style={{ padding: 16 }}>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/chat')}>
            <Text>← Retour aux messages</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 12 }}>Conversation introuvable.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.conversation}>
      <View style={styles.conversation__container}>
        {/* Header */}
        <View style={styles.conversationHeader}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.conversationHeader__backButton}
          >
            <Icon emoji="←" size={24} />
          </TouchableOpacity>
          <View style={styles.conversationHeader__avatarWrapper}>
            <View style={styles.conversationHeader__avatar}>
              <Text style={styles.conversationHeader__avatarEmoji}>{header.avatar}</Text>
            </View>
            {header.status === 'online' && (
              <View style={styles.conversationHeader__statusOnline} />
            )}
          </View>
          <View style={styles.conversationHeader__info}>
            <Text style={styles.conversationHeader__name}>{header.name}</Text>
            <Text style={styles.conversationHeader__status}>
              {header.status === 'online' ? 'en ligne' : 'hors ligne'}
            </Text>
          </View>
          <View style={styles.conversationHeader__actions}>
            <TouchableOpacity style={styles.conversationHeader__actionButton}>
              <Icon emoji="📹" size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.conversationHeader__actionButton}>
              <Icon emoji="📞" size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.conversationHeader__actionButton}>
              <Icon emoji="⋮" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ImageBackground
          source={{
            uri: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4dbd4' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
          }}
          style={styles.messagesList}
          resizeMode="repeat"
        >
          <ScrollView
            contentContainerStyle={styles.messagesList__content}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageItem,
                  msg.sender === 'me'
                    ? styles['messageItem--sent']
                    : styles['messageItem--received'],
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    msg.sender === 'me'
                      ? styles['messageBubble--sent']
                      : styles['messageBubble--received'],
                  ]}
                >
                  <Text style={styles.messageBubble__text}>{msg.text}</Text>
                  <Text style={styles.messageBubble__time}>{msg.time}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </ImageBackground>

        {/* Input */}
        <View style={styles.messageInput}>
          <View style={styles.messageInput__wrapper}>
            <TouchableOpacity style={styles.messageInput__emojiButton}>
              <Icon emoji="😊" size={24} />
            </TouchableOpacity>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Message"
              placeholderTextColor="#9CA3AF"
              style={styles.messageInput__field}
            />
            <TouchableOpacity style={styles.messageInput__cameraButton}>
              <Icon emoji="📷" size={20} />
            </TouchableOpacity>
          </View>
          {message.trim() ? (
            <TouchableOpacity
              onPress={handleSend}
              style={styles.messageInput__sendButton}
              activeOpacity={0.8}
            >
              <Icon emoji="➤" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.messageInput__sendButton} activeOpacity={0.8}>
              <Icon emoji="🎤" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
