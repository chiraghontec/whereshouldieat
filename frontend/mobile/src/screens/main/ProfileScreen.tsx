import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Text, Avatar, Card, List, Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing, typography } from "../../theme/theme"
import { useApp } from "../../contexts/AppContext"

export default function ProfileScreen({ navigation }: any) {
  const { state, dispatch } = useApp()

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch({ type: "SET_USER", payload: null })
          navigation.replace("Login")
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Text size={80} label={state.user?.name?.charAt(0) || "U"} style={styles.avatar} />
          <Text style={[typography.h2, styles.name]}>{state.user?.name || "User"}</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {state.user?.email || "user@example.com"}
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={[typography.h3, styles.sectionTitle]}>Preferences</Text>

            <List.Item
              title="Favorite Cuisines"
              description={state.user?.preferences.cuisines.join(", ") || "Not set"}
              left={(props) => <List.Icon {...props} icon="food" />}
              onPress={() => {}}
            />

            <List.Item
              title="Dietary Restrictions"
              description={state.user?.preferences.dietaryRestrictions.join(", ") || "None"}
              left={(props) => <List.Icon {...props} icon="leaf" />}
              onPress={() => {}}
            />

            <List.Item
              title="Price Range"
              description={state.user?.preferences.priceRange.join(", ") || "Any"}
              left={(props) => <List.Icon {...props} icon="currency-usd" />}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={[typography.h3, styles.sectionTitle]}>Statistics</Text>

            <List.Item
              title="Reviews Written"
              description="12 reviews"
              left={(props) => <List.Icon {...props} icon="star" />}
            />

            <List.Item
              title="Restaurants Visited"
              description="28 restaurants"
              left={(props) => <List.Icon {...props} icon="map-marker" />}
            />

            <List.Item
              title="Bookmarks"
              description={`${state.bookmarks.length} saved`}
              left={(props) => <List.Icon {...props} icon="bookmark" />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Settings"
              left={(props) => <List.Icon {...props} icon="cog" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />

            <List.Item
              title="Help & Support"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />

            <List.Item
              title="About"
              left={(props) => <List.Icon {...props} icon="information" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        <View style={styles.logoutContainer}>
          <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton} textColor={colors.error}>
            Logout
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
  header: {
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  avatar: {
    backgroundColor: colors.primaryOrange,
    marginBottom: spacing.md,
  },
  name: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  card: {
    margin: spacing.md,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  logoutContainer: {
    padding: spacing.md,
  },
  logoutButton: {
    borderColor: colors.error,
  },
})
