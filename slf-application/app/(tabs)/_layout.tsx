// Import of the different libraries
import { Slot, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

// Import of the different components
import Navigation from '../../components/navigation';
import { navState } from '../../utils/navigationState';

// Logical order of pages in the NavBar
const OFFSET = 400;
const PAGE_ORDER = ['profile', 'search', 'chat', 'settings'] as const;


export default function TabLayout() {
  const pathname = usePathname();
  const translateX = useRef(new Animated.Value(0)).current;
  const previousPage = useRef<string | null>(null);
  const currentPage = PAGE_ORDER.find((p) => pathname.includes(p)) || 'profile';
  const isHomePage = pathname === '/' || pathname.includes('/index');

  // List of subpages that should not display the NavBar
  const isSubPage =
    pathname.includes('/gpu') ||
    pathname.includes('/privacy') ||
    pathname.includes('/payment') ||
    pathname.includes('/support') ||
    pathname.includes('/register') ||
    pathname.includes('/settingProfil');

  useEffect(() => {
    const previous = previousPage.current;
    const wasOnSubPage = previousPage.current === 'subpage';

    // If returning from a subpage to a main page
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
    // If navigating to a subpage
    else if (!wasOnSubPage && isSubPage) {
      // Right-to-left animation (navigate to subpage)
      translateX.setValue(OFFSET);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
    // Navigation between main pages
    else if (previous && currentPage && previous !== currentPage && !isSubPage) {
      const currentIndex = PAGE_ORDER.indexOf(currentPage as (typeof PAGE_ORDER)[number]);
      const previousIndex = PAGE_ORDER.indexOf(previous as (typeof PAGE_ORDER)[number]);

      // Determines the direction of the transition
      const direction = currentIndex > previousIndex ? 1 : -1;

      // Starting position (off-screen)
      translateX.setValue(direction * OFFSET);

      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }

    previousPage.current = isSubPage ? 'subpage' : currentPage || null;
  }, [pathname, isSubPage, currentPage, translateX]);

  return (
    <View style={{ flex: 1, backgroundColor: '#EFF6FF' }}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#EFF6FF',
          transform: [{ translateX }],
        }}
      >
        <Slot />
      </Animated.View>

      {/* Displays the NavBar only on main pages (not Home or subpages) */}
      {!isHomePage && !isSubPage && <Navigation activePage={currentPage as any} />}
    </View>
  );
}
