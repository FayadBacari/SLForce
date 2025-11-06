import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  payments__chibrax: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },

  'help__scroll-content': {
    paddingBottom: 100,
    backgroundColor: '#EFF6FF',
  },

  'help__search-section': {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  'help__search-wrapper': {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  'help__search-icon': {
    fontSize: 18,
    marginRight: 8,
    opacity: 0.5,
  },

  'help__search-input': {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    paddingVertical: 8,
  },

  // Element: quick contact
  'help__quick-contact': {
    paddingHorizontal: 16,
    gap: 0,
  },

  'help__contact-card': {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },

  'help__contact-icon-wrapper': {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  'help__contact-icon': {
    fontSize: 28,
  },

  'help__contact-info': {
    flex: 1,
  },

  'help__contact-title': {
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 2,
  },

  'help__contact-subtitle': {
    fontSize: 15,
    fontWeight: '400',
    color: '#8E8E93',
  },

  help__chevron: {
    fontSize: 22,
    color: '#C7C7CC',
    fontWeight: '600',
  },

  // Element: section header
  'help__section-header': {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },

  'help__section-title': {
    fontSize: 13,
    fontWeight: '400',
    color: '#8E8E93',
    letterSpacing: 0.5,
  },

  // Element: FAQ list
  'help__faq-list': {
    paddingHorizontal: 16,
  },

  'help__faq-item': {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },

  'help__faq-item--expanded': {
    borderBottomWidth: 0,
  },

  'help__faq-question-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  'help__faq-question': {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    marginRight: 12,
  },

  'help__faq-toggle': {
    fontSize: 24,
    color: '#3B82F6',
    fontWeight: '300',
    width: 24,
    textAlign: 'center',
  },

  'help__faq-answer-wrapper': {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },

  'help__faq-answer': {
    fontSize: 15,
    fontWeight: '400',
    color: '#8E8E93',
    lineHeight: 20,
  },

  // Element: form card
  'help__form-card': {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 16,
  },

  'help__form-header': {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  'help__form-icon-wrapper': {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  'help__form-icon': {
    fontSize: 28,
  },

  'help__form-info': {
    flex: 1,
  },

  'help__form-title': {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },

  'help__form-subtitle': {
    fontSize: 15,
    fontWeight: '400',
    color: '#8E8E93',
  },

  'help__form-textarea': {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 16,
  },

  'help__form-submit': {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  'help__form-submit-text': {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Element: info box
  'help__info-box': {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: '#E0F2FE',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },

  'help__info-icon': {
    fontSize: 24,
  },

  'help__info-content': {
    flex: 1,
  },

  'help__info-title': {
    fontSize: 15,
    fontWeight: '600',
    color: '#0369A1',
    marginBottom: 4,
  },

  'help__info-text': {
    fontSize: 13,
    fontWeight: '400',
    color: '#0369A1',
    lineHeight: 18,
  },
});

export default styles;
