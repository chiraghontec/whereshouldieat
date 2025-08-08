import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Text, TextInput, Button, Card, Divider } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"

import { colors, spacing, typography } from "../../theme/theme"
import { useAppContext } from "../../contexts/AppContext"

export default function LoginScreen({ navigation }: any) {
  const { setIsAuthenticated, setUser } = useAppContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setUser({
        id: "1",
        name: "John Doe",
        email: email,
        preferences: {
          cuisines: [],
          dietaryRestrictions: [],
          priceRange: [],
        },
      })
      setIsAuthenticated(true)
      setIsLoading(false)
      navigation.replace("MainTabs")
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    Alert.alert("Social Login", `${provider} login would be implemented here`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[typography.h1, { color: colors.primaryOrange }]}>WhereShouldIEat</Text>
          <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.sm }]}>
            Discover amazing restaurants near you
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={[typography.h3, styles.title]}>Welcome Back</Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
            >
              Sign In
            </Button>

            <Divider style={styles.divider} />

            <View style={styles.socialButtons}>
              <Button
                mode="outlined"
                onPress={() => handleSocialLogin("Google")}
                style={styles.socialButton}
                icon={() => <MaterialIcons name="login" size={20} color={colors.text} />}
              >
                Google
              </Button>

              <Button
                mode="outlined"
                onPress={() => handleSocialLogin("Apple")}
                style={styles.socialButton}
                icon={() => <MaterialIcons name="login" size={20} color={colors.text} />}
              >
                Apple
              </Button>
            </View>

            <View style={styles.footer}>
              <Text style={typography.caption}>Don't have an account? </Text>
              <Button mode="text" onPress={() => navigation.navigate("Register")} compact>
                Sign Up
              </Button>
            </View>
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
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
  },
  title: {
    textAlign: "center",
    marginBottom: spacing.lg,
    color: colors.text,
  },
  input: {
    marginBottom: spacing.md,
  },
  loginButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primaryOrange,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.lg,
  },
})
