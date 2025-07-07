"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Text, TextInput, Button, Card, Checkbox } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing, typography } from "../../theme/theme"

export default function RegisterScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (!acceptTerms) {
      Alert.alert("Error", "Please accept the terms and conditions")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      navigation.navigate("Onboarding")
    }, 1500)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[typography.h1, { color: colors.primaryOrange }]}>WhereShouldIEat</Text>
          <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.sm }]}>
            Join our community of food lovers
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={[typography.h3, styles.title]}>Create Account</Text>

            <TextInput
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => updateFormData("name", value)}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
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

            <TextInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData("confirmPassword", value)}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
            />

            <View style={styles.checkboxContainer}>
              <Checkbox status={acceptTerms ? "checked" : "unchecked"} onPress={() => setAcceptTerms(!acceptTerms)} />
              <Text style={styles.checkboxText}>I agree to the Terms of Service and Privacy Policy</Text>
            </View>

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
            >
              Create Account
            </Button>

            <View style={styles.footer}>
              <Text style={typography.caption}>Already have an account? </Text>
              <Button mode="text" onPress={() => navigation.navigate("Login")} compact>
                Sign In
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  checkboxText: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.textSecondary,
  },
  registerButton: {
    backgroundColor: colors.primaryOrange,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.lg,
  },
})
