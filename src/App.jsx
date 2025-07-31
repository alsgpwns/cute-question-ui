import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css"; // 폰트 적용을 위해 css import 추가

const questions = {
  date: [
    "오늘의 TMI",
    "이성친구 어디까지 허용가능해?",
    "올해 내 추구미는?",
    "좋아하는 향기 (향수)",
    "남들에겐 사소하지만, 나한텐 중요한것",
    "올해 OOO 하느라 시간가는줄 몰랐다.",
    "올해 새롭게 OOO의 팬이 되었다.",
    "올해 깨진 나의 편견",
    "올해는 OOO을 새롭게 시도해봤다",
    "올해 내 생일에 OOO 했다.",
    "OOO의 OOO을 닮고싶다.",
    "이젠 OOO도 참을 수 있게 되었다.",
    "올해 진짜 재밌게 본 콘텐츠!",
    "올해 OOO때문에 펑펑 울었다.",
    "내가 OOO까지 할 수 있는 사람인지 몰랐다.",
    "OOO때문에 AI의 도움을 받았다.",
    "올해 OOO 때문에 분노했다.",
    "작지만 나의 확실한 기분 전환법!",
    "[봄, 여름, 가을, 겨울] 의 OOO가 가장 좋다.",
    "올해 가장 잘한 소비는?",
    "내 첫인상은?",
    "올해 재밌게 다녀온 OOO [팝업/행사/콘서트]",
    "OOO는 사치일까?",
    "올여름 OOO로 버텼다.",
    "OOO을 함부로 비웃지 않게 되었다.",
    "올해 OOO를 보는 관점이 바뀌었다.",
    "올해 나의 스트레스 주범은 OOO다.",
    "생각이 많아질 때면 OOO한다.",
    "올해 OOO에 조바심을 느꼈다.",
    "올해 용기를 내어 OOO라고 말했다."
  ],
  friend: [
    "나랑 제일 기억에 남는 사건은?",
    "오늘의 TMI",
    "서로 처음 만난 날 기억나?",
    "내 첫인상은?",
    "친구한테 고마운점 한가지 얘기하기!",
    "친구한테 미안했던점 한가지 얘기하기!"
  ]
};

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-pink-100 font-yeonyoo flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">무엇이든 물어보세요 💬</h1>

      <div className="flex gap-2 mb-4">
        <button
          className="rounded-full px-4 py-2 text-sm font-semibold bg-white text-pink-400 border border-pink-400"
          onClick={() => navigate("/date")}
        >💘 소개팅</button>
        <button
          className="rounded-full px-4 py-2 text-sm font-semibold bg-white text-orange-400 border border-orange-400"
          onClick={() => navigate("/friend")}
        >🧡 찐친</button>
        <button
          className="rounded-full px-4 py-2 text-sm font-semibold bg-white text-purple-400 border border-purple-400"
          onClick={() => navigate("/adult")}
        >🔞 19금</button>
      </div>
    </div>
  );
}

function QuestionPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const list = questions[category] || [];
  const [remainingQuestions, setRemainingQuestions] = useState([...list]);
  const [question, setQuestion] = useState(() => {
    const initial = [...list];
    return initial.splice(Math.floor(Math.random() * initial.length), 1)[0] || "질문이 없습니다.";
  });

  useEffect(() => {
    const filtered = list.filter((q) => q !== question);
    setRemainingQuestions(filtered);
  }, [category]);

  const getRandomQuestion = () => {
    if (remainingQuestions.length === 0) {
      alert("모든 질문을 다 봤어요! 다시 시작하려면 페이지를 새로고침하세요.");
      return;
    }
    const updated = [...remainingQuestions];
    const randomIndex = Math.floor(Math.random() * updated.length);
    const nextQuestion = updated.splice(randomIndex, 1)[0];
    setQuestion(nextQuestion);
    setRemainingQuestions(updated);
  };

  const titleMap = {
    date: "💘 소개팅 질문 💘",
    friend: "🧡 찐친 질문 🧡",
    adult: "🔞 19금 질문 🔞",
  };

  return (
    <div className="min-h-screen bg-pink-100 font-yeonyoo flex flex-col items-center justify-center p-4">
      <button
        className="mb-4 text-sm text-gray-600 hover:underline"
        onClick={() => navigate("/")}
      >← 홈으로</button>

      <h2 className="text-xl font-semibold mb-2 text-gray-700">
        {titleMap[category] || "질문"}
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={question}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6 text-center max-w-xs w-full mb-4"
        >
          <p className="text-lg text-gray-700">{question}</p>
        </motion.div>
      </AnimatePresence>

      <button
        className="mt-2 bg-pink-300 text-white rounded-full px-6 py-2 font-semibold shadow-md hover:bg-pink-400 transition"
        onClick={getRandomQuestion}
      >↻ 다음 질문</button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":category" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}
