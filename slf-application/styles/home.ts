import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  home__safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  home__scroll: {
    flex: 1,
  },
  home__scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 60,
  },
  home__header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  home__logoBackground: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  home__logoImage: {
    width: 100,
    height: 100,
  },
  home__title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  home__subtitle: {
    fontSize: 16,
    color: '#2563EB',
    marginTop: 6,
    textAlign: 'center',
  },
  home__linkWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  home__link: {
    fontSize: 15,
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
});

export default styles;
