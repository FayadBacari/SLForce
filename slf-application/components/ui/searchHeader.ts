import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 24,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  // --- HEADER TEXT ---
  header__content: {
    marginBottom: 16,
  },
  header__title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 4,
  },
  header__subtitle: {
    color: '#DBEAFE',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- SEARCH BAR ---
  'header__search-bar': {
    marginBottom: 16,
  },
  'header__search-input-wrapper': {
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
    elevation: 3,
  },
  'header__search-icon': {
    fontSize: 20,
    marginRight: 8,
  },
  'header__search-input': {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    paddingVertical: 10,
  },
  'header__search-clear': {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'header__search-clear-icon': {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
  },

  // --- CATEGORIES ---
  header__categories: {
    marginTop: 8,
  },
  'header__categories-content': {
    paddingRight: 24,
    gap: 8,
  },
  header__category: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    gap: 8,
  },
  'header__category--active': {
    backgroundColor: '#FFFFFF',
  },
  'header__category-icon': {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 8,
  },
  'header__category-text': {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  'header__category-text--active': {
    color: '#3B82F6',
  },

  // --- STATS ---
  header__stats: {
    flexDirection: 'row',
    paddingTop: 16,
    gap: 12,
  },
  'header__stat-card': {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  'header__stat-value': {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F2937',
  },
  'header__stat-label': {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  header__results: {
    paddingTop: 16,
  },
  'header__results-title': {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F2937',
  },
});

export default styles;
