// import of the different libraries
import { useEffect, useMemo, useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// import of the different components
import SearchHeader from '../../components/searchHeader';
import { COACHES, CATEGORIES, type Coach } from '../../data/coaches';

// import CSS styles
import styles from '../../styles/search';

// Firebase
import app, { auth } from '../../firebaseConfig';
import { getFirestore, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

interface StudentProfile {
  uid: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  role?: 'eleve' | 'coach';
}

const db = getFirestore(app);

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [role, setRole] = useState<'eleve' | 'coach'>('eleve');
  const [students, setStudents] = useState<StudentProfile[]>([]);

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

  // Subscribe students if coach
  useEffect(() => {
    if (role !== 'coach') return;
    const user = auth.currentUser;
    if (!user) return;
    const q = query(
      collection(db, 'users'),
      where('role', '==', 'eleve'),
      orderBy('displayName')
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const arr: StudentProfile[] = snap.docs.map((d) => ({ uid: d.id, ...(d.data() as any) }));
        setStudents(arr);
      },
      (err) => {
        console.warn('Firestore users listener error:', err.code || err.message);
      }
    );
    return () => unsub();
  }, [role]);

  const coaches: Coach[] = COACHES;

  const filteredCoaches = useMemo(() => {
    return coaches.filter(
      (coach) =>
        coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      (s.displayName || '').toLowerCase().includes(q) || (s.email || '').toLowerCase().includes(q),
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
            {item.verified && (
              <View style={styles['search__coach-verified']}>
                <Text style={styles['search__coach-verified-icon']}>✓</Text>
              </View>
            )}
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
            <Text style={styles['search__coach-name']}>{item.displayName || item.email || 'Élève'}</Text>
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
  const headerSubtitle = isCoach ? 'Recherche dans les profils élèves' : 'Les meilleurs coachs de France 🇫🇷';
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
