"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Card, Chip } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing, typography } from "../../theme/theme"
import { useApp } from "../../contexts/AppContext"

const cuisineOptions = [
  "Italian",
  "Japanese",
  "Mexican",
  "Chinese",
  "Indian",
  "Thai",
  "French",
  "Mediterranean",
  "American",
  "Korean",
  "Vietnamese",
  "Greek",
]

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Halal", "Kosher"]

const priceRangeOptions = ["$", "$$", "$$$", "$$$$"]

export default function OnboardingScreen({ navigation }: any) {
  const { dispatch } = useApp()
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    dispatch({
      type: "SET_USER",
      payload: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        preferences: {
          cuisines: selectedCuisines,
          dietaryRestrictions: selectedDietary,
          priceRange: selectedPriceRange,
        },
      },
    })
    navigation.replace("MainTabs")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View>
            <Text style={[typography.h3, styles.stepTitle]}>What cuisines do you love?</Text>
            <Text style={[typography.body, styles.stepDescription]}>Select your favorite types of food</Text>
            <View style={styles.chipContainer}>
              {cuisineOptions.map((cuisine) => (
                <Chip
                  key={cuisine}
                  selected={selectedCuisines.includes(cuisine)}
                  onPress={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                  style={styles.chip}
                  selectedColor={colors.white}
                  showSelectedOverlay
                >
                  {cuisine}
                </Chip>
              ))}
            </View>
          </View>
        )
      case 1:
        return (
          <View>
            <Text style={[typography.h3, styles.stepTitle]}>Any dietary preferences?</Text>
            <Text style={[typography.body, styles.stepDescription]}>
              Help us find restaurants that match your needs
            </Text>
            <View style={styles.chipContainer}>
              {dietaryOptions.map((dietary) => (
                <Chip
                  key={dietary}
                  selected={selectedDietary.includes(dietary)}
                  onPress={() => toggleSelection(dietary, selectedDietary, setSelectedDietary)}
                  style={styles.chip}
                  selectedColor={colors.white}
                  showSelectedOverlay
                >
                  {dietary}
                </Chip>
              ))}
            </View>
          </View>
        )
      case 2:
        return (
          <View>
            <Text style={[typography.h3, styles.stepTitle]}>What's your budget range?</Text>
            <Text style={[typography.body, styles.stepDescription]}>Select your preferred price ranges</Text>
            <View style={styles.chipContainer}>
              {priceRangeOptions.map((price) => (
                <Chip
                  key={price}
                  selected={selectedPriceRange.includes(price)}
                  onPress={() => toggleSelection(price, selectedPriceRange, setSelectedPriceRange)}
                  style={styles.chip}
                  selectedColor={colors.white}
                  showSelectedOverlay
                >
                  {price}
                </Chip>
              ))}
            </View>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[typography.h2, { color: colors.primaryOrange }]}>Let's personalize your experience</Text>
          <View style={styles.progressContainer}>
            {[0, 1, 2].map((step) => (
              <View
                key={step}
                style={[
                  styles.progressDot,
                  { backgroundColor: step <= currentStep ? colors.primaryOrange : colors.gray[300] },
                ]}
              />
            ))}
          </View>
        </View>

        <Card style={styles.card}>
          <Card.Content>{renderStep()}</Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <Button mode="outlined" onPress={() => setCurrentStep(currentStep - 1)} style={styles.backButton}>
              Back
            </Button>
          )}
          <Button
            mode="contained"
            onPress={handleNext}
            style={[styles.nextButton, { flex: currentStep === 0 ? 1 : 0.7 }]}
            contentStyle={styles.buttonContent}
          >
            {currentStep === 2 ? "Get Started" : "Next"}
          </Button>
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
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  progressContainer: {
    flexDirection: "row",
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
  },
  stepTitle: {
    textAlign: "center",
    marginBottom: spacing.sm,
    color: colors.text,
  },
  stepDescription: {
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "center",
  },
  chip: {
    marginBottom: spacing.sm,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  backButton: {
    flex: 0.3,
  },
  nextButton: {
    backgroundColor: colors.primaryOrange,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
})
