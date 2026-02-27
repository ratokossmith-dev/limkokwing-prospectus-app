import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

// Quiz questions and mapping to faculties
const quizQuestions = [
  {
    question: "Do you enjoy working with computers and technology?",
    options: [
      { text: "Yes, a lot", faculty: "ict" },
      { text: "Not really", faculty: "business" },
      { text: "Sometimes", faculty: "multimedia" },
    ],
  },
  {
    question: "Do you prefer creative arts and multimedia?",
    options: [
      { text: "Yes", faculty: "multimedia" },
      { text: "No", faculty: "business" },
      { text: "A little", faculty: "media" },
    ],
  },
  {
    question: "Are you interested in business and management?",
    options: [
      { text: "Yes", faculty: "business" },
      { text: "No", faculty: "ict" },
      { text: "Somewhat", faculty: "media" },
    ],
  },
];

export default function CareerQuizScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (faculty: string) => {
    setAnswers([...answers, faculty]);
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  // Calculate recommended faculty
  const recommendedFaculty = finished
    ? answers.reduce((acc, f) => {
        acc[f] = (acc[f] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : null;

  const topFaculty = recommendedFaculty
    ? Object.entries(recommendedFaculty).sort((a, b) => b[1] - a[1])[0][0]
    : null;

  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>🎯 Recommended Faculty:</Text>
        <Text style={styles.recommendation}>{topFaculty?.toUpperCase()}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/faculties")}>
          <Text style={styles.buttonText}>Explore Courses</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const question = quizQuestions[current];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Career Quiz</Text>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((opt, idx) => (
        <TouchableOpacity key={idx} style={styles.option} onPress={() => handleAnswer(opt.faculty)}>
          <Text style={styles.optionText}>{opt.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#f2f2f7", padding: 20, justifyContent: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  question: { fontSize: 18, marginBottom: 20 },
  option: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  optionText: { fontSize: 16 },
  recommendation: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 20, color: "#007aff" },
  button: { backgroundColor: "#007aff", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
