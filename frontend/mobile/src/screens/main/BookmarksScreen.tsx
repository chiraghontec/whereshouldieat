import { View, StyleSheet, FlatList } from "react-native"
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing, typography } from "../../theme/theme"
import { useApp } from "../../contexts/AppContext"
import RestaurantCard from "../../components/RestaurantCard"

export default function BookmarksScreen({ navigation }: any) {
  const { state } = useApp()

  const bookmarkedRestaurants = state.restaurants.filter((restaurant) => state.bookmarks.includes(restaurant.id))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.h2, styles.title]}>Bookmarks</Text>
      </View>

      <FlatList
        data={bookmarkedRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => navigation.navigate("RestaurantDetail", { restaurant: item })}
          />
        )}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[typography.body, { color: colors.textSecondary }]}>No bookmarked restaurants yet</Text>
            <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.sm }]}>
              Tap the bookmark icon on restaurants to save them here
            </Text>
          </View>
        }
      />
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
  },
  content: {
    padding: spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
})
