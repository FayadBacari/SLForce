// import of the different libraries
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './ui/navigation';
// import JPG images (one per icon)
import athlete from '../assets/images/athlete.jpg';
import search from '../assets/images/loupe.png';
import chat from '../assets/images/message.png';
import settings from '../assets/images/reglage.png';

type NavigationProps = {
  activePage: 'profile' | 'profileCoach' | 'search' | 'chat' | 'settings';
};

const Navigation: React.FC<NavigationProps> = ({ activePage }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [role, setRole] = useState<'eleve' | 'coach'>('eleve');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const storedRole = await SecureStore.getItemAsync('role');
        if (isMounted && (storedRole === 'coach' || storedRole === 'eleve')) {
          setRole(storedRole);
        }
      } catch {}
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Simple navigation handler
  const handleNavigate = (page: NavigationProps['activePage']) => {
    if (page === activePage) return;
    router.push(`/(tabs)/${page}` as const);
  };

  // Button configuration - dynamic based on role
  const navItems: {
    key: 'profile' | 'profileCoach' | 'search' | 'chat' | 'settings';
    label: string;
    image: any;
  }[] = [
    role === 'coach'
      ? { key: 'profileCoach' as const, label: 'Coach', image: athlete }
      : { key: 'profile' as const, label: 'Athlète', image: athlete },
    { key: 'search' as const, label: 'Recherche', image: search },
    { key: 'chat' as const, label: 'Messages', image: chat },
    { key: 'settings' as const, label: 'Réglages', image: settings },
  ];

  const filteredNavItems = navItems;

  return (
    <View style={[styles.nav, Platform.OS === 'ios' ? { paddingBottom: insets.bottom } : null]}>
      <View style={styles.nav__container}>
        {filteredNavItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => handleNavigate(item.key)}
            style={[styles.nav__button, activePage === item.key && styles.nav__buttonActive]}
          >
            <View
              style={[
                styles.nav__iconWrapper,
                activePage === item.key && styles.nav__iconWrapperActive,
              ]}
            >
              <Image
                source={item.image}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  opacity: activePage === item.key ? 1 : 0.6,
                }}
                resizeMode="cover"
              />
            </View>
            <Text style={[styles.nav__label, activePage === item.key && styles.nav__labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Navigation;
