import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f8fa',
    padding: 20,
  },
  logoContainer: {
    backgroundColor: '#4285F4',
    padding: 25,
    borderRadius: 25,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  footer: {
    fontSize: 14,
    color: '#1a0dab',
    marginTop: 10,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 16,
  },
  highlight: {
    color: '#1565c0',
    fontWeight: '600',
  },
});
