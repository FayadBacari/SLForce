import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
  },

  nav__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    maxWidth: 400,
    alignSelf: 'center',
  },

  nav__button: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  nav__buttonActive: {
    // optional style
  },

  nav__iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nav__iconWrapperActive: {
    backgroundColor: '#DBEAFE',
  },

  nav__label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
  },

  nav__labelActive: {
    color: '#2563EB',
  },
});
