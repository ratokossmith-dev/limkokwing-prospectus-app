// app/help.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HelpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* HEADER */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help</Text>
        </View>

        <Text style={styles.heading}>How Can We Help You?</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏫 Browse Faculties</Text>
          <Text style={styles.cardText}>
            Go to the Faculties section to explore available faculties and courses
            offered by the university.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎓 View Courses</Text>
          <Text style={styles.cardText}>
            Select a faculty to see its courses, images, videos, and ratings.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🧭 Career Quiz</Text>
          <Text style={styles.cardText}>
            Take the career quiz to discover which course best suits your
            interests.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📞 Need More Help?</Text>
          <Text style={styles.cardText}>
            Visit the Contact Us page to reach the university directly.
          </Text>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => router.push("/contact")}
          >
            <Text style={styles.linkBtnText}>Go to Contact Page</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push("/faculties")}
        >
          <Text style={styles.primaryBtnText}>Explore Courses</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 15,
    color: "#111827",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },

  linkBtn: {
    marginTop: 10,
  },
  linkBtnText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 15,
  },

  primaryBtn: {
    backgroundColor: "#2563eb",
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});