// app/quiz.js
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
// QUESTIONS DATA
// An array of question objects.
// Each question object has a question string and an answers array.
// Each answer object has a text string and a category string.
// ─────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    question: "What do you enjoy doing the most?",
    icon: "heart-outline",
    answers: [
      {
        text: "Solving problems using computers",
        category: "IT",
        icon: "desktop-outline",
      },
      {
        text: "Planning and managing businesses",
        category: "Business",
        icon: "briefcase-outline",
      },
      {
        text: "Designing visuals or creative work",
        category: "Design",
        icon: "color-palette-outline",
      },
      {
        text: "Building or fixing physical systems",
        category: "Engineering",
        icon: "construct-outline",
      },
    ],
  },
  {
    question: "Which subject do you prefer?",
    icon: "book-outline",
    answers: [
      {
        text: "Computer Studies / ICT",
        category: "IT",
        icon: "code-slash-outline",
      },
      {
        text: "Accounting / Economics",
        category: "Business",
        icon: "cash-outline",
      },
      {
        text: "Art / Media Studies",
        category: "Design",
        icon: "brush-outline",
      },
      {
        text: "Mathematics / Physics",
        category: "Engineering",
        icon: "calculator-outline",
      },
    ],
  },
  {
    question: "What kind of career do you want?",
    icon: "briefcase-outline",
    answers: [
      {
        text: "Software developer or IT specialist",
        category: "IT",
        icon: "laptop-outline",
      },
      {
        text: "Entrepreneur or manager",
        category: "Business",
        icon: "people-outline",
      },
      {
        text: "Designer or creative professional",
        category: "Design",
        icon: "sparkles-outline",
      },
      {
        text: "Engineer or technician",
        category: "Engineering",
        icon: "settings-outline",
      },
    ],
  },
  {
    question: "How do you prefer working?",
    icon: "options-outline",
    answers: [
      {
        text: "With computers and systems",
        category: "IT",
        icon: "server-outline",
      },
      {
        text: "With people and organizations",
        category: "Business",
        icon: "handshake-outline",
      },
      {
        text: "With creativity and ideas",
        category: "Design",
        icon: "bulb-outline",
      },
      {
        text: "With tools and machines",
        category: "Engineering",
        icon: "hammer-outline",
      },
    ],
  },
  {
    question: "What describes you best?",
    icon: "person-outline",
    answers: [
      {
        text: "Logical and analytical thinker",
        category: "IT",
        icon: "analytics-outline",
      },
      {
        text: "Strategic and goal-oriented",
        category: "Business",
        icon: "trending-up-outline",
      },
      {
        text: "Imaginative and expressive",
        category: "Design",
        icon: "image-outline",
      },
      {
        text: "Practical and hands-on",
        category: "Engineering",
        icon: "build-outline",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// FACULTY RESULTS
// An object that maps each category string to a result object.
// Each result has the faculty name, description, icon, and colour.
// ─────────────────────────────────────────────────────────────
const RESULTS = {
  IT: {
    faculty: "Faculty of ICT",
    full: "Information & Communication Technology",
    description:
      "You have a logical, analytical mind — perfect for software development, networking, and IT systems.",
    icon: "desktop-outline",
    color: "#2563eb",
    courses: [
      "Software Engineering",
      "Web Development",
      "Computer Networking",
      "Information Technology",
      "Business IT",
    ],
  },
  Business: {
    faculty: "Faculty of Business",
    full: "Business & Globalization",
    description:
      "You are strategic and people-oriented — built for management, marketing, and entrepreneurship.",
    icon: "briefcase-outline",
    color: "#059669",
    courses: [
      "Business Management",
      "Marketing Management",
      "Entrepreneurship",
      "HR Management",
      "International Business",
    ],
  },
  Design: {
    faculty: "Faculty of Creative Multimedia",
    full: "Creative Multimedia",
    description:
      "You are creative and expressive — ideal for graphic design, animation, and digital storytelling.",
    icon: "color-palette-outline",
    color: "#d97706",
    courses: [
      "Graphic Design",
      "Animation & Motion Graphics",
      "Film & Video Production",
      "Digital Storytelling",
      "Audio Engineering",
    ],
  },
  Engineering: {
    faculty: "Faculty of Architecture",
    full: "Architecture & Built Environment",
    description:
      "You are practical and precise — well-suited for architectural technology and construction.",
    icon: "business-outline",
    color: "#7c3aed",
    courses: [
      "Architectural Technology",
      "Building Construction",
      "Quantity Surveying",
      "Structural Engineering",
      "Building Materials",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// STYLES
// Defined BEFORE all components so they are available when used.
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

  /* ── SCROLL CONTENT ── */
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },

  /* ── PROGRESS SECTION ── */
  progressSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  progressTopRow: {
    flexDirection: "row", // "Question X of Y" on left, percentage on right
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },
  progressPct: {
    fontSize: 13,
    fontWeight: "800",
    color: "#2563eb",
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden", // clips the fill bar to the track's rounded corners
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 4,
  },

  /* ── STEP DOTS ── */
  dotsRow: {
    flexDirection: "row", // one dot per question, in a row
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },

  /* ── QUESTION CARD ── */
  questionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  questionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 28,
  },

  /* ── ANSWER BUTTONS ── */
  answerBtn: {
    flexDirection: "row", // icon on the left, text on the right
    alignItems: "center",
    gap: 14,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  answerBtnSelected: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  answerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  answerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 20,
  },
  answerTextSelected: {
    color: "#2563eb",
  },
  answerCheck: {
    width: 24,
    height: 24,
    borderRadius: 12, // circle shape
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* ── NEXT BUTTON ── */
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 6,
  },
  nextBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ── RESULT SCREEN ── */
  resultHeader: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  resultIconOuter: {
    width: 90,
    height: 90,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  resultTag: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  resultFacultyName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 6,
  },
  resultFullName: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    fontWeight: "500",
  },
  resultDescCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  resultDescHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },
  coursesCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  coursesHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  courseRow: {
    flexDirection: "row", // dot + course name in a row
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  courseDot: {
    width: 8,
    height: 8,
    borderRadius: 4, // circle shape
    flexShrink: 0,
  },
  courseText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  scoreCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  scoreHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 14,
  },
  scoreRow: {
    flexDirection: "row", // category label + bar + score in a row
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
    width: 80, // fixed width so bars all start at the same X position
  },
  scoreBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 4,
    overflow: "hidden",
  },
  scoreBarFill: {
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  scoreNum: {
    fontSize: 12,
    fontWeight: "800",
    color: "#ffffff",
    width: 20,
    textAlign: "right",
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 12,
  },
  primaryBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "700",
  },
  retakeBtn: {
    alignItems: "center",
    paddingVertical: 12,
  },
  retakeBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    textDecorationLine: "underline",
  },
});

