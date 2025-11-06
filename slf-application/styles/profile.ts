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

  'button--saveRecords': {
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
    marginBottom: 8,
  },

  profile__username: {
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

  genderSelector: {
    flexDirection: 'row',
    gap: 12,
  },

  genderSelector__button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  'genderSelector__button--active': {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  'genderSelector__button--disabled': {
    opacity: 0.5,
  },

  genderSelector__emoji: {
    fontSize: 28,
    marginBottom: 4,
  },

  genderSelector__text: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4B5563',
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  categoryGrid__button: {
    width: '23%',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  'categoryGrid__button--active': {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  'categoryGrid__button--disabled': {
    opacity: 0.5,
  },

  categoryGrid__text: {
    fontSize: 12,
    fontWeight: '900',
    color: '#4B5563',
  },

  'categoryGrid__text--active': {
    color: '#FFFFFF',
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

  recordsList: {
    gap: 16,
  },

  recordItem: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
  },

  'recordItem--red': {
    backgroundColor: '#FEF2F2',
    borderColor: '#FED7AA',
  },

  'recordItem--blue': {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },

  'recordItem--green': {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },

  'recordItem--yellow': {
    backgroundColor: '#FEFCE8',
    borderColor: '#FEF08A',
  },

  recordItem__header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },

  recordItem__label: {
    flex: 1,
    color: '#374151',
    fontWeight: '900',
    fontSize: 12,
  },

  recordItem__inputWrapper: {
    position: 'relative',
  },

  recordItem__input: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    fontWeight: '900',
    fontSize: 24,
    textAlign: 'center',
  },

  'recordItem__input--active': {
    borderColor: '#F97316',
  },

  'recordItem__input--disabled': {
    opacity: 0.5,
  },

  recordItem__unit: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
    color: '#6B7280',
    fontWeight: '700',
    fontSize: 12,
  },

  totalCard: {
    backgroundColor: '#A855F7',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },

  totalCard__content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalCard__subtitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.9,
  },

  totalCard__total: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 48,
  },

  totalCard__unit: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.9,
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
});
