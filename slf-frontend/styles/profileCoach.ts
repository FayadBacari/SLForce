import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },

  app__container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  header__content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  header__title: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 28,
    marginBottom: 4,
  },

  header__subtitle: {
    color: '#BFDBFE',
    fontWeight: '600',
    fontSize: 14,
  },

  main: {
    flex: 1,
  },

  main__content: {
    padding: 16,
    paddingBottom: 96,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  card__header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  card__titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  card__title: {
    color: '#1F2937',
    fontWeight: '900',
    fontSize: 20,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  'button--icon': {
    padding: 8,
  },

  'button--primary': {
    backgroundColor: '#DBEAFE',
  },

  'button--danger': {
    backgroundColor: '#FEE2E2',
  },

  'button--warning': {
    backgroundColor: '#FED7AA',
  },

  'button--full': {
    width: '100%',
    marginTop: 16,
  },

  'button--save': {
    backgroundColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  'button--saveDetails': {
    backgroundColor: '#F97316',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  button__text: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  profile: {
    alignItems: 'center',
    marginBottom: 24,
  },

  profile__photoWrapper: {
    position: 'relative',
    marginBottom: 12,
  },

  profile__photo: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  profile__photoPlaceholder: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  profile__photoEmoji: {
    fontSize: 64,
  },

  profile__cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  profile__nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  profile__nameInput: {
    textAlign: 'center',
    color: '#1F2937',
    fontWeight: '900',
    fontSize: 24,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginBottom: 8,
    minWidth: 200,
  },

  profile__name: {
    color: '#1F2937',
    fontWeight: '900',
    fontSize: 24,
  },

  profile__titleInput: {
    textAlign: 'center',
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3B82F6',
    minWidth: 180,
  },

  profile__title: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 14,
  },

  field: {
    marginBottom: 16,
  },

  field__label: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
  },

  field__labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },

  statsRow__item: {
    flex: 1,
  },

  input: {
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    fontWeight: '700',
    fontSize: 16,
  },

  'input--active': {
    borderColor: '#3B82F6',
  },

  'input--disabled': {
    opacity: 0.5,
  },

  textArea: {
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    fontWeight: '500',
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },

  'textArea--active': {
    borderColor: '#F97316',
  },

  'textArea--disabled': {
    opacity: 0.5,
  },

  specialtyBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },

  specialtyBadge__input: {
    color: '#1F2937',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
  },

  specialtyBadge__text: {
    color: '#1F2937',
    fontWeight: '700',
    fontSize: 14,
  },

  priceSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },

  priceSection__label: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 8,
  },

  priceSection__wrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },

  priceSection__input: {
    color: '#1F2937',
    fontWeight: '900',
    fontSize: 32,
    minWidth: 80,
  },

  'priceSection__input--active': {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#F97316',
  },

  'priceSection__input--disabled': {
    opacity: 1,
  },

  priceSection__currency: {
    color: '#1F2937',
    fontWeight: '900',
    fontSize: 32,
  },

  priceSection__period: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 16,
  },

  contactButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  contactButton__text: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },

  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#BFDBFE',
    flexDirection: 'row',
    gap: 12,
  },

  infoBox__content: {
    flex: 1,
  },

  infoBox__title: {
    color: '#1E40AF',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 4,
  },

  infoBox__text: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
  },

  disciplinesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  disciplineBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minWidth: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  disciplineBadgeSelected: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  disciplineBadgeDisabled: {
    opacity: 0.7,
  },

  disciplineBadgeText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 13,
  },

  disciplineBadgeTextSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  disciplinesCounter: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
});