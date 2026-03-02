// app/faculties.js
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Switch,
  StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import FacultyCard from "./components/FacultyCard";
import { facultyImages } from "./data/facultyMedia";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const faculties = [
  { id: "ict", name: "Faculty of ICT" },
  { id: "business", name: "Faculty of Business" },
  { id: "multimedia", name: "Faculty of Creative Multimedia" },
  { id: "architecture", name: "Faculty of Architecture" },
  { id: "media", name: "Faculty of Media & Communication" },
];

export default function FacultyListScreen() {
  const router = useRouter();
  const { search } = useLocalSearchParams();
  const [query, setQuery] = useState(search ?? "");
  const [darkMode, setDarkMode] = useState(false);

  const filteredFaculties = useMemo(() => {
    if (!query.trim()) return faculties;
    return faculties.filter((faculty) =>
      faculty.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const theme = darkMode
    ? {
        background: "#1f2937",
        card: "#374151",
        text: "#f9fafb",
        secondaryText: "#d1d5db",
        searchBg: "#4b5563",
        notFoundTitle: "#f87171",
        notFoundText: "#d1d5db",
      }
    : {
        background: "#f9fafb",
        card: "#ffffff",
        text: "#111827",
        secondaryText: "#6b7280",
        searchBg: "#ffffff",
        notFoundTitle: "#dc2626",
        notFoundText: "#6b7280",
      };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Ionicons
          name="arrow-back"
          size={28}
          color={theme.text}
          onPress={() => router.push("/")}
        />
        <Text style={[styles.header, { color: theme.text }]}>Faculties</Text>
        <View style={styles.switchContainer}>
          <Text style={{ color: theme.text, fontWeight: "600", marginRight: 6 }}>
            {darkMode ? "Night" : "Day"}
          </Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* SEARCH */}
      <View style={[styles.searchBox, { backgroundColor: theme.searchBg }]}>
        <Ionicons name="search-outline" size={20} color={theme.secondaryText} />
        <TextInput
          placeholder="Search faculty..."
          placeholderTextColor={theme.secondaryText}
          value={query}
          onChangeText={setQuery}
          style={[styles.searchInput, { color: theme.text }]}
          returnKeyType="search"
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {filteredFaculties.length === 0 ? (
          <View style={styles.notFoundBox}>
            <Text style={[styles.notFoundTitle, { color: theme.notFoundTitle }]}>
              Faculty Not Found
            </Text>
            <Text style={[styles.notFoundText, { color: theme.notFoundText }]}>
              No faculty matches “{query}”
            </Text>
          </View>
        ) : (
          filteredFaculties.map((faculty) => (
            <FacultyCard
              key={faculty.id}
              name={faculty.name}
              image={facultyImages[faculty.id]}
              onPress={() =>
                router.push({
                  pathname: "/courses/[faculty]",
                  params: { faculty: faculty.id },
                })
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  header: { fontSize: 26, fontWeight: "800" },
  switchContainer: { flexDirection: "row", alignItems: "center" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 14,
    gap: 10,
    elevation: 1,
  },
  searchInput: { flex: 1, fontSize: 16 },
  notFoundBox: {
    marginTop: 60,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  notFoundTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  notFoundText: { fontSize: 15, textAlign: "center" },
});