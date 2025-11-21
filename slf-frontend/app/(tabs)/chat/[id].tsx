import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../components/Icon';
import { styles } from '../../../styles/chat';
import { UIMessage, ConversationHeader } from '../../../types';

const MOCK_HEADERS: Record<string, ConversationHeader> = {
    '1': { name: 'Ashura Workout', avatar: '💪', status: 'online' },
    '2': { name: 'Coach Marina', avatar: '🏋️‍♀️', status: 'offline' },
    '3': { name: 'Team Street-Lift', avatar: '🥇', status: 'online' },
  };

const MOCK_MESSAGES: Record<string, UIMessage[]> = {
  '1': [
    { id: 'm1', sender: 'them', text: 'Prêt pour une nouvelle semaine ?', time: '14:10' },
    { id: 'm2', sender: 'me', text: 'Oui coach, on y va à fond 💥', time: '14:12' },
  ],
  '2': [
    {
      id: 'm3',
      sender: 'them',
      text: "Je t'ai mis un focus sur le dos cette semaine.",
      time: '09:02',
    },
  ],
  '3': [{ id: 'm4', sender: 'them', text: 'Objectif : nouveau PR au squat.', time: 'Hier' }],
};

export default function ConversationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState<string>('');
  const [header, setHeader] = useState<ConversationHeader>({
    name: 'Conversation',
    avatar: '💬',
    status: 'offline',
  });
  const [messages, setMessages] = useState<UIMessage[]>([]);

  useEffect(() => {
    if (!id) return;
    const key = String(id);
    setHeader(MOCK_HEADERS[key] || { name: 'Conversation', avatar: '💬', status: 'offline' });
    setMessages(MOCK_MESSAGES[key] || []);
  }, [id]);

  const handleSend = () => {
    const text = message.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage: UIMessage = {
      id: `${Date.now()}`,
      sender: 'me',
      text,
      time,
    };

    setMessages((prev) => [...prev, newMessage]);
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
            {header.status === 'online' && <View style={styles.conversationHeader__statusOnline} />}
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

