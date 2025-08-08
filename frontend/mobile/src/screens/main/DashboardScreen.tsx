import { useState } from "react"
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native"
import { Text, Searchbar, FAB, Portal, Modal } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing, typography } from "../../theme/theme"
import { useAppContext } from "../../contexts/AppContext"

export default function DashboardScreen({ navigation }: any) {
  const { user } = useAppContext()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const filteredRestaurants = state.restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(state.searchQuery.toLowerCase())

    const matchesCuisine = state.filters.cuisine.length === 0 || state.filters.cuisine.includes(restaurant.cuisine)

    const matchesPrice =
      state.filters.priceRange.length === 0 || state.filters.priceRange.includes(restaurant.priceRange)

    const matchesRating = restaurant.rating >= state.filters.rating

    return matchesSearch && matchesCuisine && matchesPrice && matchesRating
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.h2, styles.title]}>Discover Great Food</Text>
        <Searchbar
          placeholder="Search restaurants, cuisines..."
          onChangeText={(query) => dispatch({ type: "SET_SEARCH_QUERY", payload: query })}
          value={state.searchQuery}
          style={styles.searchbar}
        />
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.section}>
          <Text style={[typography.h3, styles.sectionTitle]}>Recommended for You</Text>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => navigation.navigate("RestaurantDetail", { restaurant })}
            />
          ))}
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={showFilters}
          onDismiss={() => setShowFilters(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <FilterModal onClose={() => setShowFilters(false)} />
        </Modal>
      </Portal>

      <FAB icon="tune" style={styles.fab} onPress={() => setShowFilters(true)} color={colors.white} />
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
  content: {
    flex: 1,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
  },
  modalContainer: {
    backgroundColor: colors.white,
    margin: spacing.md,
    borderRadius: 12,
    maxHeight: "80%",
  },
  fab: {
    position: "absolute",
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: colors.primaryOrange,
  },
})
