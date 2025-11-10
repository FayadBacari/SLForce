// import of the different libraries
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Import CSS styles
import styles from './ui/searchHeader';

interface Category {
  id: string;
  label: string;
}

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: Category[];
}

const SearchHeader: React.FC<SearchHeaderProps> = React.memo(
  ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories }) => {
    return (
      <View style={styles['header']}>
        <View style={styles['header__content']}>
          <Text style={styles['header__title']}>Trouve ton Coach</Text>
          <Text style={styles['header__subtitle']}>Les meilleurs coachs de France 🇫🇷</Text>
        </View>

        {/* --- SEARCH BAR --- */}
        <View style={styles['header__search-bar']}>
          <View style={styles['header__search-input-wrapper']}>
            <Text style={styles['header__search-icon']}>🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher un coach..."
              placeholderTextColor="#9CA3AF"
              style={styles['header__search-input']}
              blurOnSubmit={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles['header__search-clear']}
              >
                <Text style={styles['header__search-clear-icon']}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* --- CATEGORIES --- */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles['header__categories']}
          contentContainerStyle={styles['header__categories-content']}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              style={[
                styles['header__category'],
                selectedCategory === cat.id && styles['header__category--active'],
              ]}
            >
              <Text
                style={[
                  styles['header__category-text'],
                  selectedCategory === cat.id && styles['header__category-text--active'],
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- STATS --- */}
        <View style={styles['header__stats']}>
          <View style={styles['header__stat-card']}>
            <Text style={styles['header__stat-value']}>30+</Text>
            <Text style={styles['header__stat-label']}>Coachs</Text>
          </View>
          <View style={styles['header__stat-card']}>
            <Text style={styles['header__stat-value']}>4.8</Text>
            <Text style={styles['header__stat-label']}>Note moy.</Text>
          </View>
          <View style={styles['header__stat-card']}>
            <Text style={styles['header__stat-value']}>76+</Text>
            <Text style={styles['header__stat-label']}>Élèves</Text>
          </View>
        </View>
      </View>
    );
  },
);

export default SearchHeader;
