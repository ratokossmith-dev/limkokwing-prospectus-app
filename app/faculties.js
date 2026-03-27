// app/faculties.js
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { facultyImages } from "./data/facultyMedia";

// Get device screen width so we can size cards responsively
const { width } = Dimensions.get("window");

// ─────────────────────────────────────────────────────────────
// FACULTIES DATA
// An array of objects — each object is one faculty.
// Each faculty has an id, name, description, course count,
// and an icon name from the Ionicons library.
// ─────────────────────────────────────────────────────────────
const faculties = [
  {
    id: "ict",
    name: "Faculty of ICT",
    description: "Software, networking, web development & IT systems.",
    courses: 5,
    icon: "desktop-outline",
    color: "#2563eb",
  },
  {
    id: "business",
    name: "Faculty of Business",
    description: "Management, marketing, entrepreneurship & global trade.",
    courses: 5,
    icon: "briefcase-outline",
    color: "#059669",
  },
  {
    id: "multimedia",
    name: "Faculty of Creative Multimedia",
    description: "Graphic design, animation, film & audio production.",
    courses: 5,
    icon: "color-palette-outline",
    color: "#d97706",
  },
  {
    id: "architecture",
    name: "Faculty of Architecture",
    description: "Architectural design, construction & quantity surveying.",
    courses: 5,
    icon: "business-outline",
    color: "#7c3aed",
  },
  {
    id: "media",
    name: "Faculty of Media & Communication",
    description: "Journalism, broadcasting, PR & media ethics.",
    courses: 5,
    icon: "tv-outline",
    color: "#db2777",
  },
];

// ─────────────────────────────────────────────────────────────
// STYLES
// Defined BEFORE the components that use them.
// const is not hoisted in JavaScript — always put styles first.
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1 },

  /* ── HEADER BAR ── */
  headerBar: {
    flexDirection: "row", // back icon | title | dark mode switch in a row
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerTitle: {
    flex: 1, // takes all remaining space between back btn and switch
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: "600",
  },

  /* ── HERO BANNER ── */
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 6,
    borderRadius: 18,
    overflow: "hidden", // clips children to rounded corners
    height: 110,
  },
  heroBannerInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  heroBannerText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
    lineHeight: 26,
  },
  heroBannerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  heroBannerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* ── STATS ROW ── */
  statsRow: {
    flexDirection: "row", // three stat boxes side by side
    marginHorizontal: 16,
    marginVertical: 14,
    gap: 10,
  },
  statBox: {
    flex: 1, // equal width for all three boxes
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "900",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
    textTransform: "uppercase", // makes text ALL CAPS
    letterSpacing: 0.5,
  },

  /* ── SEARCH BOX ── */
  searchRow: {
    flexDirection: "row", // search input | filter button in a row
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  searchBox: {
    flex: 1, // takes all space except the filter button
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  searchBoxFocused: {
    borderColor: "#2563eb", // blue border when user taps into the input
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  /* ── SECTION LABEL ── */
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  /* ── FACULTY CARD ── */
  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
  },
  cardTop: {
    flexDirection: "row", // image thumbnail LEFT, info RIGHT
    padding: 14,
    gap: 14,
  },
  cardImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 14,
    overflow: "hidden",
    flexShrink: 0, // prevents image from shrinking when text is long
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardImagePlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flex: 1, // takes all remaining width after thumbnail
    justifyContent: "space-between",
  },
  cardName: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: "row", // course count pill + arrow icon in a row
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  cardPillText: {
    fontSize: 11,
    fontWeight: "700",
  },
  cardArrow: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ── CARD FOOTER (coloured accent bar at bottom) ── */
  cardFooter: {
    height: 4, // thin coloured stripe at the bottom of each card
  },

  /* ── NOT FOUND STATE ── */
  notFound: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 30,
    gap: 12,
  },
  notFoundIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  notFoundText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  notFoundBtn: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  notFoundBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  /* ── SCROLL CONTENT ── */
  scrollContent: {
    paddingBottom: 50,
  },
});

