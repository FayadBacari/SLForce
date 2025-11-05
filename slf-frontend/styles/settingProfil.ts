import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },

  profile__header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  'profile__header-top': {
    flexDirection: 'row',
    alignItems: 'center',
  },

  'profile__back-btn': {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  'profile__back-icon': {
    fontSize: 32,
    color: '#3B82F6',
    fontWeight: '400',
  },

  profile__scroll: {
    flex: 1,
  },

  'profile__scroll-content': {
    paddingBottom: 100,
  },

  'profile__photo-section': {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },

  'profile__photo-wrapper': {
    marginBottom: 16,
  },

  profile__photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#3B82F6',
  },

  'profile__photo-placeholder': {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  'profile__photo-emoji': {
    fontSize: 48,
  },

  'profile__photo-btn': {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  'profile__photo-btn-text': {
    fontSize: 17,
    fontWeight: '400',
    color: '#3B82F6',
  },

  'profile__section-header': {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },

  'profile__section-title': {
    fontSize: 13,
    fontWeight: '400',
    color: '#8E8E93',
    letterSpacing: 0.5,
  },

  profile__card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 10,
  },

  profile__field: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },

  'profile__field-header': {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  'profile__field-icon-wrapper': {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  'profile__field-icon': {
    fontSize: 16,
  },

  'profile__field-label': {
    fontSize: 13,
    fontWeight: '400',
    color: '#8E8E93',
  },

  'profile__field-input': {
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    paddingVertical: 4,
  },

  'profile__password-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
  },

  'profile__password-input': {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    paddingVertical: 4,
  },

  'profile__password-toggle': {
    padding: 8,
  },

  'profile__password-toggle-text': {
    fontSize: 18,
  },

  'profile__save-btn': {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  'profile__save-btn-text': {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  'profile__password-btn': {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  'profile__password-btn-text': {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  'profile__info-box': {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },

  'profile__info-icon': {
    fontSize: 24,
  },

  'profile__info-content': {
    flex: 1,
  },

  'profile__info-title': {
    fontSize: 15,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },

  'profile__info-text': {
    fontSize: 13,
    fontWeight: '400',
    color: '#92400E',
    lineHeight: 18,
  },

  profile__actions: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  'profile__action-item': {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },

  'profile__action-icon-wrapper': {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  'profile__action-icon': {
    fontSize: 28,
  },

  'profile__action-info': {
    flex: 1,
  },

  'profile__action-title': {
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 2,
  },

  'profile__action-subtitle': {
    fontSize: 15,
    fontWeight: '400',
    color: '#8E8E93',
  },

  profile__chevron: {
    fontSize: 22,
    color: '#C7C7CC',
    fontWeight: '600',
  },
});

export default styles;
