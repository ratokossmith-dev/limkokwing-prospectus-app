// app/courses/[faculty].js
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { courseImages } from "../data/courseMedia";
import { courseVideos } from "../data/courseVideos";

const { width } = Dimensions.get("window");

const coursesData = {
  ict: [
    {
      id: "ict1",
      name: "Software Engineering with Multimedia",
      description:
        "Development of software systems with integrated multimedia applications.",
      requirements:
        "O-Level: English (C), Mathematics (C), Computer Studies (D)",
      rating: 0,
    },
    {
      id: "ict2",
      name: "Business Information Technology",
      description: "Application of IT solutions in business environments.",
      requirements: "O-Level: English (C), Mathematics (C)",
      rating: 0,
    },
    {
      id: "ict3",
      name: "Information Technology",
      description:
        "Fundamentals of programming, databases, networking, and systems support.",
      requirements: "O-Level: Mathematics (C), English (C)",
      rating: 0,
    },
    {
      id: "ict4",
      name: "Computer Networking",
      description:
        "Design, installation, and maintenance of computer networks.",
      requirements: "O-Level: Mathematics (C), Physical Science (D)",
      rating: 0,
    },
    {
      id: "ict5",
      name: "Web Development",
      description: "Build modern, responsive websites and web applications.",
      requirements: "Basic programming knowledge preferred.",
      rating: 0,
    },
  ],
  business: [
    {
      id: "bus1",
      name: "Business Management",
      description:
        "Principles of management, leadership, and organizational behavior.",
      requirements: "O-Level: English (C), Mathematics (D)",
      rating: 0,
    },
    {
      id: "bus2",
      name: "Marketing Management",
      description:
        "Marketing strategies, consumer behavior, and brand management.",
      requirements: "O-Level: English (C)",
      rating: 0,
    },
    {
      id: "bus3",
      name: "Human Resource Management",
      description:
        "Recruitment, training, performance management, and labor relations.",
      requirements: "O-Level: English (C)",
      rating: 0,
    },
    {
      id: "bus4",
      name: "Entrepreneurship",
      description: "Creation and management of small and medium enterprises.",
      requirements: "O-Level: English (C), Mathematics (D)",
      rating: 0,
    },
    {
      id: "bus5",
      name: "International Business",
      description:
        "Study global trade, international markets, and cross-border management.",
      requirements: "English proficiency, basic Economics.",
      rating: 0,
    },
  ],
  multimedia: [
    {
      id: "mm1",
      name: "Graphic Design",
      description:
        "Visual communication using digital design tools and principles.",
      requirements: "O-Level: English (C), Art / Design (D)",
      rating: 0,
    },
    {
      id: "mm2",
      name: "Animation & Motion Graphics",
      description: "2D and 3D animation techniques for digital media.",
      requirements: "O-Level: English (C), Art / Design (D)",
      rating: 0,
    },
    {
      id: "mm3",
      name: "Film & Video Production",
      description: "Video shooting, editing, and post-production workflows.",
      requirements: "O-Level: English (C)",
      rating: 0,
    },
    {
      id: "mm4",
      name: "Digital Storytelling",
      description: "Tell compelling stories using multimedia platforms.",
      requirements: "Creativity, communication skills.",
      rating: 0,
    },
    {
      id: "mm5",
      name: "Audio Engineering",
      description: "Record, mix, and produce high-quality audio.",
      requirements: "Good hearing, technical interest.",
      rating: 0,
    },
  ],
  architecture: [
    {
      id: "arch1",
      name: "Architectural Technology",
      description:
        "Architectural drawing, design principles, and building technology.",
      requirements:
        "O-Level: Mathematics (C), Physical Science (C), English (C)",
      rating: 0,
    },
    {
      id: "arch2",
      name: "Building Construction Technology",
      description: "Construction methods, materials, and site practices.",
      requirements: "O-Level: Mathematics (C), Physical Science (D)",
      rating: 0,
    },
    {
      id: "arch3",
      name: "Quantity Surveying",
      description: "Cost estimation, measurement, and construction economics.",
      requirements: "O-Level: Mathematics (C), English (C)",
      rating: 0,
    },
    {
      id: "arch4",
      name: "Building Materials & Construction",
      description: "Understand construction materials and building techniques.",
      requirements: "Physics, Mathematics.",
      rating: 0,
    },
    {
      id: "arch5",
      name: "Structural Engineering Basics",
      description: "Learn how buildings resist loads and forces.",
      requirements: "Strong Mathematics background.",
      rating: 0,
    },
  ],
  media: [
    {
      id: "media1",
      name: "Journalism & Media Studies",
      description: "News writing, reporting, and media ethics.",
      requirements: "O-Level: English (C)",
      rating: 0,
    },
    {
      id: "media2",
      name: "Public Relations & Communication",
      description:
        "Strategic communication, corporate image, and media relations.",
      requirements: "O-Level: English (C)",
      rating: 0,
    },
    {
      id: "media3",
      name: "Broadcasting & Presentation",
      description: "Radio, television, and digital broadcasting skills.",
      requirements: "O-Level: English (C)",
      rating: 0,
    },
    {
      id: "media4",
      name: "TV and Film Production",
      description: "Produce content for television and film platforms.",
      requirements: "Creativity, teamwork.",
      rating: 0,
    },
    {
      id: "media5",
      name: "Media Ethics & Law",
      description: "Understand legal and ethical issues in media practice.",
      requirements: "Interest in law and ethics.",
      rating: 0,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// FACULTY META
// An object that maps each faculty id to a label, colour, icon
// ─────────────────────────────────────────────────────────────
const facultyMeta = {
  ict: {
    label: "ICT",
    full: "Information & Communication Technology",
    color: "#2563eb",
    icon: "desktop-outline",
  },
  business: {
    label: "Business",
    full: "Business & Globalization",
    color: "#059669",
    icon: "briefcase-outline",
  },
  multimedia: {
    label: "Multimedia",
    full: "Creative Multimedia",
    color: "#d97706",
    icon: "color-palette-outline",
  },
  architecture: {
    label: "Architecture",
    full: "Architecture & Built Environment",
    color: "#7c3aed",
    icon: "business-outline",
  },
  media: {
    label: "Media",
    full: "Media & Communication",
    color: "#db2777",
    icon: "tv-outline",
  },
};

// ─────────────────────────────────────────────────────────────
// STYLES — defined first so ALL components below can use them.
// In JavaScript, const is NOT hoisted. If you write styles
// after the component that uses them, you get a crash because
// the variable does not exist yet when the component runs.
// Rule: always define StyleSheet.create() BEFORE the component.
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerMid: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  bannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bannerIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  bannerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  bannerBig: {
    fontSize: 52,
    fontWeight: "900",
    color: "rgba(255,255,255,0.15)",
  },
  selectorWrapper: {
    borderBottomWidth: 1,
  },
  selectorList: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillNum: {
    fontSize: 12,
    fontWeight: "800",
  },
  pillText: {
    fontSize: 12,
    fontWeight: "600",
    maxWidth: 70,
  },
  pillRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  pillRatingText: {
    fontSize: 11,
    fontWeight: "700",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 50,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginBottom: 18,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
  },
  topRow: {
    flexDirection: "row",
    padding: 14,
    gap: 12,
  },
  thumbWrapper: {
    position: "relative",
    width: 90,
    height: 90,
    borderRadius: 14,
    overflow: "hidden",
    flexShrink: 0,
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  thumbPlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
  },
  thumbBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  topInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  courseName: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
    marginBottom: 4,
  },
  courseSnippet: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600",
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tabBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabBtnActive: {
    borderBottomWidth: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  panel: {
    padding: 16,
  },
  panelHeading: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  panelBody: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  reqBox: {
    borderRadius: 12,
    padding: 12,
  },
  reqHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  reqTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  reqText: {
    fontSize: 12,
    lineHeight: 18,
  },
  videoBox: {
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -26 }, { translateY: -26 }],
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  videoStatus: {
    position: "absolute",
    bottom: 10,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  videoStatusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  noVideo: {
    height: 120,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  noVideoText: {
    fontSize: 13,
    fontWeight: "600",
  },
  rateCenter: {
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  rateScore: {
    fontSize: 42,
    fontWeight: "900",
  },
  rateScoreMax: {
    fontSize: 20,
    fontWeight: "400",
  },
  rateHint: {
    fontSize: 12,
    textAlign: "center",
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  rateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 30,
  },
  rateBtnDisabled: {
    opacity: 0.4,
  },
  rateBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});

// ─────────────────────────────────────────────────────────────
// STARS COMPONENT
// Renders 6 filled or empty stars based on the rating number
// ─────────────────────────────────────────────────────────────
function Stars({ rating, color }) {
  return (
    <View style={{ flexDirection: "row", gap: 3 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Ionicons
          key={i}
          name={i < rating ? "star" : "star-outline"}
          size={14}
          color={i < rating ? color : "#cbd5e1"}
        />
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// COURSE CARD COMPONENT
// cardStyles and styles are ABOVE this so they are safe to use
// ─────────────────────────────────────────────────────────────
function CourseCard({ course, facultyId, accentColor, theme, onRate }) {
  const [activeTab, setActiveTab] = useState("info");
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs = [
    { id: "info", label: "Overview", icon: "document-text-outline" },
    { id: "video", label: "Video", icon: "play-circle-outline" },
    { id: "rate", label: "Rate", icon: "star-outline" },
  ];

  return (
    <View
      style={[
        cardStyles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      {/* ── TOP ROW: thumbnail LEFT, info RIGHT ── */}
      <View style={cardStyles.topRow}>
        <View style={cardStyles.thumbWrapper}>
          {courseImages[facultyId]?.[course.id] ? (
            <Image
              source={courseImages[facultyId][course.id]}
              style={cardStyles.thumb}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                cardStyles.thumbPlaceholder,
                { backgroundColor: accentColor + "22" },
              ]}
            >
              <Ionicons name="image-outline" size={28} color={accentColor} />
            </View>
          )}
          <View
            style={[cardStyles.thumbBadge, { backgroundColor: accentColor }]}
          >
            <Ionicons name="star" size={10} color="#fff" />
            <Text style={cardStyles.thumbBadgeText}>{course.rating}/6</Text>
          </View>
        </View>

        <View style={cardStyles.topInfo}>
          <Text
            style={[cardStyles.courseName, { color: theme.text }]}
            numberOfLines={2}
          >
            {course.name}
          </Text>
          <Text
            style={[cardStyles.courseSnippet, { color: theme.muted }]}
            numberOfLines={2}
          >
            {course.description}
          </Text>
          <View
            style={[cardStyles.chip, { backgroundColor: accentColor + "18" }]}
          >
            <Ionicons name="school-outline" size={11} color={accentColor} />
            <Text
              style={[cardStyles.chipText, { color: accentColor }]}
              numberOfLines={1}
            >
              Entry Requirements
            </Text>
          </View>
        </View>
      </View>

      {/* ── TAB BAR ── */}
      <View style={[cardStyles.tabBar, { borderColor: theme.border }]}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              cardStyles.tabBtn,
              activeTab === tab.id && {
                ...cardStyles.tabBtnActive,
                borderBottomColor: accentColor,
              },
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={15}
              color={activeTab === tab.id ? accentColor : theme.muted}
            />
            <Text
              style={[
                cardStyles.tabLabel,
                { color: activeTab === tab.id ? accentColor : theme.muted },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── PANEL 1: OVERVIEW ── */}
      {activeTab === "info" && (
        <View style={cardStyles.panel}>
          <Text style={[cardStyles.panelHeading, { color: theme.text }]}>
            About this Course
          </Text>
          <Text style={[cardStyles.panelBody, { color: theme.muted }]}>
            {course.description}
          </Text>
          <View style={[cardStyles.reqBox, { backgroundColor: theme.badge }]}>
            <View style={cardStyles.reqHeader}>
              <Ionicons name="checkmark-circle" size={16} color={accentColor} />
              <Text style={[cardStyles.reqTitle, { color: theme.text }]}>
                Entry Requirements
              </Text>
            </View>
            <Text style={[cardStyles.reqText, { color: theme.muted }]}>
              {course.requirements}
            </Text>
          </View>
        </View>
      )}

      {/* ── PANEL 2: VIDEO ── */}
      {activeTab === "video" && (
        <View style={cardStyles.panel}>
          {courseVideos[facultyId]?.[course.id] ? (
            <View style={cardStyles.videoBox}>
              <Video
                source={courseVideos[facultyId][course.id]}
                style={cardStyles.video}
                resizeMode="cover"
                shouldPlay={isPlaying}
                isLooping
                useNativeControls={false}
              />
              <View style={cardStyles.videoOverlay} />
              <TouchableOpacity
                style={[cardStyles.playBtn, { backgroundColor: accentColor }]}
                onPress={() => setIsPlaying((prev) => !prev)}
              >
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <View style={cardStyles.videoStatus}>
                <Text style={cardStyles.videoStatusText}>
                  {isPlaying ? "● Playing" : "Tap to play"}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={[cardStyles.noVideo, { backgroundColor: theme.badge }]}
            >
              <Ionicons
                name="videocam-off-outline"
                size={32}
                color={theme.muted}
              />
              <Text style={[cardStyles.noVideoText, { color: theme.muted }]}>
                No video available
              </Text>
            </View>
          )}
        </View>
      )}

      {/* ── PANEL 3: RATE ── */}
      {activeTab === "rate" && (
        <View style={cardStyles.panel}>
          <View style={cardStyles.rateCenter}>
            <Text style={[cardStyles.rateScore, { color: accentColor }]}>
              {course.rating}
              <Text style={[cardStyles.rateScoreMax, { color: theme.muted }]}>
                {" "}
                / 6
              </Text>
            </Text>
            <Stars rating={course.rating} color={accentColor} />
            <Text style={[cardStyles.rateHint, { color: theme.muted }]}>
              {course.rating >= 6
                ? "Maximum rating reached!"
                : `Tap below to rate — ${6 - course.rating} more allowed`}
            </Text>
          </View>

          <View
            style={[cardStyles.progressTrack, { backgroundColor: theme.badge }]}
          >
            <View
              style={[
                cardStyles.progressFill,
                {
                  backgroundColor: accentColor,
                  width: `${(course.rating / 6) * 100}%`,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            style={[
              cardStyles.rateBtn,
              { backgroundColor: accentColor },
              course.rating >= 6 && cardStyles.rateBtnDisabled,
            ]}
            onPress={onRate}
            disabled={course.rating >= 6}
          >
            <Ionicons name="thumbs-up-outline" size={18} color="#fff" />
            <Text style={cardStyles.rateBtnText}>
              {course.rating >= 6 ? "Fully Rated!" : "Rate this Course"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN SCREEN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function CoursesScreen() {
  const { faculty } = useLocalSearchParams();
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [courses, setCourses] = useState(
    coursesData[faculty] || coursesData["ict"],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const meta = facultyMeta[faculty] || facultyMeta["ict"];
  const selectedCourse = courses[selectedIndex];

  const increaseRating = (id) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, rating: c.rating < 6 ? c.rating + 1 : 6 } : c,
      ),
    );
  };

  const theme = darkMode
    ? {
        bg: "#0f172a",
        card: "#1e293b",
        border: "#334155",
        text: "#f1f5f9",
        muted: "#94a3b8",
        badge: "#334155",
        pill: "#1e293b",
        pillText: "#94a3b8",
      }
    : {
        bg: "#f1f5f9",
        card: "#ffffff",
        border: "#e2e8f0",
        text: "#111827",
        muted: "#6b7280",
        badge: "#f8fafc",
        pill: "#ffffff",
        pillText: "#6b7280",
      };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.bg}
      />

      {/* HEADER */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.card, borderBottomColor: theme.border },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/faculties")}
        >
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerMid}>
          <View style={[styles.dot, { backgroundColor: meta.color }]} />
          <Text
            style={[styles.headerTitle, { color: theme.text }]}
            numberOfLines={1}
          >
            {meta.full}
          </Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#e2e8f0", true: meta.color }}
          thumbColor="#fff"
        />
      </View>

      {/* FACULTY BANNER */}
      <View style={[styles.banner, { backgroundColor: meta.color }]}>
        <View style={styles.bannerLeft}>
          <View style={styles.bannerIconBox}>
            <Ionicons name={meta.icon} size={22} color="#fff" />
          </View>
          <View>
            <Text style={styles.bannerTitle}>{meta.label}</Text>
            <Text style={styles.bannerSub}>
              {courses.length} courses available
            </Text>
          </View>
        </View>
        <Text style={styles.bannerBig}>{courses.length}</Text>
      </View>

      {/* HORIZONTAL COURSE SELECTOR */}
      <View
        style={[
          styles.selectorWrapper,
          { backgroundColor: theme.card, borderBottomColor: theme.border },
        ]}
      >
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorList}
          renderItem={({ item, index }) => {
            const isActive = index === selectedIndex;
            return (
              <TouchableOpacity
                style={[
                  styles.pill,
                  { backgroundColor: theme.pill, borderColor: theme.border },
                  isActive && {
                    backgroundColor: meta.color,
                    borderColor: meta.color,
                  },
                ]}
                onPress={() => setSelectedIndex(index)}
              >
                <Text
                  style={[
                    styles.pillNum,
                    { color: isActive ? "#fff" : meta.color },
                  ]}
                >
                  {index + 1}
                </Text>
                <Text
                  style={[
                    styles.pillText,
                    { color: isActive ? "#fff" : theme.pillText },
                  ]}
                  numberOfLines={1}
                >
                  {item.name.split(" ")[0]}
                </Text>
                <View style={styles.pillRating}>
                  <Ionicons
                    name="star"
                    size={10}
                    color={isActive ? "#fff" : meta.color}
                  />
                  <Text
                    style={[
                      styles.pillRatingText,
                      { color: isActive ? "#fff" : meta.color },
                    ]}
                  >
                    {item.rating}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* SELECTED COURSE CARD */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CourseCard
          course={selectedCourse}
          facultyId={faculty || "ict"}
          accentColor={meta.color}
          theme={theme}
          onRate={() => increaseRating(selectedCourse.id)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
