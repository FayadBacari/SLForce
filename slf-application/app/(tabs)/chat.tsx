// import of the different libraries
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// import of the different components
import Icon from '../../components/Icon';
import { CHATS } from '../../data/chats';

// Import CSS styles
import { styles } from '../../styles/chat';


const Chat: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const chats = CHATS;

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
          {chats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              onPress={() => router.push({ pathname: "/chat/[id]", params: { id: String(chat.id) } })}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
