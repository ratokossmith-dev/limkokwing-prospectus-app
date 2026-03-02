// app/courses/[faculty].js
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Video } from "expo-av";
import { courseImages } from "../data/courseMedia";
import { courseVideos } from "../data/courseVideos";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const coursesData = {
  ict: [
    {
      id: "ict1",
      name: "Software Engineering with Multimedia",
      description:
        "Development of software systems with integrated multimedia applications.",
      requirements: "O-Level: English (C), Mathematics (C), Computer Studies (D)",
      rating: 0,
    },
    {
      id: "ict2",
      name: "Business Information Technology",
      description: "Application of information technology solutions in business environments.",
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
      description: "Design, installation, and maintenance of computer networks.",
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
      description: "Principles of management, leadership, and organizational behavior.",
      requirements: "O-Level: English (C), Mathematics (D)",
      rating: 0,
    },
    {
      id: "bus2",
      name: "Marketing Management",
      description: "Marketing strategies, consumer behavior, and brand management.",
      requirements: "O-Level: English (C)",
      rating: 0,
    },
    {
      id: "bus3",
      name: "Human Resource Management",
      description: "Recruitment, training, performance management, and labor relations.",
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
      description: "Study global trade, international markets, and cross-border management.",
      requirements: "English proficiency, basic Economics.",
      rating: 0,
    },
  ],
  multimedia: [
    {
      id: "mm1",
      name: "Graphic Design",
      description: "Visual communication using digital design tools and principles.",
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
      description: "Architectural drawing, design principles, and building technology.",
      requirements: "O-Level: Mathematics (C), Physical Science (C), English (C)",
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
      description: "Strategic communication, corporate image, and media relations.",
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

export default function CoursesScreen() {
  const { faculty } = useLocalSearchParams();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [courses, setCourses] = useState(coursesData[faculty || "ict"] || []);

  const increaseRating = (id) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, rating: c.rating < 6 ? c.rating + 1 : 6 } : c))
    );
  };

  const theme = darkMode
    ? {
        background: "#1f2937",
        card: "#374151",
        text: "#f9fafb",
        secondaryText: "#d1d5db",
        button: "#2563eb",
      }
    : {
        background: "#f2f2f7",
        card: "#ffffff",
        text: "#111827",
        secondaryText: "#555",
        button: "#007aff",
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
        <Text style={[styles.header, { color: theme.text }]}>
          Courses for {faculty?.toUpperCase()}
        </Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {courses.map((course) => (
          <View key={course.id} style={[styles.courseCard, { backgroundColor: theme.card }]}>
            {courseImages[faculty || "ict"][course.id] && (
              <Image source={courseImages[faculty || "ict"][course.id]} style={styles.image} />
            )}

            {/* PLAY VIDEOS AUTOMATICALLY */}
            {courseVideos[faculty || "ict"][course.id] && (
              <Video
                source={courseVideos[faculty || "ict"][course.id]}
                style={styles.video}
                resizeMode="cover"
                shouldPlay // <-- autoplay
                isLooping
                useNativeControls={false} // hide controls for automatic play
              />
            )}

            <Text style={[styles.courseTitle, { color: theme.text }]}>{course.name}</Text>
            <Text style={[styles.courseDesc, { color: theme.secondaryText }]}>{course.description}</Text>
            <Text style={[styles.requirements, { color: theme.secondaryText }]}>{course.requirements}</Text>
            <Text style={[styles.rating, { color: theme.text }]}>Rating: {course.rating}/6</Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.button }]}
              onPress={() => increaseRating(course.id)}
            >
              <Text style={styles.buttonText}>Increase Rating</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  header: { fontSize: 20, fontWeight: "bold", flex: 1, marginLeft: 10 },
  courseCard: {
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  video: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  courseTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  courseDesc: { fontSize: 14, marginBottom: 4 },
  requirements: { fontSize: 13, fontStyle: "italic", marginBottom: 6 },
  rating: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  button: { padding: 10, borderRadius: 8, alignItems: "center", marginTop: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});