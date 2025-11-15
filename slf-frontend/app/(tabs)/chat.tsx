// import of the different libraries
import { Stack, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import of the different components
import Icon from '../../components/Icon';
// Import CSS styles
import { styles } from '../../styles/chat';

interface ConversationListItem {
  id: string;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
  status: 'online' | 'offline';
}

// Données de conversations mockées pour la maquette (aucun accès réseau)
const MOCK_CONVERSATIONS: ConversationListItem[] = [
  {
    id: '1',
    name: 'Ashura Workout',
    avatar: '💪',
    lastMsg: 'On commence la prochaine séance lundi ?',
    time: '14:32',
    unread: 2,
    status: 'online',
  },
  {
    id: '2',
    name: 'Coach Marina',
    avatar: '🏋️‍♀️',
    lastMsg: 'Je t’ai envoyé le nouveau programme 🔥',
    time: '09:10',
    unread: 0,
    status: 'offline',
  },
  {
    id: '3',
    name: 'Team Street-Lift',
    avatar: '🥇',
    lastMsg: 'Objectif : nouveau PR ce mois-ci 💥',
    time: 'Hier',
    unread: 5,
    status: 'online',
  },
];

const Chat: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MOCK_CONVERSATIONS;
    return MOCK_CONVERSATIONS.filter((c) => c.name.toLowerCase().includes(q));
  }, [searchQuery]);

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
              onPress={() => router.push({ pathname: '/chat/[id]', params: { id: chat.id } })}
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