// ─────────────────────────────────────────────────────────────
// FACULTY CARD COMPONENT
// A self-contained card for one faculty.
// Receives the faculty object, theme colours, and onPress.
// ─────────────────────────────────────────────────────────────
function FacultyCard({ faculty, theme, onPress }) {
  return (
    // The whole card is tappable — pressing navigates to that faculty's courses
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
      onPress={onPress}
      activeOpacity={0.82}
    >
      {/* ── TOP ROW: image left, info right ── */}
      <View style={styles.cardTop}>
        {/* Faculty thumbnail image */}
        <View style={styles.cardImageWrapper}>
          {facultyImages[faculty.id] ? (
            <Image
              source={facultyImages[faculty.id]}
              style={styles.cardImage}
              resizeMode="cover"
            />
          ) : (
            // Fallback if no image file found — shows the faculty icon instead
            <View
              style={[
                styles.cardImagePlaceholder,
                { backgroundColor: faculty.color + "22" },
              ]}
            >
              <Ionicons name={faculty.icon} size={32} color={faculty.color} />
            </View>
          )}
        </View>

        {/* Faculty name, description, and bottom meta row */}
        <View style={styles.cardInfo}>
          <Text
            style={[styles.cardName, { color: theme.text }]}
            numberOfLines={2}
          >
            {faculty.name}
          </Text>
          <Text
            style={[styles.cardDesc, { color: theme.muted }]}
            numberOfLines={2}
          >
            {faculty.description}
          </Text>

          {/* Bottom row — course count pill on left, arrow on right */}
          <View style={styles.cardMeta}>
            {/* Course count pill */}
            <View
              style={[
                styles.cardPill,
                { backgroundColor: faculty.color + "18" },
              ]}
            >
              <Ionicons name="book-outline" size={11} color={faculty.color} />
              <Text style={[styles.cardPillText, { color: faculty.color }]}>
                {faculty.courses} Courses
              </Text>
            </View>

            {/* Arrow button — same accent colour as the faculty */}
            <View
              style={[
                styles.cardArrow,
                { backgroundColor: faculty.color + "18" },
              ]}
            >
              <Ionicons name="arrow-forward" size={14} color={faculty.color} />
            </View>
          </View>
        </View>
      </View>

      {/* ── BOTTOM ACCENT BAR — thin coloured stripe ── */}
      <View style={[styles.cardFooter, { backgroundColor: faculty.color }]} />
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN SCREEN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function FacultyListScreen() {
  const router = useRouter();

  // Read the search param from the URL — e.g. /faculties?search=ICT
  // gives { search: "ICT" }. Falls back to empty string if not present.
  const { search } = useLocalSearchParams();

  // query is a string — whatever the user has typed in the search box
  const [query, setQuery] = useState(search ?? "");

  // searchFocused is a boolean — true when the text input is active
  const [searchFocused, setSearchFocused] = useState(false);

  // darkMode is a boolean — false = light theme, true = dark theme
  const [darkMode, setDarkMode] = useState(false);

  // ── Filter faculties based on the search query ──
  // useMemo means this only re-runs when query changes, not on every render
  const filteredFaculties = useMemo(() => {
    if (!query.trim()) return faculties; // no query — return the full array
    // .filter() loops over the faculties array and keeps only items where
    // the faculty name contains the query string (case-insensitive)
    return faculties.filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  // ── Theme object — all colours swap based on darkMode boolean ──
  const theme = darkMode
    ? {
        bg: "#0f172a",
        card: "#1e293b",
        border: "#334155",
        text: "#f1f5f9",
        muted: "#94a3b8",
        headerBg: "#1e293b",
        searchBg: "#1e293b",
        statBg: "#1e293b",
        statBorder: "#334155",
        labelColor: "#64748b",
        iconBg: "#334155",
      }
    : {
        bg: "#f1f5f9",
        card: "#ffffff",
        border: "#e2e8f0",
        text: "#111827",
        muted: "#6b7280",
        headerBg: "#ffffff",
        searchBg: "#ffffff",
        statBg: "#ffffff",
        statBorder: "#e2e8f0",
        labelColor: "#9ca3af",
        iconBg: "#f1f5f9",
      };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.bg}
      />

      {/* ════════════════════════════════
          HEADER BAR
          Back arrow | Title | Dark mode toggle
      ════════════════════════════════ */}
      <View
        style={[
          styles.headerBar,
          { backgroundColor: theme.headerBg, borderBottomColor: theme.border },
        ]}
      >
        {/* Back button — goes back to home */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/")}
        >
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Faculties
        </Text>

        {/* Dark mode toggle with label */}
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, { color: theme.muted }]}>
            {darkMode ? "Dark" : "Light"}
          </Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#e2e8f0", true: "#2563eb" }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ════════════════════════════════
            HERO BANNER
            Coloured gradient-style strip at
            the top with title and icon
        ════════════════════════════════ */}
        <View style={[styles.heroBanner, { backgroundColor: "#2563eb" }]}>
          <View style={styles.heroBannerInner}>
            <View>
              <Text style={styles.heroBannerText}>
                Explore{"\n"}All Faculties
              </Text>
              <Text style={styles.heroBannerSub}>
                Find your perfect programme
              </Text>
            </View>
            <View style={styles.heroBannerIcon}>
              <Ionicons name="school" size={28} color="#fff" />
            </View>
          </View>
        </View>

        {/* ════════════════════════════════
            STATS ROW
            Three quick-glance stat boxes
        ════════════════════════════════ */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statBox,
              { backgroundColor: theme.statBg, borderColor: theme.statBorder },
            ]}
          >
            {/* faculties.length is a number — total items in the faculties array */}
            <Text style={[styles.statNumber, { color: "#2563eb" }]}>
              {faculties.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.muted }]}>
              Faculties
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              { backgroundColor: "#2563eb", borderColor: "#2563eb" },
            ]}
          >
            {/* Total courses = each faculty has 5, so 5 × number of faculties */}
            <Text style={[styles.statNumber, { color: "#fff" }]}>
              {faculties.length * 5}
            </Text>
            <Text
              style={[styles.statLabel, { color: "rgba(255,255,255,0.8)" }]}
            >
              Courses
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              { backgroundColor: theme.statBg, borderColor: theme.statBorder },
            ]}
          >
            <Text style={[styles.statNumber, { color: "#2563eb" }]}>
              {/* Show how many faculties match the current search, or total if no search */}
              {query.trim() ? filteredFaculties.length : faculties.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.muted }]}>
              Showing
            </Text>
          </View>
        </View>

        {/* ════════════════════════════════
            SEARCH BOX
            Text input with focus highlight
            and a clear button when typing
        ════════════════════════════════ */}
        <View style={styles.searchRow}>
          <View
            style={[
              styles.searchBox,
              { backgroundColor: theme.searchBg, borderColor: theme.border },
              // Add blue border when the input is focused
              searchFocused && styles.searchBoxFocused,
            ]}
          >
            <Ionicons name="search-outline" size={18} color={theme.muted} />
            <TextInput
              placeholder="Search faculty..."
              placeholderTextColor={theme.muted}
              value={query}
              onChangeText={setQuery} // update query string on every keystroke
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={[styles.searchInput, { color: theme.text }]}
              returnKeyType="search"
            />
            {/* Only show clear button when there is text */}
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Ionicons name="close-circle" size={18} color={theme.muted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter icon button — decorative for now */}
          <TouchableOpacity
            style={[
              styles.filterBtn,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Ionicons name="options-outline" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* ════════════════════════════════
            SECTION LABEL
        ════════════════════════════════ */}
        <Text style={[styles.sectionLabel, { color: theme.labelColor }]}>
          {query.trim()
            ? `${filteredFaculties.length} result${filteredFaculties.length !== 1 ? "s" : ""} found`
            : "All Faculties"}
        </Text>

        {/* ════════════════════════════════
            FACULTY LIST or NOT FOUND
        ════════════════════════════════ */}
        {filteredFaculties.length === 0 ? (
          // ── NO RESULTS STATE ──
          <View style={styles.notFound}>
            <View
              style={[styles.notFoundIcon, { backgroundColor: theme.iconBg }]}
            >
              <Ionicons name="search-outline" size={30} color={theme.muted} />
            </View>
            <Text style={[styles.notFoundTitle, { color: theme.text }]}>
              No Faculty Found
            </Text>
            <Text style={[styles.notFoundText, { color: theme.muted }]}>
              No faculty matches "{query}".{"\n"}Try a different search term.
            </Text>
            {/* Clear search button — resets query to empty string */}
            <TouchableOpacity
              style={[styles.notFoundBtn, { backgroundColor: "#2563eb" }]}
              onPress={() => setQuery("")}
            >
              <Text style={styles.notFoundBtnText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // ── FACULTY CARDS LIST ──
          // .map() loops over the filteredFaculties array
          // and renders one FacultyCard per faculty object
          filteredFaculties.map((faculty) => (
            <FacultyCard
              key={faculty.id} // unique string key required by React for lists
              faculty={faculty} // the full faculty object
              theme={theme} // theme colours so the card adapts to dark/light mode
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
