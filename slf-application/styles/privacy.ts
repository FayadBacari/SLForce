import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  privacy__safeArea: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  privacy__scroll: {
    flex: 1,
  },
  privacy__scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  privacy__header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  privacy__title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },
  privacy__subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  privacy__section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  privacy__sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  privacy__text: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  privacy__footer: {
    marginTop: 25,
    alignItems: 'center',
  },
  privacy__link: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  privacy__button: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  privacy__buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default styles;