// ─────────────────────────────────────────────────────────────
// MAIN SCREEN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function CareerQuiz() {
  const router = useRouter();

  // currentQuestion is a number — the index of the active question (0 to 4)
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // selectedAnswer is a number or null — the index of the tapped answer in
  // the current question's answers array. null means nothing selected yet.
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // scores is an object — tracks how many times each category was chosen
  const [scores, setScores] = useState({
    IT: 0,
    Business: 0,
    Design: 0,
    Engineering: 0,
  });

  // finished is a boolean — true when all questions have been answered
  const [finished, setFinished] = useState(false);

  // ── Handle tapping an answer option ──
  // Just highlights it — does NOT advance yet (user must press Next)
  const handleSelect = (index) => {
    setSelectedAnswer(index);
  };

  // ── Handle pressing the Next / Finish button ──
  const handleNext = () => {
    if (selectedAnswer === null) return; // do nothing if no answer selected

    // Get the category of the selected answer
    const category =
      QUESTIONS[currentQuestion].answers[selectedAnswer].category;

    // Update the scores object — add 1 to the chosen category
    const newScores = { ...scores, [category]: scores[category] + 1 };
    setScores(newScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      // More questions remain — advance to the next one
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // clear the selection for the next question
    } else {
      // Last question answered — show the result screen
      setFinished(true);
    }
  };

  // ── Work out which category scored highest ──
  const getTopCategory = (s) => {
    // Object.entries(s) turns the scores object into an array of [key, value] pairs
    // e.g. { IT: 2, Business: 1 } becomes [["IT", 2], ["Business", 1]]
    // .sort((a, b) => b[1] - a[1]) sorts by the value (score) descending
    // [0][0] picks the key (category name) of the first (highest) item
    return Object.entries(s).sort((a, b) => b[1] - a[1])[0][0];
  };

  // ── Calculate progress percentage for the progress bar ──
  // currentQuestion / QUESTIONS.length gives a number between 0 and 1
  // multiplied by 100 gives the percentage
  const progressPct = Math.round((currentQuestion / QUESTIONS.length) * 100);

  // The current question object from the array
  const question = QUESTIONS[currentQuestion];

  // ─────────────────────────────────────────────────────────────
  // RESULT SCREEN
  // Shown when finished is true
  // ─────────────────────────────────────────────────────────────
  if (finished) {
    const topCat = getTopCategory(scores);
    const result = RESULTS[topCat]; // the result object for the top category

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push("/")}
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Result</Text>
          {/* Completed badge */}
          <View
            style={[
              styles.headerBadge,
              { backgroundColor: result.color + "18" },
            ]}
          >
            <Ionicons name="checkmark-circle" size={14} color={result.color} />
            <Text style={[styles.headerBadgeText, { color: result.color }]}>
              Done
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* ── RESULT ICON + FACULTY NAME ── */}
          <View style={styles.resultHeader}>
            <View
              style={[
                styles.resultIconOuter,
                { backgroundColor: result.color + "18" },
              ]}
            >
              <Ionicons name={result.icon} size={44} color={result.color} />
            </View>
            <Text style={[styles.resultTag, { color: result.color }]}>
              Recommended Faculty
            </Text>
            <Text style={styles.resultFacultyName}>{result.faculty}</Text>
            <Text style={styles.resultFullName}>{result.full}</Text>
          </View>

          {/* ── DESCRIPTION CARD ── */}
          <View style={styles.resultDescCard}>
            <Text style={styles.resultDescHeading}>Why this faculty?</Text>
            <Text style={styles.resultDesc}>{result.description}</Text>
          </View>

          {/* ── COURSES CARD ── */}
          {/* result.courses is an array of course name strings */}
          <View style={styles.coursesCard}>
            <Text style={styles.coursesHeading}>Courses you can study</Text>
            {result.courses.map((course, i) => (
              // Loop over the courses array and render one row per course
              <View key={i} style={styles.courseRow}>
                <View
                  style={[styles.courseDot, { backgroundColor: result.color }]}
                />
                <Text style={styles.courseText}>{course}</Text>
              </View>
            ))}
          </View>

          {/* ── SCORE BREAKDOWN CARD ── */}
          <View style={[styles.scoreCard, { backgroundColor: result.color }]}>
            <Text style={styles.scoreHeading}>Your Score Breakdown</Text>
            {/* Object.entries(scores) turns the scores object into an array
                of [category, score] pairs so we can loop over them */}
            {Object.entries(scores).map(([cat, score]) => (
              <View key={cat} style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>{cat}</Text>
                <View style={styles.scoreBarTrack}>
                  <View
                    style={[
                      styles.scoreBarFill,
                      // Width = (score / total questions) * 100%
                      { width: `${(score / QUESTIONS.length) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.scoreNum}>{score}</Text>
              </View>
            ))}
          </View>

          {/* ── ACTION BUTTONS ── */}
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: result.color }]}
            onPress={() => router.push("/faculties")}
          >
            <Ionicons name="school-outline" size={18} color="#fff" />
            <Text style={styles.primaryBtnText}>Explore This Faculty</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: result.color }]}
            onPress={() => router.push("/")}
          >
            <Ionicons name="home-outline" size={18} color={result.color} />
            <Text style={[styles.secondaryBtnText, { color: result.color }]}>
              Back to Home
            </Text>
          </TouchableOpacity>

          {/* Retake link — resets all state back to the start */}
          <TouchableOpacity
            style={styles.retakeBtn}
            onPress={() => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setScores({ IT: 0, Business: 0, Design: 0, Engineering: 0 });
              setFinished(false);
            }}
          >
            <Text style={styles.retakeBtnText}>Retake the Quiz</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // QUIZ SCREEN
  // Shown when finished is false (still answering questions)
  // ─────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/")}
        >
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career Quiz</Text>
        {/* Shows current question number out of total */}
        <View style={styles.headerBadge}>
          <Ionicons name="help-circle-outline" size={14} color="#2563eb" />
          <Text style={styles.headerBadgeText}>
            {currentQuestion + 1} / {QUESTIONS.length}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── PROGRESS BAR + STEP DOTS ── */}
        <View style={styles.progressSection}>
          {/* Top row — label on left, percentage on right */}
          <View style={styles.progressTopRow}>
            <Text style={styles.progressLabel}>
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </Text>
            <Text style={styles.progressPct}>{progressPct}%</Text>
          </View>

          {/* Progress bar — fill width increases with each answered question */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
          </View>

          {/* Step dots — one dot per question, wider when active */}
          <View style={styles.dotsRow}>
            {QUESTIONS.map((_, i) => (
              // Loop over QUESTIONS array using just the index i
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    // Active dot is wider (20px) and blue, past/future dots are narrow (8px) and grey
                    width: i === currentQuestion ? 20 : 8,
                    backgroundColor:
                      i <= currentQuestion ? "#2563eb" : "#e2e8f0",
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* ── QUESTION CARD ── */}
        <View style={styles.questionCard}>
          {/* Question icon */}
          <View style={styles.questionIconBox}>
            <Ionicons name={question.icon} size={24} color="#2563eb" />
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* ── ANSWER OPTIONS ── */}
        {/* question.answers is an array — .map() renders one button per answer */}
        {question.answers.map((answer, index) => {
          // isSelected is true when this answer's index matches selectedAnswer
          const isSelected = selectedAnswer === index;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerBtn,
                // Apply the selected style (blue border + light background) if chosen
                isSelected && styles.answerBtnSelected,
              ]}
              onPress={() => handleSelect(index)}
              activeOpacity={0.8}
            >
              {/* Answer icon box — blue background when selected */}
              <View
                style={[
                  styles.answerIconBox,
                  { backgroundColor: isSelected ? "#2563eb" : "#f1f5f9" },
                ]}
              >
                <Ionicons
                  name={answer.icon}
                  size={18}
                  color={isSelected ? "#ffffff" : "#6b7280"}
                />
              </View>

              {/* Answer text */}
              <Text
                style={[
                  styles.answerText,
                  isSelected && styles.answerTextSelected,
                ]}
              >
                {answer.text}
              </Text>

              {/* Checkmark circle on the right — filled when selected */}
              <View
                style={[
                  styles.answerCheck,
                  { backgroundColor: isSelected ? "#2563eb" : "#f1f5f9" },
                ]}
              >
                <Ionicons
                  name={isSelected ? "checkmark" : "ellipse-outline"}
                  size={14}
                  color={isSelected ? "#ffffff" : "#d1d5db"}
                />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* ── NEXT / FINISH BUTTON ── */}
        <TouchableOpacity
          style={[
            styles.nextBtn,
            {
              // Blue when an answer is selected, grey when nothing is selected
              backgroundColor: selectedAnswer !== null ? "#2563eb" : "#e2e8f0",
            },
          ]}
          onPress={handleNext}
          disabled={selectedAnswer === null} // blocks press until an answer is picked
        >
          <Text
            style={[
              styles.nextBtnText,
              // Grey text when disabled
              { color: selectedAnswer !== null ? "#ffffff" : "#9ca3af" },
            ]}
          >
            {/* Show "See Results" on the last question, "Next Question" on others */}
            {currentQuestion === QUESTIONS.length - 1
              ? "See My Results"
              : "Next Question"}
          </Text>
          <Ionicons
            name={
              currentQuestion === QUESTIONS.length - 1
                ? "checkmark-circle-outline"
                : "arrow-forward"
            }
            size={18}
            color={selectedAnswer !== null ? "#ffffff" : "#9ca3af"}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
