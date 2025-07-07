"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Text, TextInput, Button, Card } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing, typography } from "../../theme/theme"
import { useApp } from "../../contexts/AppContext"
import StarRating from "../../components/StarRating"

export default function ReviewScreen({ route, navigation }: any) {
  const { restaurant } = route.params
  const { state, dispatch } = useApp()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a rating")
      return
    }

    if (!comment.trim()) {
      Alert.alert("Error", "Please write a review")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: Date.now().toString(),
        userId: state.user?.id || "1",
        userName: state.user?.name || "Anonymous",
        rating,
        comment: comment.trim(),
        date: new Date().toLocaleDateString(),
      }

      dispatch({
        type: "ADD_REVIEW",
        payload: {
          restaurantId: restaurant.id,
          review: newReview,
        },
      })

      setIsSubmitting(false)
      Alert.alert("Success", "Your review has been submitted!", [{ text: "OK", onPress: () => navigation.goBack() }])
    }, 1500)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={[typography.h3, styles.title]}>Review {restaurant.name}</Text>

            <View style={styles.ratingSection}>
              <Text style={[typography.body, styles.label]}>Your Rating</Text>
              <StarRating rating={rating} onRatingChange={setRating} size={32} interactive />
            </View>

            <View style={styles.commentSection}>
              <Text style={[typography.body, styles.label]}>Your Review</Text>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={6}
                value={comment}
                onChangeText={setComment}
                placeholder="Share your experience at this restaurant..."
                style={styles.textInput}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.submitButton}
              contentStyle={styles.buttonContent}
            >
              Submit Review
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
  },
  title: {
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  ratingSection: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
    marginBottom: spacing.md,
    fontWeight: "600",
  },
  commentSection: {
    marginBottom: spacing.lg,
  },
  textInput: {
    backgroundColor: colors.surface,
  },
  submitButton: {
    backgroundColor: colors.primaryOrange,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
})
