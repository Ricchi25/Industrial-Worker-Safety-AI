import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, GraduationCap, ArrowRight, ShieldAlert, BookOpen } from 'lucide-react';

interface QuizQuestion {
  question: string;
  hindiQuestion: string;
  options: string[];
  correctIdx: number;
  explanation: string;
  lawRef: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Under Section 36 of the Factories Act 1948, what is mandatory before entering any confined space (tank, pit, sewer)?",
    hindiQuestion: "Section 36 ke tehat, kisi tank ya pit (confined space) me ghusne se pehle kya sabse zaroori hai?",
    options: [
      "Wearing standard steel-toed boots only",
      "A written permit and atmospheric test for toxic gases",
      "The shift supervisor's verbal 'all clear' nod",
      "Having a full lunch before entering"
    ],
    correctIdx: 1,
    explanation: "Section 36 explicitly prohibits entering any confined space where gas, fume, or dust is present to such an extent as to involve risk of persons being overcome, unless a written certificate (permit) is granted and test confirms the space is free of gas.",
    lawRef: "Factories Act 1948 - Section 36 (Confined Space Regulations)"
  },
  {
    question: "If Methane (CH₄) gas levels reach above 2.5% LEL on the sensor panel, what is the immediate danger?",
    hindiQuestion: "Methane (CH₄) levels 2.5% LEL se zyada hone par sabse bada khatra kya hota hai?",
    options: [
      "Immediate suffocation from oxygen displacement",
      "Permanent hearing damage and auditory shocks",
      "Explosion and extreme flash fire hazard",
      "Minor skin allergies and rashes"
    ],
    correctIdx: 2,
    explanation: "Methane is highly flammable. While low levels are non-toxic, levels approaching the Lower Explosive Limit (LEL) pose severe risks of spark-ignited explosions and fires under OSHA/Indian safety rules.",
    lawRef: "OSHA Flammable Gas Standards & IS:2189 regulations"
  },
  {
    question: "What landmark right is guaranteed to workers under Section 41-H of the Factories Act?",
    hindiQuestion: "Factories Act ke Section 41-H ke tehat workers ko konsa bada adhikar mila hai?",
    options: [
      "Right to receive double salary during hot weather",
      "Right to warn of imminent danger and stop hazardous work",
      "Right to demand free snacks and tea in morning shifts",
      "Right to work without wearing protective safety equipment"
    ],
    correctIdx: 1,
    explanation: "Section 41-H (Right of workers to warn about imminent danger) states that if workers have reasonable apprehension of imminent danger to their lives, they can bring it to the notice of the occupier/manager and safety committee to stop work safely.",
    lawRef: "Factories Act 1948 - Section 41-H (Right to Warn)"
  },
  {
    question: "What is the recommended first-aid procedure for an industrial chemical skin burn before the doctor arrives?",
    hindiQuestion: "Doctor ke aane se pehle chemical burn ke liye sabse pehla pratham upchar kya hona chahiye?",
    options: [
      "Apply localized mustard oil or pure butter (ghee)",
      "Continuous flushing with cool running water for 15-20 minutes",
      "Wrap the burn area tightly with a dry heavy woolen blanket",
      "Scrub the affected skin with detergent to remove chemical residue"
    ],
    correctIdx: 1,
    explanation: "Standard chemical burn protocol dictates rinsing the skin immediately with plenty of cool running water for at least 15 to 20 minutes to neutralize and flush away residual chemicals. Never use oils/ghee as they trap heat.",
    lawRef: "OSHA Standard 1910.151 (First Aid & Eyewash protocols)"
  },
  {
    question: "According to Section 111, what is the penalty if a worker willfully neglects safety rules or interferes with safety devices?",
    hindiQuestion: "Section 111 ke anusaar, agar koi worker jaanbujhkar suraksha niyam tode, toh kya saza ho sakti hai?",
    options: [
      "A verbal warning and a free safety certificate",
      "Immediate imprisonment for 5 years without bail",
      "A fine up to 20 Rupees and strict legal reprimand",
      "No penalty is applicable to contract laborers"
    ],
    correctIdx: 2,
    explanation: "Workers have duties too! Section 111 states that if any worker willfully neglects safety appliances or rules, they can be fined up to Rs 20 (historically formulated, but legally indicative of employee responsibility).",
    lawRef: "Factories Act 1948 - Section 111 (Obligation of Workers)"
  }
];

