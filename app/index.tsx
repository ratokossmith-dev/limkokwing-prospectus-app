// app/index.tsx
import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { homeImage, facultyImages } from "./data/facultyMedia";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        {/* LEFT: Home */}
        <Text style={styles.topTitle}>Home</Text>

        {/* RIGHT: Contact & Help */}
        <View style={styles.topMenu}>
          <TouchableOpacity onPress={() => router.push("/contact")}>
            <Text style={styles.menuText}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/help")}>
            <Text style={styles.menuText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: 60 }}
      >
        {/* Banner Image */}
        <Image source={homeImage} style={styles.banner} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>👋 Welcome to Limkokwing University</Text>
          <Text style={styles.subtitle}>
            Explore faculties, courses, and career guidance for your future.
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {/* Faculties Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/faculties")}
          >
            <Image source={facultyImages["ict"]} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Browse Faculties</Text>
            <Text style={styles.cardDesc}>
              See all faculties and courses offered.
            </Text>
          </TouchableOpacity>

          {/* Career Quiz Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/quiz")}
          >
            <Image source={homeImage} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Career Guide Quiz</Text>
            <Text style={styles.cardDesc}>
              Take a quiz to find your ideal course.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7" },

  /* TOP BAR FIXED */
  topBar: {
    position: "absolute", // pinned at top
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 100,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  topMenu: {
    flexDirection: "row",
    gap: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007aff",
  },

  banner: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  header: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555" },

  cardsContainer: { paddingHorizontal: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "cover",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  cardDesc: { fontSize: 14, color: "#555" },
});