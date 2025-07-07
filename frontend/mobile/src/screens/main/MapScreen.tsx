"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, Platform, PermissionsAndroid, Dimensions } from "react-native"
import { Text, FAB, Card, Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { WebView } from "react-native-webview"
import Geolocation from "@react-native-community/geolocation"

import { colors, spacing, typography } from "../../theme/theme"
import { useApp } from "../../contexts/AppContext"

const { width, height } = Dimensions.get("window")

export default function MapScreen({ navigation }: any) {
  const { state } = useApp()
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation()
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      getCurrentLocation()
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  const generateMapHTML = () => {
    const centerLat = userLocation?.lat || 37.7749
    const centerLng = userLocation?.lng || -122.4194

    const restaurantMarkers = state.restaurants
      .map(
        (restaurant) => `
      L.marker([${restaurant.latitude}, ${restaurant.longitude}])
        .addTo(map)
        .bindPopup(\`
          <div style="text-align: center;">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.cuisine}</p>
            <p>Rating: ${restaurant.rating}⭐</p>
            <p>${restaurant.address}</p>
          </div>
        \`);
    `,
      )
      .join("")

    const userMarker = userLocation
      ? `
      L.marker([${userLocation.lat}, ${userLocation.lng}], {
        icon: L.icon({
          iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiM0Q0FGNTASCZ8L3N2Zz4K',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      })
        .addTo(map)
        .bindPopup('You are here');
    `
      : ""

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${centerLat}, ${centerLng}], 13);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          
          ${userMarker}
          ${restaurantMarkers}
        </script>
      </body>
      </html>
    `
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.h2, styles.title]}>Nearby Restaurants</Text>
      </View>

      <View style={styles.mapContainer}>
        <WebView
          source={{ html: generateMapHTML() }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>

      {selectedRestaurant && (
        <Card style={styles.restaurantCard}>
          <Card.Content>
            <Text style={[typography.h3]}>{selectedRestaurant.name}</Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>{selectedRestaurant.cuisine}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>{selectedRestaurant.address}</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("RestaurantDetail", { restaurant: selectedRestaurant })}
              style={styles.viewButton}
            >
              View Details
            </Button>
          </Card.Content>
        </Card>
      )}

      <FAB icon="my-location" style={styles.fab} onPress={getCurrentLocation} color={colors.white} />
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
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  restaurantCard: {
    position: "absolute",
    bottom: 100,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.white,
  },
  viewButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primaryOrange,
  },
  fab: {
    position: "absolute",
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: colors.primaryOrange,
  },
})
