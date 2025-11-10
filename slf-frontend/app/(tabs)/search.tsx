// import of the different libraries
import { useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

// import of the different components
import SearchHeader from '../../components/searchHeader';
import { COACHES, CATEGORIES, type Coach } from '../../data/coaches';

// import CSS styles
import styles from '../../styles/search';


const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const coaches: Coach[] = COACHES;

  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFF6FF' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.search}
          data={filteredCoaches}
          renderItem={renderCoach}
          keyExtractor={(item) => item.id.toString()}
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
              categories={CATEGORIES}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
