import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },

  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },

  progressText: {
    textAlign: 'center',
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 14,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  stepContainer: {
    alignItems: 'center',
  },

  iconWrapper: {
    marginBottom: 32,
  },

  stepTitle: {
    color: '#1F2937',
    fontWeight: '900',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  stepSubtitle: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
    fontWeight: '700',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  inputReadOnly: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },

  badgesRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },

  badgeButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  badgeButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  badgeButtonText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 16,
  },

  badgeButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  priceInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  priceInput: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
    fontWeight: '900',
    fontSize: 36,
    textAlign: 'center',
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  priceUnit: {
    color: '#1F2937',
    fontWeight: '700',
    fontSize: 20,
  },

  experienceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  experienceInput: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
    fontWeight: '900',
    fontSize: 36,
    textAlign: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  experienceUnit: {
    color: '#1F2937',
    fontWeight: '700',
    fontSize: 20,
  },

  textArea: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
    fontWeight: '600',
    fontSize: 16,
    width: '100%',
    minHeight: 160,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 24,
  },

  disciplineBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  disciplineBadgeSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  disciplineBadgeText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 16,
  },

  disciplineBadgeTextSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  selectedInfo: {
    marginTop: 8,
  },

  selectedInfoText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },

  navigation: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },

  backButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  backButtonText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 16,
  },

  nextButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  nextButtonFull: {
    flex: 1,
  },

  nextButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.5,
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },
});
