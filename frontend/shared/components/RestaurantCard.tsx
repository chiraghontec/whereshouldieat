import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card, IconButton } from "react-native-paper"
import FastImage from "react-native-fast-image"

import { colors, spacing, typography } from "../theme/theme"
import { useApp } from "../contexts/AppContext"
import type { Restaurant } from "../contexts/AppContext"
import StarRating from "./StarRating"

interface RestaurantCardProps {
  restaurant: Restaurant
  onPress: () => void
}

export default function RestaurantCard({ restaurant, onPress }: RestaurantCardProps) {
  const { dispatch } = useApp()

  const handleBookmark = () => {
    dispatch({ type: "TOGGLE_BOOKMARK", payload: restaurant.id })
  }

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <FastImage
          source={{ uri: restaurant.image || "/placeholder.jpg" }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={[typography.h3, styles.name]} numberOfLines={1}>
                {restaurant.name}
              </Text>
              <Text style={[typography.body, styles.cuisine]}>
                {restaurant.cuisine} • {restaurant.priceRange}
              </Text>
            </View>

            <IconButton
              icon={restaurant.isBookmarked ? "bookmark" : "bookmark-outline"}
              iconColor={restaurant.isBookmarked ? colors.primaryOrange : colors.gray[500]}
              size={24}
              onPress={handleBookmark}
              style={styles.bookmarkButton}
            />
          </View>

          <View style={styles.ratingContainer}>
            <StarRating rating={restaurant.rating} size={16} />
            <Text style={[typography.caption, styles.ratingText]}>
              {restaurant.rating} ({restaurant.reviews.length} reviews)
            </Text>
          </View>

          <Text style={[typography.caption, styles.address]} numberOfLines={1}>
            {restaurant.address}
          </Text>

          {restaurant.distance && (
            <Text style={[typography.small, styles.distance]}>{restaurant.distance.toFixed(1)} km away</Text>
          )}
        </Card.Content>
      </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cuisine: {
    color: colors.textSecondary,
  },
  bookmarkButton: {
    margin: 0,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  ratingText: {
    marginLeft: spacing.sm,
    color: colors.textSecondary,
  },
  address: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  distance: {
    color: colors.primaryOrange,
    fontWeight: "600",
  },
})
