// import of the different libraries
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

// import component 
import SearchHeader from '../../components/searchHeader';
import { CATEGORIES, type Coach } from '../../data/coaches';

// import css 
import styles from '../../styles/search';
import { StudentProfile, UserRole } from '../../types';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [role, setRole] = useState<UserRole>('eleve');
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [dbCoachs, setDbCoachs] = useState<any[]>([]);

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

  useEffect(() => {
    const loadCoachs = async () => {
      try {
        const res = await fetch('http://localhost:5132/coachs', { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setDbCoachs(data.coachs || []);
      } catch (err) {
      }
    };
    loadCoachs();
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await fetch('http://localhost:5132/students', {
          method: 'GET',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        const dbStudents: StudentProfile[] = data.students.map((s: any) => ({
          uid: s._id,
          firstName: s.firstName,
          lastName: s.lastName,
          avatar: s.athleteProfile?.avatar || '👤',
          role: s.role,
        }));

        setStudents(dbStudents);
      } catch (err) {
      }
    };

    loadStudents();
  }, []);

  const coaches: Coach[] = dbCoachs.map((c: any, index: number) => ({
    id: index + 1,
    name: c.coachProfile?.name || `${c.firstName} ${c.lastName}`,
    avatar: c.coachProfile?.avatar || '🏋️',
    speciality: c.coachProfile?.speciality || 'Coach sportif',
    location: c.coachProfile?.location || 'Inconnu',
    rating: c.coachProfile?.rating || 5,
    reviews: c.coachProfile?.reviews || 0,
    students: c.students || 0,
    price: c.coachProfile?.price || 0,
    experience: c.coachProfile?.experience || 0,
    description: c.coachProfile?.description || '',
    skills: c.coachProfile?.skills || [],
  }));

  const filteredCoaches = useMemo(() => {
    if (selectedCategory === 'all') {
      return coaches.filter(coach => {
        const q = searchQuery.toLowerCase();
        return (
          coach.name.toLowerCase().includes(q) ||
          coach.speciality.toLowerCase().includes(q) ||
          coach.location.toLowerCase().includes(q)
        );
      });
    }

    return coaches.filter(coach => {
      const q = searchQuery.toLowerCase();
      const category = selectedCategory;

      const matchesSearch =
        coach.name.toLowerCase().includes(q) ||
        coach.speciality.toLowerCase().includes(q) ||
        coach.location.toLowerCase().includes(q);

      const hasCategoryBadge =
        coach.skills.some(skill => skill === category) ||
        coach.speciality === category;

      return matchesSearch && hasCategoryBadge;
    });
  }, [coaches, searchQuery, selectedCategory]);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        (s.firstName || '').toLowerCase().includes(q) ||
        (s.lastName || '').toLowerCase().includes(q),
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
              {item.firstName || item.lastName || 'Élève'}
              &nbsp; {/* space between the name and the first name */}
              {item.lastName || item.lastName || 'Élève'}
            </Text>
          </View>
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
