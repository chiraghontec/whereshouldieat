"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Card, Chip, Slider } from "react-native-paper"

import { colors, spacing, typography } from "../theme/theme"
import { useApp } from "../contexts/AppContext"

interface FilterModalProps {
  onClose: () => void
}

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

const priceRangeOptions = ["$", "$$", "$$$", "$$$$"]

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Halal", "Kosher"]

export default function FilterModal({ onClose }: FilterModalProps) {
  const { state, dispatch } = useApp()
  const [tempFilters, setTempFilters] = useState(state.filters)

  const toggleFilter = (category: keyof typeof tempFilters, value: string) => {
    const currentList = tempFilters[category] as string[]
    const newList = currentList.includes(value) ? currentList.filter((item) => item !== value) : [...currentList, value]

    setTempFilters((prev) => ({
      ...prev,
      [category]: newList,
    }))
  }

  const handleApply = () => {
    dispatch({ type: "SET_FILTERS", payload: tempFilters })
    onClose()
  }

  const handleReset = () => {
    const resetFilters = {
      cuisine: [],
      priceRange: [],
      rating: 0,
      distance: 10,
      dietary: [],
    }
    setTempFilters(resetFilters)
    dispatch({ type: "SET_FILTERS", payload: resetFilters })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.h3, styles.title]}>Filters</Text>
      </View>

      <Card style={styles.section}>
        <Card.Content>
          <Text style={[typography.body, styles.sectionTitle]}>Cuisine Type</Text>
          <View style={styles.chipContainer}>
            {cuisineOptions.map((cuisine) => (
              <Chip
                key={cuisine}
                selected={tempFilters.cuisine.includes(cuisine)}
                onPress={() => toggleFilter("cuisine", cuisine)}
                style={styles.chip}
                selectedColor={colors.white}
                showSelectedOverlay
              >
                {cuisine}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Text style={[typography.body, styles.sectionTitle]}>Price Range</Text>
          <View style={styles.chipContainer}>
            {priceRangeOptions.map((price) => (
              <Chip
                key={price}
                selected={tempFilters.priceRange.includes(price)}
                onPress={() => toggleFilter("priceRange", price)}
                style={styles.chip}
                selectedColor={colors.white}
                showSelectedOverlay
              >
                {price}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Text style={[typography.body, styles.sectionTitle]}>Minimum Rating: {tempFilters.rating.toFixed(1)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={0.5}
            value={tempFilters.rating}
            onValueChange={(value) => setTempFilters((prev) => ({ ...prev, rating: value }))}
            thumbStyle={{ backgroundColor: colors.primaryOrange }}
            trackStyle={{ backgroundColor: colors.gray[300] }}
            minimumTrackTintColor={colors.primaryOrange}
          />
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Text style={[typography.body, styles.sectionTitle]}>Distance: {tempFilters.distance} km</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={tempFilters.distance}
            onValueChange={(value) => setTempFilters((prev) => ({ ...prev, distance: value }))}
            thumbStyle={{ backgroundColor: colors.primaryOrange }}
            trackStyle={{ backgroundColor: colors.gray[300] }}
            minimumTrackTintColor={colors.primaryOrange}
          />
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Text style={[typography.body, styles.sectionTitle]}>Dietary Options</Text>
          <View style={styles.chipContainer}>
            {dietaryOptions.map((dietary) => (
              <Chip
                key={dietary}
                selected={tempFilters.dietary.includes(dietary)}
                onPress={() => toggleFilter("dietary", dietary)}
                style={styles.chip}
                selectedColor={colors.white}
                showSelectedOverlay
              >
                {dietary}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={handleReset} style={styles.resetButton}>
          Reset
        </Button>
        <Button mode="contained" onPress={handleApply} style={styles.applyButton}>
          Apply Filters
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    alignItems: "center",
  },
  title: {
    color: colors.text,
  },
  section: {
    margin: spacing.md,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "600",
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
  slider: {
    width: "100%",
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: spacing.md,
    gap: spacing.md,
  },
  resetButton: {
    flex: 1,
  },
  applyButton: {
    flex: 1,
    backgroundColor: colors.primaryOrange,
  },
})
