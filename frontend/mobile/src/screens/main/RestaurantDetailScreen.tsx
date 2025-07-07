import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Text, Button, Card, Chip, Divider } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import FastImage from "react-native-fast-image"

import { colors, spacing, typography } from "../../theme/theme"
import { useApp } from "../../contexts/AppContext"
import StarRating from "../../components/StarRating"

const { width } = Dimensions.get("window")

export default function RestaurantDetailScreen({ route, navigation }: any) {
  const { restaurant } = route.params
  const { dispatch } = useApp()

  const handleBookmark = () => {
    dispatch({ type: "TOGGLE_BOOKMARK", payload: restaurant.id })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FastImage
          source={{ uri: restaurant.image || "/placeholder.jpg" }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[typography.h2, styles.name]}>{restaurant.name}</Text>
            <View style={styles.ratingContainer}>
              <StarRating rating={restaurant.rating} size={20} />
              <Text style={[typography.body, { marginLeft: spacing.sm }]}>
                {restaurant.rating} ({restaurant.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.tags}>
            <Chip style={styles.chip}>{restaurant.cuisine}</Chip>
            <Chip style={styles.chip}>{restaurant.priceRange}</Chip>
          </View>

          <Card style={styles.infoCard}>
            <Card.Content>
              <Text style={[typography.h3, styles.sectionTitle]}>Information</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Address:</Text>
                <Text style={styles.infoValue}>{restaurant.address}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Hours:</Text>
                <Text style={styles.infoValue}>{restaurant.openingHours}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{restaurant.phone}</Text>
              </View>

              {restaurant.website && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Website:</Text>
                  <Text style={[styles.infoValue, { color: colors.primaryOrange }]}>{restaurant.website}</Text>
                </View>
              )}
            </Card.Content>
          </Card>

          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Review", { restaurant })}
              style={styles.reviewButton}
              contentStyle={styles.buttonContent}
            >
              Write Review
            </Button>

            <Button
              mode={restaurant.isBookmarked ? "contained" : "outlined"}
              onPress={handleBookmark}
              style={[styles.bookmarkButton, restaurant.isBookmarked && { backgroundColor: colors.primaryOrange }]}
              contentStyle={styles.buttonContent}
            >
              {restaurant.isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </View>

          {restaurant.reviews.length > 0 && (
            <Card style={styles.reviewsCard}>
              <Card.Content>
                <Text style={[typography.h3, styles.sectionTitle]}>Recent Reviews</Text>
                {restaurant.reviews.slice(0, 3).map((review) => (
                  <View key={review.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <Text style={[typography.body, { fontWeight: "600" }]}>{review.userName}</Text>
                      <StarRating rating={review.rating} size={16} />
                    </View>
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>{review.comment}</Text>
                    <Text style={[typography.small, { color: colors.textSecondary, marginTop: spacing.xs }]}>
                      {review.date}
                    </Text>
                    <Divider style={{ marginTop: spacing.sm }} />
                  </View>
                ))}
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: width,
    height: 250,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  name: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tags: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    backgroundColor: colors.surface,
  },
  infoCard: {
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  infoLabel: {
    ...typography.body,
    fontWeight: "600",
    width: 80,
    color: colors.text,
  },
  infoValue: {
    ...typography.body,
    flex: 1,
    color: colors.textSecondary,
  },
  actionButtons: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  reviewButton: {
    flex: 1,
    backgroundColor: colors.primaryOrange,
  },
  bookmarkButton: {
    flex: 1,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  reviewsCard: {
    backgroundColor: colors.white,
  },
  reviewItem: {
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
})
