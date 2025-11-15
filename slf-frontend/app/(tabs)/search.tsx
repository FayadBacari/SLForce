// import of the different libraries
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import of the different components
import SearchHeader from '../../components/searchHeader';
import { COACHES, CATEGORIES, type Coach } from '../../data/coaches';
// import CSS styles
import styles from '../../styles/search';

interface StudentProfile {
  uid: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  role?: 'eleve' | 'coach';
}

// Données mockées pour les élèves (aucun Firestore)
const MOCK_STUDENTS: StudentProfile[] = [
  {
    uid: 's1',
    displayName: 'Lina – Débutante',
    email: 'lina@example.com',
    avatar: '👩‍🎓',
    role: 'eleve',
  },
  {
    uid: 's2',
    displayName: 'Yanis – Intermédiaire',
    email: 'yanis@example.com',
    avatar: '🧑‍🎓',
    role: 'eleve',
  },
];

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [role, setRole] = useState<'eleve' | 'coach'>('eleve');
  const [students] = useState<StudentProfile[]>(MOCK_STUDENTS);

  // Load role from SecureStore
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await SecureStore.getItemAsync('role');
        if (mounted && (stored === 'coach' || stored === 'eleve')) setRole(stored);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const coaches: Coach[] = COACHES;

  const filteredCoaches = useMemo(() => {
    return coaches.filter(
      (coach) =>
        coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [coaches, searchQuery]);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        (s.displayName || '').toLowerCase().includes(q) ||
        (s.email || '').toLowerCase().includes(q),
    );
  }, [students, searchQuery]);

  const renderCoach = ({ item }: { item: Coach }) => (
    <TouchableOpacity style={styles['search__coach-card']}>
      <View style={styles['search__coach-header']}>
        <View style={styles['search__coach-avatar']}>
          <Text style={styles['search__coach-avatar-emoji']}>{item.avatar}</Text>
        </View>
        <View style={styles['search__coach-info']}>
          <View style={styles['search__coach-name-wrapper']}>
            <Text style={styles['search__coach-name']}>{item.name}</Text>
          </View>
          <Text style={styles['search__coach-speciality']}>{item.speciality}</Text>
          <View style={styles['search__coach-location-wrapper']}>
            <Text style={styles['search__coach-location-icon']}>📍</Text>
            <Text style={styles['search__coach-location']}>{item.location}</Text>
          </View>
          <View style={styles['search__coach-stats']}>
            <View style={styles['search__coach-stat']}>
              <Text style={styles['search__coach-stat-icon']}>👥</Text>
              <Text style={styles['search__coach-stat-label']}>{item.students}</Text>
            </View>
            <View style={styles['search__coach-stat']}>
              <Text style={styles['search__coach-stat-icon']}>🏅</Text>
              <Text style={styles['search__coach-stat-label']}>{item.experience}</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles['search__coach-description']}>{item.description}</Text>

      <View style={styles['search__coach-skills']}>
        {item.skills.map((skill, index) => (
          <View key={index} style={styles['search__coach-skill']}>
            <Text style={styles['search__coach-skill-text']}>{skill}</Text>
          </View>
        ))}
      </View>

      <View style={styles['search__coach-footer']}>
        <View>
          <Text style={styles['search__coach-price-label']}>À partir de</Text>
          <View style={styles['search__coach-price-wrapper']}>
            <Text style={styles['search__coach-price']}>{item.price}€</Text>
            <Text style={styles['search__coach-price-period']}>/mois</Text>
          </View>
        </View>
        <TouchableOpacity style={styles['search__coach-contact-btn']}>
          <Text style={styles['search__coach-contact-btn-text']}>Contacter</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderStudent = ({ item }: { item: StudentProfile }) => (
    <TouchableOpacity style={styles['search__coach-card']}>
      <View style={styles['search__coach-header']}>
        <View style={styles['search__coach-avatar']}>
          <Text style={styles['search__coach-avatar-emoji']}>{item.avatar || '👤'}</Text>
        </View>
        <View style={styles['search__coach-info']}>
          <View style={styles['search__coach-name-wrapper']}>
            <Text style={styles['search__coach-name']}>
              {item.displayName || item.email || 'Élève'}
            </Text>
          </View>
          <Text style={styles['search__coach-speciality']}>{item.email}</Text>
        </View>
      </View>

      <View style={styles['search__coach-footer']}>
        <View />
        <TouchableOpacity style={styles['search__coach-contact-btn']}>
          <Text style={styles['search__coach-contact-btn-text']}>Contacter</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const isCoach = role === 'coach';
  const listData = isCoach ? filteredStudents : filteredCoaches;
  const renderItem = isCoach ? renderStudent : renderCoach;
  const headerTitle = isCoach ? 'Trouve un élève' : 'Trouve ton Coach';
  const headerSubtitle = isCoach
    ? 'Recherche dans les profils élèves'
    : 'Les meilleurs coachs de France 🇫🇷';
  const headerPlaceholder = isCoach ? 'Rechercher un élève...' : 'Rechercher un coach...';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFF6FF' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.search}
          data={listData as any}
          renderItem={renderItem as any}
          keyExtractor={(item: any) => (isCoach ? item.uid : item.id.toString())}
          contentContainerStyle={{
            ...styles['search__results-list'],
            paddingBottom: 96,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <SearchHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={isCoach ? [] : CATEGORIES}
              title={headerTitle}
              subtitle={headerSubtitle}
              placeholder={headerPlaceholder}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
