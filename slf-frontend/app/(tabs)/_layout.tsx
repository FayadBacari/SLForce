// import of different libraries
import { useEffect, useRef } from 'react';
import { Slot, usePathname } from 'expo-router';
import { Animated, Easing, View } from 'react-native';
import { navState } from '../../utils/navigationState';

// import component 
import Navigation from '../../components/navigation';

const OFFSET = 400;
const PAGE_ORDER = ['profile', 'search', 'chat', 'settings'] as const;

export default function TabLayout() {
  const pathname = usePathname();
  const translateX = useRef(new Animated.Value(0)).current;
  const previousPage = useRef<string | null>(null);
  const currentPage = PAGE_ORDER.find((p) => pathname.includes(p)) || 'profile';
  const isHomePage = pathname === '/' || pathname.includes('/index');
  const lowerPath = (pathname || '').toLowerCase();
  const isSettingsSubPage = lowerPath.includes('/settings/') && 
    !lowerPath.endsWith('/settings') && 
    lowerPath !== '/settings';
  
  const isSubPage =
    lowerPath.includes('/payment') ||
    lowerPath.includes('/register') ||
    isSettingsSubPage ||
    lowerPath.includes('/gpusetting') || 
    lowerPath.includes('/profilsetting') ||
    lowerPath.includes('/privacysetting') ||
    lowerPath.includes('/supportsetting') ||
    lowerPath.includes('/profilesetting');

  useEffect(() => {
    const previous = previousPage.current;
    const wasOnSubPage = previousPage.current === 'subpage';
    const wasOnSettingsSubPage = previous && typeof previous === 'string' && previous.startsWith('settings/');

    if (isSettingsSubPage || wasOnSettingsSubPage) {
      translateX.setValue(0);
      const settingsPageMatch = lowerPath.match(/\/settings\/([^\/]+)/);
      previousPage.current = settingsPageMatch ? `settings/${settingsPageMatch[1]}` : 'subpage';
      return;
    }

    if (wasOnSubPage && !isSubPage) {
      if (navState.gestureBack) {
        translateX.setValue(0);
        navState.gestureBack = false;
      } else {
        translateX.setValue(-OFFSET);
        Animated.timing(translateX, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    }
    else if (!wasOnSubPage && isSubPage && !isSettingsSubPage) {
      translateX.setValue(OFFSET);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        }).start();
    }
    else if (previous && currentPage && previous !== currentPage && !isSubPage) {
      const currentIndex = PAGE_ORDER.indexOf(currentPage as (typeof PAGE_ORDER)[number]);
      const previousIndex = PAGE_ORDER.indexOf(previous as (typeof PAGE_ORDER)[number]);
      const direction = currentIndex > previousIndex ? 1 : -1;
      translateX.setValue(direction * OFFSET);

      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        }).start();
    }
    else if (previous === (isSubPage ? 'subpage' : currentPage)) {
      translateX.setValue(0);
    }

    previousPage.current = isSubPage ? 'subpage' : currentPage || null;
  }, [pathname, isSubPage, isSettingsSubPage, currentPage, translateX, lowerPath]);

  const shouldApplyAnimation = !isSettingsSubPage;
  
  return (
    <View style={{ flex: 1, backgroundColor: '#EFF6FF' }}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#EFF6FF',
          transform: shouldApplyAnimation ? [{ translateX }] : [],
        }}
      >
        <Slot />
      </Animated.View>

      {!isHomePage && !isSubPage && <Navigation activePage={currentPage as any} />}
    </View>
  );
}
