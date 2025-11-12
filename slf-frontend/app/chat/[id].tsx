// import of the different libraries
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '../../components/Icon';
import { CHATS } from '../../data/chats';
// Import CSS styles
import { styles } from '../../styles/chat';

interface Message {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export default function ConversationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState<string>('');

  const selectedChat = useMemo(() => {
    const chatId = parseInt(String(id), 10);
    return CHATS.find((c) => c.id === chatId) || null;
  }, [id]);

  const messages: Message[] = selectedChat
    ? [
        { id: 1, sender: 'them', text: 'Salut ! Prêt pour ta session ?', time: '14:25' },
        { id: 2, sender: 'me', text: 'Ouais je suis chaud ! 🔥', time: '14:26' },
        {
          id: 3,
          sender: 'them',
          text: "Parfait ! Aujourd'hui on va bosser les muscle-ups. 3 séries de 8 reps !",
          time: '14:27',
        },
        { id: 4, sender: 'me', text: "Let's go ! 💪", time: '14:28' },
        {
          id: 5,
          sender: 'them',
          text: "N'oublie pas de bien t'échauffer avant. 10min cardio + étirements",
          time: '14:29',
        },
        { id: 6, sender: 'me', text: "C'est noté chef !", time: '14:30' },
        {
          id: 7,
          sender: 'them',
          text: 'Tu peux me filmer pour que je regarde ta technique ?',
          time: '14:31',
        },
        {
          id: 8,
          sender: 'me',
          text: "Ça marche, je t'envoie ça tout à l'heure 📹",
          time: '14:32',
        },
      ]
    : [];

  if (!selectedChat) {
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
              <Text style={styles.conversationHeader__avatarEmoji}>{selectedChat.avatar}</Text>
            </View>
            {selectedChat.status === 'online' && (
              <View style={styles.conversationHeader__statusOnline} />
            )}
          </View>
          <View style={styles.conversationHeader__info}>
            <Text style={styles.conversationHeader__name}>{selectedChat.name}</Text>
            <Text style={styles.conversationHeader__status}>
              {selectedChat.status === 'online' ? 'en ligne' : 'hors ligne'}
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
              onPress={() => setMessage('')}
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
