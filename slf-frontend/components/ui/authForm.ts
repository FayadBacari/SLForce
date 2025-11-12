import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  auth__container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  auth__tabs: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  auth__tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  auth__tabActive: {
    backgroundColor: '#2563EB',
  },
  auth__tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  auth__tabTextActive: {
    color: '#FFFFFF',
  },

  auth__inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  auth__icon: {
    marginRight: 10,
  },
  auth__input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    paddingVertical: 4,
    marginLeft: 8,
  },

  auth__roleSection: {
    marginTop: 15,
    marginBottom: 10,
  },
  auth__roleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  auth__roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  auth__roleButton: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  auth__roleButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  auth__roleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  auth__roleButtonTextActive: {
    color: '#FFFFFF',
  },

  auth__button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  auth__buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
});

export default styles;
