// app/help.js
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─────────────────────────────────────────────────────────────
// HELP TOPICS DATA
// An array of objects — each object is one help topic card.
// Each has an icon, title, description, and a colour.
// ─────────────────────────────────────────────────────────────
const HELP_TOPICS = [
  {
    icon: "school-outline",
    title: "Browse Faculties",
    description:
      "Tap 'Faculties & Courses' on the home screen to see all 5 faculties. Each faculty card shows the faculty name, a short description, and how many courses are available. Tap any card to open its courses.",
    color: "#2563eb",
    route: "/faculties",
    routeLabel: "Go to Faculties",
  },
  {
    icon: "book-outline",
    title: "View Courses",
    description:
      "Inside a faculty, use the horizontal pill selector at the top to switch between courses. Each course has three tabs — Overview (description + entry requirements), Video (course preview clip), and Rate (give the course a star rating).",
    color: "#059669",
    route: null,
    routeLabel: null,
  },
  {
    icon: "star-outline",
    title: "Rating System",
    description:
      "Open any course and tap the Rate tab. Press the Rate button to increase the course rating. Each course starts at 0 and can be rated up to a maximum of 6. The button disables and shows 'Fully Rated!' when the maximum is reached.",
    color: "#d97706",
    route: null,
    routeLabel: null,
  },
  {
    icon: "compass-outline",
    title: "Career Quiz",
    description:
      "The Career Quiz asks you 5 questions about your interests, preferred subjects, and work style. Select one answer per question then press Next. At the end you receive a recommended faculty with a full score breakdown.",
    color: "#7c3aed",
    route: "/quiz",
    routeLabel: "Take the Quiz",
  },
  {
    icon: "search-outline",
    title: "Search",
    description:
      "Use the search bar on the Home screen or the Faculties screen to quickly find a faculty by name. The results filter live as you type. Press the ✕ button inside the search box to clear your search.",
    color: "#db2777",
    route: null,
    routeLabel: null,
  },
  {
    icon: "call-outline",
    title: "Contact the University",
    description:
      "Need to speak to someone? Visit the Contact Us page to find the university's phone number and email address. You can call or send an email directly from the app.",
    color: "#0891b2",
    route: "/contact",
    routeLabel: "Go to Contact",
  },
];

// ─────────────────────────────────────────────────────────────
// STYLES — defined before the component that uses them
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  /* ── HEADER ── */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#eff6ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
  },

  /* ── SCROLL ── */
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },

  /* ── HERO BANNER ── */
  heroBanner: {
    backgroundColor: "#2563eb",
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    marginBottom: 20,
    flexDirection: "row", // text on left, icon on right
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: 28,
  },
  heroSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
    lineHeight: 18,
  },
  heroIconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0, // prevents icon box from shrinking
  },

  /* ── SECTION LABEL ── */
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },

  /* ── TOPIC CARD ── */
  topicCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden", // clips the accent bar to card corners
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  topicCardTop: {
    flexDirection: "row", // icon box LEFT, title + toggle RIGHT
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  topicIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  topicTitleRow: {
    flex: 1, // fills space between icon and chevron
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 2,
  },
  topicHint: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
  chevron: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* ── EXPANDED PANEL ── */
  topicBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginBottom: 14,
  },
  topicDesc: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 21,
    marginBottom: 14,
  },
  topicRouteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start", // only as wide as the content
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  topicRouteBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ffffff",
  },

  /* ── ACCENT BAR at bottom of card ── */
  accentBar: {
    height: 3,
  },

  /* ── BOTTOM CTA ── */
  ctaBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  ctaSub: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 19,
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  ctaBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});

// ─────────────────────────────────────────────────────────────
// TOPIC CARD COMPONENT
// Each help topic is an expandable accordion card.
// Tapping the card toggles open/closed to show the description.
// ─────────────────────────────────────────────────────────────
function TopicCard({ topic, router }) {
  // isOpen is a boolean — false = collapsed, true = expanded
  // Each card manages its own open state independently
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.topicCard}>
      {/* ── CARD HEADER — always visible, tapping toggles isOpen ── */}
      <TouchableOpacity
        style={styles.topicCardTop}
        onPress={() => setIsOpen((prev) => !prev)} // flip the boolean
        activeOpacity={0.8}
      >
        {/* Coloured icon box */}
        <View
          style={[styles.topicIconBox, { backgroundColor: topic.color + "18" }]}
        >
          <Ionicons name={topic.icon} size={22} color={topic.color} />
        </View>

        {/* Title and hint text */}
        <View style={styles.topicTitleRow}>
          <Text style={styles.topicTitle}>{topic.title}</Text>
          <Text style={styles.topicHint}>
            {isOpen ? "Tap to collapse" : "Tap to learn more"}
          </Text>
        </View>

        {/* Chevron — rotates visually to point down when open, right when closed */}
        <View style={styles.chevron}>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={16}
            color="#6b7280"
          />
        </View>
      </TouchableOpacity>

      {/* ── EXPANDED BODY — only renders when isOpen is true ── */}
      {isOpen && (
        <View style={styles.topicBody}>
          <View style={styles.divider} />
          <Text style={styles.topicDesc}>{topic.description}</Text>

          {/* Only show the navigation button if the topic has a route */}
          {topic.route && (
            <TouchableOpacity
              style={[styles.topicRouteBtn, { backgroundColor: topic.color }]}
              onPress={() => router.push(topic.route)}
            >
              <Ionicons
                name="arrow-forward-circle-outline"
                size={16}
                color="#fff"
              />
              <Text style={styles.topicRouteBtnText}>{topic.routeLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ── THIN COLOURED BAR at bottom of every card ── */}
      <View style={[styles.accentBar, { backgroundColor: topic.color }]} />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN SCREEN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function HelpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />

      {/* ── HEADER BAR ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Centre</Text>
        {/* Badge showing topic count */}
        <View style={styles.headerBadge}>
          <Ionicons name="help-circle-outline" size={14} color="#2563eb" />
          <Text style={styles.headerBadgeText}>
            {HELP_TOPICS.length} Topics
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO BANNER ── */}
        <View style={styles.heroBanner}>
          <View style={{ flex: 1, marginRight: 14 }}>
            <Text style={styles.heroText}>How Can{"\n"}We Help?</Text>
            <Text style={styles.heroSub}>
              Tap any topic below to expand and learn how to use the app.
            </Text>
          </View>
          <View style={styles.heroIconBox}>
            <Ionicons name="help-buoy-outline" size={32} color="#ffffff" />
          </View>
        </View>

        {/* ── SECTION LABEL ── */}
        <Text style={styles.sectionLabel}>Help Topics</Text>

        {/* ── TOPIC CARDS ── */}
        {/* HELP_TOPICS is an array — .map() renders one TopicCard per item */}
        {HELP_TOPICS.map((topic, index) => (
          <TopicCard
            key={index} // index is the unique key for each card in the list
            topic={topic} // the full topic object with icon, title, description, etc.
            router={router} // pass router so the card can navigate when button is pressed
          />
        ))}

        {/* ── BOTTOM CTA BOX ── */}
        <View style={styles.ctaBox}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={32}
            color="#2563eb"
          />
          <Text style={styles.ctaTitle}>Still need help?</Text>
          <Text style={styles.ctaSub}>
            Our team is ready to assist you with any questions about admissions,
            courses, or the app.
          </Text>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => router.push("/contact")}
          >
            <Ionicons name="call-outline" size={16} color="#fff" />
            <Text style={styles.ctaBtnText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
