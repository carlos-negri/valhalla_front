import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    zIndex: 1000,
    alignItems: 'flex-start',
  },

  container: {
    width: 260,
    backgroundColor: '#2b2b2b',
    paddingTop: 56,
    paddingHorizontal: 18,
    paddingBottom: 24,
    height: '100%',
    elevation: 12,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
  },

  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },

  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 24,
  },

  logout: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },

  logoutText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 6,
    borderRadius: 6,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});
