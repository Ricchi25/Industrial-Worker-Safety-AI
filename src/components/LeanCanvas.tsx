import React from 'react';
import { LeanCanvasModel } from '../types';
import { HelpCircle, Star, Sparkles, TrendingUp, Users, DollarSign, Activity, FileText, ShieldCheck } from 'lucide-react';

export default function LeanCanvas() {
  const canvas: LeanCanvasModel = {
    problem: {
      title: '1. Problem (Samsya)',
      description: 'The core pain points faced by industrial workers and governance',
      points: [
        'Unmonitored toxic gases (CO, H2S, CH4) leading to sudden suffocation, blasts, or explosions.',
        'Neglected health of informal laborers due to illegal contractor practices in India.',
        'Government rules (Factories Act 1948) are present on paper but rarely enforced on the factory floor.',
        'Fatal occupational accidents causing permanent body damage or death.',
      ],
    },
    solution: {
      title: '2. Solution (Upay)',
      description: 'How this AI Safety platform addresses the problem',
      points: [
        'Real-time IoT environmental gas and thermal sensors coupled to local warning purges.',
        'Frequent symptom checklist checking for workers, automatically correlating symptoms to gas leaks.',
        'Hinglish AI safety assistant giving immediate compliant first-aid instructions.',
        'High-audibility emergency strobe and audio alarm system for evacuation.',
      ],
    },
    keyMetrics: {
      title: '3. Key Metrics (Maapdand)',
      description: 'How we track safety system success',
      points: [
        'Reduction in hazardous response times from minutes to sub-seconds.',
        '100% daily worker symptom check-in compliance rate.',
        'Zero unreported gas leak incidents.',
        'Safety committee compliance audit score under Factories Act Section 41.',
      ],
    },
    uvp: {
      title: '4. Unique Value Proposition',
      description: 'What makes this solution unique and valuable',
      points: [
        'First-ever AI system in India that translates complex Factories Act 1948 and OSHA laws into simple, friendly Hinglish for undereducated workers.',
        'Predictive AI coupling of worker-reported physical symptoms with raw IoT environmental telemetry to diagnose toxic leaks before they become fatal blasts.',
      ],
    },
    unfairAdvantage: {
      title: '5. Unfair Advantage',
      description: 'What makes this hard to copy or replace',
      points: [
        'Deep semantic model trained on historical Indian industrial disasters and specific Factories Act welfare sections.',
        'Dual-tone Web Audio siren and hardware integration that bypasses traditional, sluggish web alert latency.',
        'Zero-friction client design tailored for mobile browsers.',
      ],
    },
    channels: {
      title: '6. Channels (Maadhyam)',
      description: 'How we reach our target audience',
      points: [
        'Government of India (GOI) labor departments and industrial inspectors.',
        'Compliance officer dashboards distributed to safety wardens.',
        'Mandatory QR code poster portals placed on factory entry walls.',
      ],
    },
    customerSegments: {
      title: '7. Customer Segments',
      description: 'Who we are building this for',
      points: [
        'Indian industrial workers (under-represented, unorganized labor).',
        'Small-to-medium manufacturing chemical plants, steel smelting furnaces, and coal mines.',
        'Government safety regulatory boards and insurance providers checking risk mitigation.',
      ],
    },
    costStructure: {
      title: '8. Cost Structure',
      description: 'Key expenses to run the system',
      points: [
        'Cloud hosting and Gemini API server proxy costs.',
        'Hardware deployment for basic IoT sensors (Methane, H2S, Thermal).',
        'Local safety warden educational seminars and worker onboarding.',
      ],
    },
    revenueStreams: {
      title: '9. Revenue Streams / Social Value',
      description: 'How the project sustains itself financially',
      points: [
        'Government safety compliance grants under the national SDG health funding lines (SDG 3, 8).',
        'B2B SaaS subscription model for large industrial complexes to lower insurance premiums.',
        'Corporate Social Responsibility (CSR) funds from heavy manufacturing companies.',
      ],
    },
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-natural-border p-6 flex flex-col h-[550px]" id="lean-canvas-root">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-natural-dark tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-natural-olive" />
            Social Lean Canvas Model
          </h2>
          <p className="text-sm text-[#8A8471]">Academic & business blueprint aligned with Sustainable Development Goals</p>
        </div>
        <div className="bg-natural-beige/30 border border-natural-border text-natural-olive text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          SDG 3 & SDG 8 Blueprint
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1" id="lean-canvas-grid-container">
        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Column 1: Problem & Key Metrics */}
          <div className="space-y-4">
            {/* Problem */}
            <div className="bg-natural-rose/5 border border-natural-rose/20 p-4 rounded-2xl hover:shadow-xs transition-shadow">
              <h3 className="text-xs font-bold text-natural-rose flex items-center gap-1.5 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-natural-rose" />
                {canvas.problem.title}
              </h3>
              <p className="text-[10px] text-[#8A8471] mt-0.5 font-medium">{canvas.problem.description}</p>
              <ul className="text-xs text-natural-text mt-2.5 space-y-1.5 list-disc pl-4 leading-relaxed font-bold">
                {canvas.problem.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>

            {/* Key Metrics */}
            <div className="bg-natural-bg/30 border border-natural-border p-4 rounded-2xl hover:shadow-xs transition-shadow">
              <h3 className="text-xs font-bold text-natural-dark flex items-center gap-1.5 uppercase tracking-wider">
                <Activity className="w-4 h-4 text-natural-olive" />
                {canvas.keyMetrics.title}
              </h3>
              <p className="text-[10px] text-[#8A8471] mt-0.5 font-medium">{canvas.keyMetrics.description}</p>
              <ul className="text-xs text-natural-text mt-2.5 space-y-1.5 list-disc pl-4 leading-relaxed font-bold">
                {canvas.keyMetrics.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>
          </div>

          {/* Column 2: Solution, UVP, Channels */}
          <div className="space-y-4">
            {/* Solution */}
            <div className="bg-natural-olive/5 border border-natural-border p-4 rounded-2xl hover:shadow-xs transition-shadow">
              <h3 className="text-xs font-bold text-natural-olive flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-natural-olive" />
                {canvas.solution.title}
              </h3>
              <p className="text-[10px] text-[#8A8471] mt-0.5 font-medium">{canvas.solution.description}</p>
              <ul className="text-xs text-natural-text mt-2.5 space-y-1.5 list-disc pl-4 leading-relaxed font-bold">
                {canvas.solution.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>

            {/* Unique Value Prop */}
            <div className="bg-natural-beige/20 border border-natural-border p-4 rounded-2xl hover:shadow-xs transition-shadow">
              <h3 className="text-xs font-bold text-natural-olive flex items-center gap-1.5 uppercase tracking-wider">
                <Star className="w-4 h-4 text-natural-olive" />
                {canvas.uvp.title}
              </h3>
              <p className="text-[10px] text-[#8A8471] mt-0.5 font-medium">{canvas.uvp.description}</p>
              <ul className="text-xs text-natural-text mt-2.5 space-y-1.5 list-disc pl-4 leading-relaxed font-bold">
                {canvas.uvp.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>

            {/* Channels */}
            <div className="bg-natural-bg/30 border border-natural-border p-4 rounded-2xl hover:shadow-xs transition-shadow">
              <h3 className="text-xs font-bold text-natural-dark flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-natural-olive" />
                {canvas.channels.title}
              </h3>
              <p className="text-[10px] text-[#8A8471] mt-0.5 font-medium">{canvas.channels.description}</p>
              <ul className="text-xs text-natural-text mt-2.5 space-y-1.5 list-disc pl-4 leading-relaxed font-bold">
                {canvas.channels.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>
          </div>

          {/* Column 3: Unfair Advantage, Customer Segments, Costs & Revenue */}
          <div className="space-y-4">
            {/* Unfair Advantage */}
            <div className="bg-natural-sand/5 border border-natural-sand/20 p-4 rounded-2xl hover:shadow-xs transition-shadow">
              <h3 className="text-xs font-bold text-natural-sand flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-natural-sand" />
                {canvas.unfairAdvantage.title}
              </h3>
              <p className="text-[10px] text-[#8A8471] mt-0.5 font-medium">{canvas.unfairAdvantage.description}</p>
              <ul className="text-xs text-natural-text mt-2.5 space-y-1.5 list-disc pl-4 leading-relaxed font-bold">
                {canvas.unfairAdvantage.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>

            {/* Customer Segments */}
            <div className="bg-[#FDFCFB] border border-natural-border p-4 rounded-2xl hover:shadow-xs transition-shadow">
              <h3 className="text-xs font-bold text-natural-dark flex items-center gap-1.5 uppercase tracking-wider">
                <Users className="w-4 h-4 text-natural-olive" />
                {canvas.customerSegments.title}
              </h3>
              <p className="text-[10px] text-[#8A8471] mt-0.5 font-medium">{canvas.customerSegments.description}</p>
              <ul className="text-xs text-natural-text mt-2.5 space-y-1.5 list-disc pl-4 leading-relaxed font-bold">
                {canvas.customerSegments.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>

            {/* Cost & Revenue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Costs */}
              <div className="bg-natural-bg/20 border border-natural-border p-3 rounded-2xl hover:shadow-xs transition-shadow">
                <h4 className="text-[10px] font-bold text-natural-dark flex items-center gap-1 uppercase tracking-wider">
                  <DollarSign className="w-3.5 h-3.5 text-natural-rose animate-pulse" />
                  Costs
                </h4>
                <ul className="text-[10px] text-natural-text mt-1.5 space-y-1 list-disc pl-3.5 leading-relaxed font-bold">
                  {canvas.costStructure.points.map((p, idx) => <li key={idx}>{p}</li>)}
                </ul>
              </div>

              {/* Revenues */}
              <div className="bg-natural-bg/20 border border-natural-border p-3 rounded-2xl hover:shadow-xs transition-shadow">
                <h4 className="text-[10px] font-bold text-natural-dark flex items-center gap-1 uppercase tracking-wider">
                  <DollarSign className="w-3.5 h-3.5 text-natural-olive" />
                  Revenue
                </h4>
                <ul className="text-[10px] text-natural-text mt-1.5 space-y-1 list-disc pl-3.5 leading-relaxed font-bold">
                  {canvas.revenueStreams.points.map((p, idx) => <li key={idx}>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
