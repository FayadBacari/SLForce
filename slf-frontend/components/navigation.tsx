// import of different libraries
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

// import css
import { styles } from './ui/navigation';

// import others pages 
import athlete from '../assets/images/athlete.jpg';
import search from '../assets/images/loupe.png';
import chat from '../assets/images/message.png';
import settings from '../assets/images/reglage.png';
import { NavigationProps, UserRole } from '../types';

const Navigation: React.FC<NavigationProps> = ({ activePage }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [role, setRole] = useState<UserRole>('eleve');

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

  const handleNavigate = (page: NavigationProps['activePage']) => {
    if (page === activePage) return;
    router.push(`/(tabs)/${page}` as const);
  };

  const navItems: {
    key: 'profileAthlete' | 'profileCoach' | 'search' | 'chat' | 'settings';
    label: string;
    image: any;
  }[] = [
    role === 'coach'
      ? { key: 'profileCoach' as const, label: 'Coach', image: athlete }
      : { key: 'profileAthlete' as const, label: 'Athlète', image: athlete },
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
