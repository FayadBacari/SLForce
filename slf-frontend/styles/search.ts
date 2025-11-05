import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  search: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },

  search__header: {
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 24,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  'search__header-content': {
    marginBottom: 16,
  },

  'search__header-title': {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },

  'search__header-subtitle': {
    color: '#DBEAFE',
    fontSize: 14,
    fontWeight: '600',
  },

  'search__search-bar': {
    marginBottom: 16,
  },

  'search__search-input-wrapper': {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  'search__search-icon': {
    fontSize: 20,
    marginRight: 12,
  },

  'search__search-input': {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    paddingVertical: 12,
  },

  'search__search-clear': {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  'search__search-clear-icon': {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
  },

  search__categories: {
    marginTop: 8,
  },

  'search__categories-content': {
    paddingRight: 24,
    gap: 8,
  },

  search__category: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },

  'search__category--active': {
    backgroundColor: '#FFFFFF',
  },

  'search__category-icon': {
    fontSize: 18,
  },

  'search__category-text': {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  'search__category-text--active': {
    color: '#3B82F6',
  },

  search__stats: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },

  'search__stat-card': {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  'search__stat-emoji': {
    fontSize: 24,
    marginBottom: 4,
  },

  'search__stat-value': {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F2937',
  },

  'search__stat-label': {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  search__results: {
    flex: 1,
    paddingHorizontal: 16,
  },

  'search__results-header': {
    paddingVertical: 12,
  },

  'search__results-title': {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F2937',
    marginLeft: 20,
  },

  'search__results-list': {
    paddingBottom: 24,
  },

  'search__coach-card': {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },

  'search__coach-header': {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },

  'search__coach-avatar': {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  'search__coach-avatar-emoji': {
    fontSize: 32,
  },

  'search__coach-info': {
    flex: 1,
  },

  'search__coach-name-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },

  'search__coach-name': {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F2937',
  },

  'search__coach-verified': {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  'search__coach-verified-icon': {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  'search__coach-premium': {
    fontSize: 14,
  },

  'search__coach-speciality': {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 8,
  },

  'search__coach-location-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },

  'search__coach-location-icon': {
    fontSize: 12,
  },

  'search__coach-location': {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  'search__coach-stats': {
    flexDirection: 'row',
    gap: 16,
  },

  'search__coach-stat': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  'search__coach-stat-icon': {
    fontSize: 12,
  },

  'search__coach-stat-value': {
    fontSize: 12,
    fontWeight: '900',
    color: '#1F2937',
  },

  'search__coach-stat-label': {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  'search__coach-description': {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },

  'search__coach-skills': {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },

  'search__coach-skill': {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  'search__coach-skill-text': {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },

  'search__coach-footer': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },

  'search__coach-price-label': {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },

  'search__coach-price-wrapper': {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },

  'search__coach-price': {
    fontSize: 20,
    fontWeight: '900',
    color: '#1F2937',
  },

  'search__coach-price-period': {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },

  'search__coach-contact-btn': {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  'search__coach-contact-btn-text': {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default styles;
