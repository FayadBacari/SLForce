import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  payments__safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  payments__container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'relative',
    top: 10,
  },
  payments__header: {
    marginBottom: 20,
  },
  payments__title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
  },
  payments__subtitle: {
    color: '#64748B',
    fontSize: 15,
    marginTop: 4,
  },
  payments__section: {
    marginBottom: 25,
  },
  payments__sectionTitle: {
    fontWeight: '700',
    color: '#1E3A8A',
    fontSize: 18,
    marginBottom: 10,
  },
  payments__card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  payments__cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  payments__paypalLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  payments__cardText: {
    fontSize: 15,
    color: '#0F172A',
  },
  payments__verified: {
    color: '#22C55E',
    fontSize: 13,
  },
  payments__edit: {
    color: '#2563EB',
    fontWeight: '600',
  },
  payments__subscription: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  payments__coachInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  payments__coachAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  payments__coachIcon: {
    fontSize: 24,
  },
  payments__coachName: {
    fontSize: 16,
    fontWeight: '700',
  },
  payments__coachType: {
    fontSize: 14,
    color: '#64748B',
  },
  payments__coachStatus: {
    fontSize: 13,
    color: '#22C55E',
  },
  payments__price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 10,
  },
  payments__buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payments__pause: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  payments__cancel: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  payments__cancelText: {
    color: '#DC2626',
    fontWeight: '600',
  },
  payments__total: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  payments__totalLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  payments__totalAmount: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    marginVertical: 6,
  },
  payments__totalSub: {
    color: '#BFDBFE',
    fontSize: 14,
  },
  payments__historyItem: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  payments__historyCoach: {
    fontWeight: '600',
    fontSize: 15,
  },
  payments__historyDate: {
    color: '#64748B',
    fontSize: 13,
  },
  payments__historyPrice: {
    fontSize: 14,
  },
  payments__paid: {
    color: '#22C55E',
    fontWeight: '600',
  },
  payments__footer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
  },
  payments__footerTitle: {
    color: '#1E3A8A',
    fontWeight: '700',
    marginBottom: 6,
  },
  payments__footerText: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default styles;
