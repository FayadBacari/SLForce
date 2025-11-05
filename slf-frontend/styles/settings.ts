import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },

  header: {
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },

  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainerProfil: {
    width: 60,
    height: 60,
    backgroundColor: '#4285F4',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  iconText: {
    fontSize: 28,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileUsername: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  membershipContainer: {
    marginTop: 5,
  },
  membershipText: {
    fontSize: 12,
    color: '#666',
  },

  section: {
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#d32f2f',
  },

  warningTitle: {
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: '700',
    color: '#d32f2f',
    marginBottom: 10,
  },

  deleteAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: '#c03939ff',
    borderColor: '#d32f2f',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  iconTrash: {
    fontSize: 20,
  },

  deleteAccountTextContainer: {
    flexDirection: 'column',
    flex: 1,
  },

  deleteAccountTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },

  deleteAccountSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  arrowText: {
    fontSize: 24,
    color: '#666',
  },

  logoutButtonRed: {
    backgroundColor: '#d32f2f',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonRedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