export default function SafetyQuiz() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("vhricchi_b23@pe.vjti.ac.in");

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedIdx === null || isAnswered) return;
    setIsAnswered(true);
    if (selectedIdx === QUIZ_QUESTIONS[currentIdx].correctIdx) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setShowCertificate(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setShowCertificate(false);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  if (showCertificate) {
    const isPassed = score >= 3;
    return (
      <div className="p-6 flex flex-col h-full justify-between" id="quiz-completed-container">
        <div className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-natural-olive/10 flex items-center justify-center border border-natural-olive/20 text-natural-olive mb-2">
            <Award className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-lg font-black text-natural-dark uppercase tracking-tight">
            Suraksha Training Completed!
          </h3>
          <p className="text-xs text-[#8A8471] font-medium max-w-sm mx-auto">
            Aapne 5 me se <strong className="text-natural-dark">{score}</strong> sawalo ke sahi jawab diye hain.
          </p>

          {isPassed ? (
            <div className="p-6 bg-white border border-natural-border rounded-3xl relative overflow-hidden shadow-xs mt-4 max-w-sm mx-auto" id="safety-certificate-badge">
              <div className="absolute top-0 right-0 w-16 h-16 bg-natural-olive/5 rounded-bl-full pointer-events-none"></div>
              
              <div className="flex items-center gap-1.5 justify-center mb-4">
                <span className="text-[10px] bg-natural-olive/10 text-natural-olive font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  SDG 8 Certificate
                </span>
              </div>

              <div className="text-[10px] text-[#8A8471] uppercase tracking-wider font-mono">Certified Safe Worker</div>
              <h4 className="text-xs font-black text-natural-dark mt-1 truncate max-w-xs">{userName}</h4>
              <p className="text-[10px] text-natural-olive font-bold mt-2 leading-relaxed">
                Passed the legal compliance check under Factories Act 1948 Section 41-C rules.
              </p>

              <div className="mt-4 pt-3 border-t border-natural-border flex items-center justify-between text-[8px] text-[#8A8471] font-mono">
                <span>VERIFIED ID: VJTI-VJTI-2026</span>
                <span>STATUS: SECURE</span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-natural-rose/5 rounded-2xl border border-natural-rose/20 max-w-xs mx-auto text-xs text-natural-rose font-medium">
              You scored less than 60%. Please read the guidelines or retry the quiz to pass!
            </div>
          )}
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-natural-olive hover:bg-natural-olive/90 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer mt-6 transition-all"
          id="btn-quiz-retry"
        >
          <RotateCcw className="w-4 h-4" />
          Take Test Again (Dobara Koshish Karein)
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full justify-between" id="quiz-question-container">
      <div className="space-y-4">
        {/* Progress & Title */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-natural-olive uppercase tracking-wider flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            Safety Training Unit ({currentIdx + 1}/5)
          </span>
          <span className="text-xs font-black font-mono text-[#8A8471]">
            Score: {score}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-natural-bg rounded-full overflow-hidden border border-natural-border">
          <div 
            className="h-full bg-natural-olive transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Text */}
        <div className="bg-[#FDFCFB] border border-natural-border p-4 rounded-2xl">
          <h4 className="text-xs font-extrabold text-natural-dark leading-snug">
            {currentQuestion.question}
          </h4>
          <p className="text-[11px] text-[#8A8471] mt-2 font-semibold italic bg-natural-bg/30 px-2 py-1 rounded-lg border border-natural-border/40">
            Hinglish: {currentQuestion.hindiQuestion}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((opt, oIdx) => {
            let borderStyle = "border-natural-border hover:border-natural-olive/50 bg-[#FDFCFB]";
            let iconElement = null;

            if (isAnswered) {
              if (oIdx === currentQuestion.correctIdx) {
                borderStyle = "border-emerald-600 bg-emerald-50/20 text-emerald-950";
                iconElement = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />;
              } else if (oIdx === selectedIdx) {
                borderStyle = "border-natural-rose bg-natural-rose/5 text-natural-rose";
                iconElement = <XCircle className="w-4 h-4 text-natural-rose shrink-0 mt-0.5" />;
              } else {
                borderStyle = "border-natural-border opacity-50 bg-[#FDFCFB]";
              }
            } else if (oIdx === selectedIdx) {
              borderStyle = "border-natural-olive bg-natural-beige/10 ring-1 ring-natural-olive";
            }

            return (
              <button
                key={oIdx}
                onClick={() => handleOptionSelect(oIdx)}
                disabled={isAnswered}
                className={`w-full p-3 rounded-xl border text-left text-xs font-bold leading-snug flex items-start gap-2.5 transition-all cursor-pointer ${borderStyle}`}
                id={`quiz-option-${oIdx}`}
              >
                <span className="w-5 h-5 rounded-full bg-natural-bg border border-natural-border flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span className="flex-1">{opt}</span>
                {iconElement}
              </button>
            );
          })}
        </div>

        {/* Explanation Alert */}
        {isAnswered && (
          <div className="p-3 bg-natural-beige/30 border border-natural-border rounded-2xl space-y-1" id="quiz-explanation-box">
            <div className="text-[10px] font-extrabold text-natural-olive flex items-center gap-1 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              {currentQuestion.lawRef}
            </div>
            <p className="text-[10px] text-natural-text font-medium leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-natural-border/40 mt-4">
        {!isAnswered ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedIdx === null}
            className="w-full bg-natural-olive hover:bg-natural-olive/95 disabled:bg-natural-bg disabled:text-[#8A8471] text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border border-natural-border"
            id="btn-quiz-submit"
          >
            Submit Answer (Sahi Option Chunein)
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-natural-dark hover:bg-natural-dark/95 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            id="btn-quiz-next"
          >
            {currentIdx < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "View Assessment Certificate"}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
