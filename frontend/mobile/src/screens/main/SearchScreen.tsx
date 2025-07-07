"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { Text, Searchbar, Chip } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing, typography } from "../../theme/theme"
import { useApp } from "../../contexts/AppContext"
import RestaurantCard from "../../components/RestaurantCard"

const popularSearches = ["Pizza", "Sushi", "Burgers", "Thai", "Italian", "Mexican"]

export default function SearchScreen({ navigation }: any) {
  const { state, dispatch } = useApp()
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const handleSearch = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query })
    if (query && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)])
    }
  }

  const filteredRestaurants = state.restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(state.searchQuery.toLowerCase()),
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.h2, styles.title]}>Search</Text>
        <Searchbar
          placeholder="Search restaurants, cuisines..."
          onChangeText={handleSearch}
          value={state.searchQuery}
          style={styles.searchbar}
          autoFocus
        />
      </View>

      {state.searchQuery === "" ? (
        <View style={styles.suggestionsContainer}>
          {recentSearches.length > 0 && (
            <View style={styles.section}>
              <Text style={[typography.h3, styles.sectionTitle]}>Recent Searches</Text>
              <View style={styles.chipContainer}>
                {recentSearches.map((search, index) => (
                  <Chip key={index} onPress={() => handleSearch(search)} style={styles.chip}>
                    {search}
                  </Chip>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>Popular Searches</Text>
            <View style={styles.chipContainer}>
              {popularSearches.map((search) => (
                <Chip key={search} onPress={() => handleSearch(search)} style={styles.chip}>
                  {search}
                </Chip>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              onPress={() => navigation.navigate("RestaurantDetail", { restaurant: item })}
            />
          )}
          contentContainerStyle={styles.results}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[typography.body, { color: colors.textSecondary }]}>
                No restaurants found for "{state.searchQuery}"
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.text,
    marginBottom: spacing.md,
  },
  searchbar: {
    backgroundColor: colors.surface,
  },
  suggestionsContainer: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    marginBottom: spacing.sm,
  },
  results: {
    padding: spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
})
