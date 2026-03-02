import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { homeImage, facultyImages, limkokwingLogo } from "./data/facultyMedia";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/faculties?search=${search}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ===== TOP BAR ===== */}
        <View style={styles.topBar}>
          <View style={styles.logoContainer}>
            <Image source={limkokwingLogo} style={styles.logo} />
            <Text style={styles.topTitle}>Limkokwing</Text>
          </View>

          <View style={styles.topMenu}>
            <TouchableOpacity
              onPress={() => router.push("/contact")}
              style={styles.iconBtn}
            >
              <Ionicons name="call-outline" size={22} color="#2563eb" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/help")}
              style={styles.iconBtn}
            >
              <Ionicons name="help-circle-outline" size={22} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== HERO / BANNER ===== */}
        <View style={styles.bannerWrapper}>
          <Image source={homeImage} style={styles.banner} />

          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>
              Shape Your Creative & Digital Future
            </Text>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push("/faculties")}
            >
              <Text style={styles.primaryBtnText}>Explore Faculties</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== SEARCH ===== */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            placeholder="Search faculty (ICT, Design, Business...)"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        {/* ===== WELCOME ===== */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Limkokwing University</Text>
          <Text style={styles.subtitle}>
            Discover faculties, courses, and career paths designed for the
            modern digital world.
          </Text>
        </View>

        {/* ===== ACTION CARDS ===== */}
        <View style={styles.cards}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/faculties")}
          >
            <Image source={facultyImages["ict"]} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Faculties & Courses</Text>
            <Text style={styles.cardDesc}>
              Browse all faculties and explore available programs.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/quiz")}
          >
            <Image source={homeImage} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Career Guide Quiz</Text>
            <Text style={styles.cardDesc}>
              Answer a few questions and find the best course for you.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scroll: {
    paddingBottom: 40,
  },

  /* Top Bar */
  topBar: {
    margin: 15,
    paddingHorizontal: 15,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  topTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  topMenu: {
    flexDirection: "row",
    gap: 12,
  },
  iconBtn: {
    padding: 6,
  },

  /* Banner */
  bannerWrapper: {
    marginHorizontal: 15,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  banner: {
    width: "100%",
    height: 220,
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 20,
    justifyContent: "flex-end",
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: "#2563eb",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
  },
  primaryBtnText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },

  /* Search */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 50,
    gap: 10,
    elevation: 1,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  /* Header */
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 6,
    color: "#111827",
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    lineHeight: 22,
  },

  /* Cards */
  cards: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginTop: 15,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111827",
  },
  cardDesc: {
    fontSize: 14,
    color: "#6b7280",
  },
});