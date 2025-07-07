import { View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { colors } from "../theme/theme"

interface StarRatingProps {
  rating: number
  size?: number
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export default function StarRating({ rating, size = 20, interactive = false, onRatingChange }: StarRatingProps) {
  const handleStarPress = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  const renderStar = (index: number) => {
    const starRating = index + 1
    const isFilled = starRating <= rating
    const isHalfFilled = starRating - 0.5 <= rating && starRating > rating

    const StarComponent = interactive ? TouchableOpacity : View

    return (
      <StarComponent
        key={index}
        onPress={() => handleStarPress(starRating)}
        style={styles.star}
        activeOpacity={interactive ? 0.7 : 1}
      >
        <Icon
          name={isFilled ? "star" : isHalfFilled ? "star-half" : "star-border"}
          size={size}
          color={isFilled || isHalfFilled ? colors.secondary : colors.gray[400]}
        />
      </StarComponent>
    )
  }

  return <View style={styles.container}>{[0, 1, 2, 3, 4].map(renderStar)}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 2,
  },
})
