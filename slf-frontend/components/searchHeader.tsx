// import of different libraries
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// import css
import styles from './ui/searchHeader';
import { Category, SearchHeaderProps } from '../types';

const SearchHeader: React.FC<SearchHeaderProps> = React.memo(
  ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    title,
    subtitle,
    placeholder,
  }) => {
    return (
      <View style={styles['header']}>
        <View style={styles['header__content']}>
          <Text style={styles['header__title']}>{title || 'Trouve ton Coach'}</Text>
          <Text style={styles['header__subtitle']}>
            {subtitle || 'Les meilleurs coachs de France 🇫🇷'}
          </Text>
        </View>

        <View style={styles['header__search-bar']}>
          <View style={styles['header__search-input-wrapper']}>
            <Text style={styles['header__search-icon']}>🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={placeholder || 'Rechercher un coach...'}
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

        {categories.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles['header__categories']}
            contentContainerStyle={styles['header__categories-content']}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const resetCategories = ['Street-Lifting', 'Endurance', 'Freestyle'];
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => {
                    if (isActive && resetCategories.includes(cat.label)) {
                      setSelectedCategory('all');
                    } else {
                      setSelectedCategory(cat.id);
                    }
                  }}
                  style={[
                    styles['header__category'],
                    isActive && styles['header__category--active'],
                    isActive && { backgroundColor: '#4F46E5' },
                  ]}
                >
                  <Text
                    style={[
                      styles['header__category-text'],
                      isActive && styles['header__category-text--active'],
                      isActive && { color: '#FFFFFF', fontWeight: 'bold' },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

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
