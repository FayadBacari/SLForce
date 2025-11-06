import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },

  app__container: {
    flex: 1,
  },

  chatHeader: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },

  chatHeader__top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  chatHeader__title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },

  chatHeader__actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  chatHeader__actionButton: {
    padding: 4,
  },

  searchBar: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  searchBar__input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    padding: 0,
  },

  chatList: {
    flex: 1,
  },

  chatList__content: {
    paddingBottom: 80,
  },

  chatItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  chatItem__avatarWrapper: {
    position: 'relative',
  },

  chatItem__avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatItem__avatarEmoji: {
    fontSize: 24,
  },

  chatItem__statusOnline: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  chatItem__content: {
    flex: 1,
    minWidth: 0,
  },

  chatItem__header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },

  chatItem__name: {
    fontWeight: '600',
    color: '#111827',
    fontSize: 16,
  },

  chatItem__time: {
    fontSize: 12,
    color: '#6B7280',
  },

  chatItem__footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  chatItem__lastMsg: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },

  chatItem__unreadBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  chatItem__unreadText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },

  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  nav__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    maxWidth: 448,
  },

  nav__button: {
    alignItems: 'center',
    gap: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  'nav__button--active': {},

  'nav__button--activeMessages': {},

  nav__label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9CA3AF',
  },

  'nav__label--active': {
    color: '#2563EB',
  },

  'nav__label--activeMessages': {
    color: '#14B8A6',
  },

  conversation: {
    flex: 1,
    backgroundColor: '#E5DDD5',
  },

  conversation__container: {
    flex: 1,
  },

  conversationHeader: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  conversationHeader__backButton: {
    padding: 4,
  },

  conversationHeader__avatarWrapper: {
    position: 'relative',
  },

  conversationHeader__avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  conversationHeader__avatarEmoji: {
    fontSize: 20,
  },

  conversationHeader__statusOnline: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: '#86EFAC',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00897B',
  },

  conversationHeader__info: {
    flex: 1,
  },

  conversationHeader__name: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },

  conversationHeader__status: {
    color: '#80CBC4',
    fontSize: 12,
  },

  conversationHeader__actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  conversationHeader__actionButton: {
    padding: 4,
  },

  messagesList: {
    flex: 1,
    backgroundColor: '#E5DDD5',
  },

  messagesList__content: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  messageItem: {
    marginBottom: 8,
  },

  'messageItem--sent': {
    alignItems: 'flex-end',
  },

  'messageItem--received': {
    alignItems: 'flex-start',
  },

  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  'messageBubble--sent': {
    backgroundColor: '#608ff6ff',
    borderTopRightRadius: 2,
  },

  'messageBubble--received': {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  messageBubble__text: {
    color: '#111827',
    fontSize: 14,
    lineHeight: 20,
  },

  messageBubble__time: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },

  messageInput: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    marginBottom: -30,
    paddingBottom: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  messageInput__wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  messageInput__emojiButton: {
    marginRight: 8,
  },

  messageInput__field: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    padding: 0,
  },

  messageInput__cameraButton: {
    marginLeft: 8,
  },

  messageInput__sendButton: {
    backgroundColor: '#14B8A6',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
