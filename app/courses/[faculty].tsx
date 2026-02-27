import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Video } from "expo-av"; // <- for video playback
import { courseImages } from "../data/courseMedia"; // course images
import { courseVideos } from "../data/courseVideos"; // course videos

type Course = { id: string; name: string; description: string; rating: number };

const coursesData: Record<string, Course[]> = {
  ict: [
    { id: "ict1", name: "Software Engineering with Multimedia", description: "Learn the basics of programming using Python.", rating: 0 },
    { id: "ict2", name: "Business Information Technology", description: "Understand how to organize and manipulate data efficiently.", rating: 0 },
    { id: "ict3", name: "Information Technology", description: "Learn relational database design, SQL, and queries.", rating: 0 },
    { id: "ict4", name: "Networking Fundamentals", description: "Explore network protocols, topologies, and communication systems.", rating: 0 },
    { id: "ict5", name: "Web Development", description: "Build interactive websites using HTML, CSS, and JavaScript.", rating: 0 },
  ],
  business: [
    { id: "bus1", name: "International Business", description: "Learn management theories and how to apply them in business.", rating: 0 },
    { id: "bus2", name: "Marketing", description: "Understand marketing strategies, market research, and consumer behavior.", rating: 0 },
    { id: "bus3", name: "Human Resource Management", description: "Learn the principles of financial accounting and reporting.", rating: 0 },
    { id: "bus4", name: "Retail Management", description: "Explore ethical issues and decision-making in business.", rating: 0 },
    { id: "bus5", name: "Entrepreneurship", description: "Learn how to start, manage, and grow a business.", rating: 0 },
  ],
  multimedia: [
    { id: "mm1", name: "Graphic Design", description: "Learn design principles and software like Photoshop and Illustrator.", rating: 0 },
    { id: "mm2", name: "3D Animation", description: "Create 3D animations using Blender and Maya.", rating: 0 },
    { id: "mm3", name: "Video Production", description: "Learn shooting, editing, and post-production techniques.", rating: 0 },
    { id: "mm4", name: "Audio Engineering", description: "Understand sound recording, mixing, and production.", rating: 0 },
    { id: "mm5", name: "Digital Storytelling", description: "Combine multimedia elements to tell engaging stories.", rating: 0 },
  ],
  architecture: [
    { id: "arch1", name: "Architectural Design", description: "Learn the principles of designing functional and aesthetic buildings.", rating: 0 },
    { id: "arch3", name: "Building Materials & Construction", description: "Explore construction materials, methods, and sustainability.", rating: 0 },
    { id: "arch4", name: "Structural Engineering Basics", description: "Understand the fundamentals of building structures.", rating: 0 },
    { id: "arch5", name: "Urban Planning", description: "Learn how to plan and design cities and communities.", rating: 0 },
    { id: "arch2", name: "Architectural History", description: "Study architectural styles from ancient to modern times.", rating: 0 },
  ],
  media: [
    { id: "media1", name: "Journalism", description: "Learn investigative journalism and effective reporting skills.", rating: 0 },
    { id: "media2", name: "Public Relations", description: "Understand communication strategies and reputation management.", rating: 0 },
    { id: "media3", name: "TV and Film Production", description: "Create content for digital platforms, including social media.", rating: 0 },
    { id: "media4", name: "Broadcasting", description: "Learn TV, radio, and online presentation techniques.", rating: 0 },
    { id: "media5", name: "Media Ethics & Law", description: "Explore legal and ethical issues in media industries.", rating: 0 },
  ],
};

export default function CoursesScreen() {
  const { faculty } = useLocalSearchParams<{ faculty: string }>();
  const [courses, setCourses] = useState<Course[]>(coursesData[faculty || "ict"] || []);

  const increaseRating = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, rating: c.rating < 6 ? c.rating + 1 : 6 } : c))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Courses for {faculty?.toUpperCase()}</Text>

      {courses.map((course) => (
        <View key={course.id} style={styles.courseCard}>
          {/* Course Image */}
          {courseImages[faculty || "ict"][course.id] && (
            <Image source={courseImages[faculty || "ict"][course.id]} style={styles.image} />
          )}

          {/* Course Video */}
          {courseVideos[faculty || "ict"][course.id] && (
            <Video
              source={courseVideos[faculty || "ict"][course.id]}
              style={styles.video}
              resizeMode="cover"
              isLooping
              shouldPlay
            />
          )}

          {/* Course Details */}
          <Text style={styles.courseTitle}>{course.name}</Text>
          <Text style={styles.courseDesc}>{course.description}</Text>
          <Text style={styles.rating}>Rating: {course.rating}/6</Text>
          <TouchableOpacity style={styles.button} onPress={() => increaseRating(course.id)}>
            <Text style={styles.buttonText}>Increase Rating</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7" },
  header: { fontSize: 24, fontWeight: "bold", padding: 20 },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  video: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  courseTitle: { fontSize: 18, fontWeight: "bold" },
  courseDesc: { fontSize: 14, color: "#555", marginBottom: 5 },
  rating: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  button: { backgroundColor: "#007aff", padding: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});