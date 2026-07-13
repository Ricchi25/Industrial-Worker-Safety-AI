export type AlertStatus = 'NORMAL' | 'WARNING' | 'CRITICAL';

export interface SensorMetric {
  name: string;
  chemicalFormula?: string;
  value: number;
  unit: string;
  warningLimit: number;
  criticalLimit: number;
  status: AlertStatus;
  description: string;
}

export interface EnvironmentalState {
  co: SensorMetric;
  h2s: SensorMetric;
  methane: SensorMetric;
  temperature: SensorMetric;
  noise: SensorMetric;
}

export interface SymptomState {
  nausea: boolean;
  dizziness: boolean;
  headache: boolean;
  eyeIrritation: boolean;
  breathingDifficulty: boolean;
  skinRash: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface IncidentRecord {
  id: string;
  year: number;
  state: string;
  industryType: string;
  hazardType: string;
  fatalities: number;
  description: string;
  factoriesActSection: string;
}

export interface LeanCanvasSection {
  title: string;
  description: string;
  points: string[];
}

export interface LeanCanvasModel {
  problem: LeanCanvasSection;
  solution: LeanCanvasSection;
  keyMetrics: LeanCanvasSection;
  uvp: LeanCanvasSection; // Unique Value Proposition
  unfairAdvantage: LeanCanvasSection;
  channels: LeanCanvasSection;
  customerSegments: LeanCanvasSection;
  costStructure: LeanCanvasSection;
  revenueStreams: LeanCanvasSection;
}
