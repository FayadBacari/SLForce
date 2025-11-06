import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cgu__safeArea: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  cgu__scroll: {
    flex: 1,
  },
  cgu__scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  cgu__header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  cgu__title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
  },
  cgu__subtitle: {
    color: '#64748B',
    fontSize: 15,
    marginTop: 4,
  },
  cgu__card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cgu__introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cgu__logoWrapper: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cgu__logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  cgu__introContent: {
    flex: 1,
  },
  cgu__introTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  cgu__introText: {
    fontSize: 14,
    color: '#475569',
  },
  cgu__introFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
  cgu__introLabel: {
    fontSize: 14,
    color: '#475569',
  },
  cgu__introDate: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  cgu__alertBox: {
    backgroundColor: '#FEF2F2',
    borderLeftColor: '#F87171',
    borderLeftWidth: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 20,
  },
  cgu__alertText: {
    color: '#DC2626',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  cgu__section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cgu__sectionTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 6,
  },
  cgu__text: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
  },
  cgu__contactBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  cgu__contactTitle: {
    fontWeight: '700',
    color: '#1E3A8A',
    fontSize: 16,
    marginBottom: 4,
  },
  cgu__contactSubtitle: {
    color: '#475569',
    fontSize: 14,
    marginBottom: 10,
  },
  cgu__contactItem: {
    color: '#2563EB',
    fontSize: 14,
    marginBottom: 4,
  },
  cgu__link: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  cgu__button: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    marginVertical: 25,
  },
  cgu__buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
