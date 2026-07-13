import React, { useState, useEffect } from 'react';
import { EnvironmentalState, SymptomState } from './types';
import SensorPanel from './components/SensorPanel';
import SymptomChecker from './components/SymptomChecker';
import ChatOfficer from './components/ChatOfficer';
import EmergencyButton from './components/EmergencyButton';
import FactoriesActRef from './components/FactoriesActRef';
import LeanCanvas from './components/LeanCanvas';
import ReportGenerator from './components/ReportGenerator';
import SafetyQuiz from './components/SafetyQuiz';
import PlumeSimulator from './components/PlumeSimulator';
import { ShieldCheck, Flame, Users, BookOpen, FileText, Bot, Clock, AlertTriangle, AlertOctagon, GraduationCap, Compass } from 'lucide-react';

export default function App() {
  // Environmental Sensor States
  const [sensors, setSensors] = useState<EnvironmentalState>({
    co: {
      name: 'Carbon Monoxide',
      chemicalFormula: 'CO',
      value: 12,
      unit: 'ppm',
      warningLimit: 35,
      criticalLimit: 100,
      status: 'NORMAL',
      description: 'By-product of boilers/furnaces. Blocks oxygen in red blood cells.',
    },
    h2s: {
      name: 'Hydrogen Sulfide',
      chemicalFormula: 'H₂S',
      value: 1.5,
      unit: 'ppm',
      warningLimit: 10,
      criticalLimit: 20,
      status: 'NORMAL',
      description: 'Sewer & refinery gas. Blocks olfactory nerve; extremely toxic.',
    },
    methane: {
      name: 'Methane',
      chemicalFormula: 'CH₄',
      value: 0.1,
      unit: '% LEL',
      warningLimit: 1.0,
      criticalLimit: 2.5,
      status: 'NORMAL',
      description: 'Coalbed explosive gas. Flammable. Displaces oxygen.',
    },
    temperature: {
      name: 'Temperature (Thermal Stress)',
      value: 24.5,
      unit: '°C',
      warningLimit: 35,
      criticalLimit: 38,
      status: 'NORMAL',
      description: 'Measures worker heat wave limits under Wet Bulb OSHA rules.',
    },
    noise: {
      name: 'Noise Level',
      value: 68,
      unit: 'dB',
      warningLimit: 85,
      criticalLimit: 95,
      status: 'NORMAL',
      description: 'Protects workers from permanent industrial hearing damage.',
    },
  });

  // Worker Sickness Checklist States
  const [symptoms, setSymptoms] = useState<SymptomState>({
    nausea: false,
    dizziness: false,
    headache: false,
    eyeIrritation: false,
    breathingDifficulty: false,
    skinRash: false,
  });

  // Panel presets
  const [activePreset, setActivePreset] = useState<string>('normal');

  // Interactive Tabbed Navigation for Right Console
  const [activeTab, setActiveTab] = useState<'chat' | 'database' | 'canvas' | 'report' | 'training' | 'simulator'>('chat');

  // Emergency overlay trigger state
  const [isEmergencyTriggered, setIsEmergencyTriggered] = useState<boolean>(false);

  // Live real-time clock
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitor if any sensors are critical. If they turn critical, flash safety warnings
  const hasCriticalSensor = Object.values(sensors).some((s: any) => s.status === 'CRITICAL');

  return (
    <div className="min-h-screen bg-natural-bg flex flex-col font-sans text-natural-text antialiased selection:bg-natural-beige" id="main-app-container">
      {/* Visual Emergency flashing bar on top */}
      {hasCriticalSensor && !isEmergencyTriggered && (
        <div className="bg-natural-rose text-white text-xs font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 animate-pulse" id="sensor-critical-top-banner">
          <AlertTriangle className="w-4 h-4 animate-bounce" />
          <span>WARNING: ENV EXPOSURES EXCEED WORKER SAFETY THRESHOLDS. SEC 36 PURGE RECOMMENDED.</span>
          <button
            onClick={() => setIsEmergencyTriggered(true)}
            className="bg-white text-natural-rose px-3 py-1 rounded-md text-[10px] font-black uppercase hover:bg-natural-bg transition-all cursor-pointer shadow-xs ml-3"
          >
            Trigger Evac Siren
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white border-b border-natural-border sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs" id="app-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-natural-olive flex items-center justify-center border border-natural-olive shadow-sm">
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-natural-dark uppercase">
                AI Suraksha Officer
              </h1>
              <span className="text-[10px] bg-natural-beige text-natural-olive font-bold px-2.5 py-0.5 rounded-full border border-natural-border">
                SDG 3 & 8 Platform
              </span>
            </div>
            <p className="text-xs text-[#8A8471] font-medium">Factories Act 1948 & OSHA Compliance Safety Suite</p>
          </div>
        </div>

        {/* Global Stats bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#8A8471]">
          <div className="flex items-center gap-1.5 bg-white border border-natural-border px-3 py-1.5 rounded-xl font-mono text-natural-text">
            <Clock className="w-3.5 h-3.5 text-natural-olive" />
            <span>{currentTime || 'Syncing clock...'}</span>
          </div>

          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] font-bold text-natural-olive uppercase tracking-widest">Active Site</span>
            <span className="text-xs text-natural-text">B-7 Industrial Zone, Vadodara</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
            <span className="font-bold text-natural-text">IoT Grid: Active</span>
          </div>
        </div>
      </header>

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 p-4 sm:p-6 max-w-8xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6" id="app-main-grid">
        
        {/* Left Column: Environmental Sensors & Symptom Logging (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between" id="left-column-container">
          <div className="flex-1">
            <SensorPanel
              sensors={sensors}
              setSensors={setSensors}
              activePreset={activePreset}
              setActivePreset={setActivePreset}
            />
          </div>
          <div className="mt-6">
            <SymptomChecker
              symptoms={symptoms}
              setSymptoms={setSymptoms}
              sensors={sensors}
              onEmergencyTrigger={() => setIsEmergencyTriggered(true)}
            />
          </div>
        </div>

        {/* Right Column: Interactive Controls & Reference Docs (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col bg-white rounded-3xl shadow-sm border border-natural-border overflow-hidden" id="right-column-container">
          
          {/* Tabs Switcher Bar */}
          <div className="bg-[#FBFBFA] border-b border-natural-border p-2 flex gap-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-1 ${
                activeTab === 'chat'
                  ? 'bg-natural-olive text-white shadow-sm'
                  : 'text-natural-text hover:text-natural-dark hover:bg-natural-beige/50'
              }`}
              id="btn-tab-chat"
            >
              <Bot className="w-4 h-4" />
              AI Suraksha Chat
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-1 ${
                activeTab === 'simulator'
                  ? 'bg-natural-olive text-white shadow-sm'
                  : 'text-natural-text hover:text-natural-dark hover:bg-natural-beige/50'
              }`}
              id="btn-tab-simulator"
            >
              <Compass className="w-4 h-4" />
              Drift Simulator
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-1 ${
                activeTab === 'training'
                  ? 'bg-natural-olive text-white shadow-sm'
                  : 'text-natural-text hover:text-natural-dark hover:bg-natural-beige/50'
              }`}
              id="btn-tab-training"
            >
              <GraduationCap className="w-4 h-4" />
              Suraksha Quiz
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-1 ${
                activeTab === 'database'
                  ? 'bg-natural-olive text-white shadow-sm'
                  : 'text-natural-text hover:text-natural-dark hover:bg-natural-beige/50'
              }`}
              id="btn-tab-database"
            >
              <BookOpen className="w-4 h-4" />
              Compliance Library
            </button>
            <button
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-1 ${
                activeTab === 'canvas'
                  ? 'bg-natural-olive text-white shadow-sm'
                  : 'text-natural-text hover:text-natural-dark hover:bg-natural-beige/50'
              }`}
              id="btn-tab-canvas"
            >
              <Users className="w-4 h-4" />
              Lean Canvas
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-1 ${
                activeTab === 'report'
                  ? 'bg-natural-olive text-white shadow-sm'
                  : 'text-natural-text hover:text-natural-dark hover:bg-natural-beige/50'
              }`}
              id="btn-tab-report"
            >
              <FileText className="w-4 h-4" />
              Project Report
            </button>
          </div>

          {/* Active Tab Contents */}
          <div className="flex-1 min-h-0" id="tab-viewport">
            {activeTab === 'chat' && (
              <ChatOfficer
                sensors={sensors}
                symptoms={symptoms}
                onEmergencyTrigger={() => setIsEmergencyTriggered(true)}
              />
            )}
            {activeTab === 'simulator' && <PlumeSimulator sensors={sensors} />}
            {activeTab === 'training' && <SafetyQuiz />}
            {activeTab === 'database' && <FactoriesActRef />}
            {activeTab === 'canvas' && <LeanCanvas />}
            {activeTab === 'report' && <ReportGenerator />}
          </div>
        </div>
      </main>

      {/* Floating Emergency Console below (or embedded side bar) */}
      <section className="bg-white/40 border-t border-natural-border px-6 py-6" id="emergency-console-section">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-natural-olive flex items-center gap-1.5">
                <AlertOctagon className="w-4.5 h-4.5 text-natural-rose" />
                Durable Emergency Console
              </h3>
              <p className="text-xs text-natural-text leading-relaxed font-medium">
                Under the Indian Factories Act 1948, workers have the legal <strong>Section 41 Right to Warn</strong> and refuse entry inside confined spaces (Section 36) in the presence of hazardous fumes. Pressing the red alert triggers localized warning siren audio oscillators.
              </p>
            </div>
            <div className="md:col-span-4 h-full">
              <EmergencyButton
                isTriggered={isEmergencyTriggered}
                setIsTriggered={setIsEmergencyTriggered}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Evacuation Full Screen Flash Strobe Overlay when siren triggered */}
      {isEmergencyTriggered && (
        <div className="fixed inset-0 z-50 bg-[#2D2A24]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center" id="emergency-triggered-overlay">
          {/* Alternating dual warning strobe colors */}
          <div className="absolute inset-0 border-[24px] border-natural-rose animate-pulse pointer-events-none"></div>

          <div className="w-24 h-24 rounded-full bg-natural-rose border-8 border-natural-beige flex items-center justify-center animate-bounce mb-6">
            <AlertOctagon className="w-12 h-12 text-white animate-spin" />
          </div>

          <h2 className="text-4xl font-black uppercase tracking-widest animate-pulse text-natural-rose">
            !!! COMPLIANCE EVACUATION SIREN ACTIVE !!!
          </h2>
          <p className="text-base text-natural-beige mt-2 max-w-2xl font-bold">
            An environmental threshold breach or worker symptom distress has activated the dual-frequency siren oscillators. Ensure evacuation safety lines are deployed immediately!
          </p>

          <div className="bg-white text-natural-text p-6 rounded-3xl border border-natural-border max-w-xl text-left mt-6 shadow-2xl">
            <h4 className="font-extrabold text-natural-rose flex items-center gap-2 mb-2 text-sm uppercase">
              <ShieldCheck className="w-4.5 h-4.5" />
              Indian Factories Act 1948 - Safety Clearance Rules
            </h4>
            <ul className="text-xs space-y-2 list-disc pl-5 text-[#8A8471] leading-relaxed font-semibold">
              <li><strong>Ventilation Purge:</strong> Local booster exhausts turned to MAX capacity (Section 13).</li>
              <li><strong>Evacuation route:</strong> All personnel must follow the green illuminated directional floor lines.</li>
              <li><strong>Warden Deployment:</strong> Section 45 Welfare Wardens have deployed trauma blankets and chemical eye neutralizers near Assembly Zone Gate 2.</li>
              <li><strong>Wind Advisory:</strong> Walk crosswind to avoid drifting fumes and prevent secondary ignition.</li>
            </ul>
          </div>

          <button
            onClick={() => setIsEmergencyTriggered(false)}
            className="mt-8 bg-natural-rose hover:bg-natural-rose/90 text-white font-black px-8 py-3 rounded-2xl border-2 border-natural-border text-sm tracking-wider cursor-pointer active:scale-95 transition-all shadow-lg"
            id="emergency-overlay-dismiss"
          >
            DISMISS SIREN & RESET AIR TELEMETRY
          </button>
        </div>
      )}

      {/* Small Legal Footer */}
      <footer className="bg-natural-text border-t border-natural-border py-4 px-6 text-center text-[10px] text-white/70 font-mono" id="app-footer">
        🇮🇳 Designed & Developed for United Nations SDG 3 & SDG 8 Submission | Ministry of Labour & Employment Compliance Rules
      </footer>
    </div>
  );
}
