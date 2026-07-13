import React, { useState } from 'react';
import { IncidentRecord } from '../types';
import { BookOpen, ShieldCheck, AlertCircle, Skull, FileText } from 'lucide-react';

export default function FactoriesActRef() {
  const [activeTab, setActiveTab] = useState<'act' | 'gases' | 'records'>('act');

  // Factories Act 1948 Interactive Checklist Data
  const actSections = [
    {
      sec: 'Section 11',
      title: 'Cleanliness (Safai)',
      desc: 'Requirement to keep the factory clean, free from effluvia arising from any drain, privy, or other nuisance. Accumulations of dirt must be removed daily.',
      compliance: 'Requires daily sweeping, weekly floor washing, and repainting/varnishing every 5 years.',
    },
    {
      sec: 'Section 13',
      title: 'Ventilation and Temperature',
      desc: 'Adequate ventilation by circulation of fresh air. Temperature must be kept within reasonable comfort limits to prevent injury to health.',
      compliance: 'For heavy workload plants, wet-bulb temperature should not exceed 30°C. Adequate exhaust hoods are mandatory.',
    },
    {
      sec: 'Section 35',
      title: 'Protection of Eyes (Aankh Ki Suraksha)',
      desc: 'Mandatory provision of suitable goggles or screens to protect the eyes of workers engaged in processes involving risk of flying particles or high intensity light.',
      compliance: 'Contractors must provide certified safety goggles. Failure to do so is a legal offense.',
    },
    {
      sec: 'Section 36',
      title: 'Precautions Against Dangerous Fumes & Gases',
      desc: 'No person shall be allowed to enter any chamber, tank, vat, pit, or other confined space in which gas, fume, or dust is likely to be present so as to involve risk of persons being overcome.',
      compliance: 'Requires strict gas-free certification, supply of breathing apparatus, and safety belts prior to worker entry.',
    },
    {
      sec: 'Section 41',
      title: 'Workers Right to Warn Imminent Danger',
      desc: 'Empowers workers directly to warn the management/occupier about any imminent danger to their safety or health. This was added to combat illegal contractor coverups.',
      compliance: 'Every factory must establish a bipartite Safety Committee consisting of equal worker and manager representatives.',
    },
    {
      sec: 'Section 45',
      title: 'First-aid Appliances',
      desc: 'Mandatory maintenance of fully equipped first-aid boxes or cupboards. For factories employing more than 500 workers, a fully functional ambulance room is required.',
      compliance: 'At least one trained first-aid warden must be present in every shift. Chemical burn eye-wash basins must be within 10 seconds of reach.',
    },
  ];

  // Gas and Exposure Limits Data
  const gasLimits = [
    {
      gas: 'Carbon Monoxide (CO)',
      formula: 'CO',
      source: 'Incomplete combustion, coal mines, furnaces, boiler leaks.',
      oshaPel: '50 ppm (PEL over 8 hours)',
      warning: '35 ppm (Siren sounds, exhaust triggers to high)',
      critical: '100 ppm (Evacuation ordered)',
      effects: 'Dizziness, nausea, headache, unconsciousness, fatal asphyxiation.',
    },
    {
      gas: 'Hydrogen Sulfide (H₂S)',
      formula: 'H₂S',
      source: 'Sewage units, paper pulp mills, chemical refineries.',
      oshaPel: '20 ppm (PEL ceiling limit)',
      warning: '10 ppm (Severe irritation, scent of rotten eggs)',
      critical: '20 ppm (Immediate sensory paralysis, sudden collapse)',
      effects: 'Eye damage, respiratory arrest, instant death in enclosed rooms.',
    },
    {
      gas: 'Methane (CH₄)',
      formula: 'CH₄',
      source: 'Underground coal mines, sewer systems, gas pipe leakages.',
      oshaPel: 'Asphyxiant (Oxygen displacement limit)',
      warning: '1.0% LEL (Lower Explosive Limit)',
      critical: '2.5% LEL (Frictional spark can lead to explosion/blast)',
      effects: 'High flammability/explosion risk, severe suffocation.',
    },
  ];

  // Actual Historical Industrial Incidents & Fatalities Database in India
  const IndianIncidents: IncidentRecord[] = [
    {
      id: 'inc-1',
      year: 2020,
      state: 'Andhra Pradesh',
      industryType: 'Chemical Polymer Plant',
      hazardType: 'Styrene Gas Leakage (LG Polymers)',
      fatalities: 12,
      description: 'Styrene monomer gas leaked from cooling tank failure during lockdown restart. Surrounding community of 3,000 fell ill. Extreme violation of cooling valve safety checklists.',
      factoriesActSection: 'Section 36 (Precautions against fumes) & Section 41B (Compulsory disclosure of hazards)',
    },
    {
      id: 'inc-2',
      year: 2021,
      state: 'Maharashtra',
      industryType: 'Chemical Refining Facility',
      hazardType: 'H2S Toxic Asphyxiation',
      fatalities: 3,
      description: 'Three maintenance workers collapsed and died inside a reaction vessel. The contractor sent them inside without checking gas levels or providing safety harness lines.',
      factoriesActSection: 'Section 36A (Prohibition of entry in confined space without gas-free cert)',
    },
    {
      id: 'inc-3',
      year: 2022,
      state: 'Gujarat',
      industryType: 'Chemical Dyestuff Plant',
      hazardType: 'Boiler Reactor Blast',
      fatalities: 6,
      description: 'A pressurized boiler reactor vessel blasted due to malfunctioning pressure gauges. Workers had previously warned managers of warning lights but no action was taken.',
      factoriesActSection: 'Section 31 (Pressure plant compliance) & Section 41 (Right to warn)',
    },
    {
      id: 'inc-4',
      year: 2023,
      state: 'Chhattisgarh',
      industryType: 'Steel Smelting Plant',
      hazardType: 'Liquid Metal Splash / Thermal Heat Wave',
      fatalities: 4,
      description: 'Workers suffered 80% fatal third-degree burns when pressurized molten iron splashed. Cooling ventilation systems were non-functional, and workers lacked aluminized thermal suits.',
      factoriesActSection: 'Section 13 (Ventilation/Temp) & Section 35 (PPE eyeball/body cover)',
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-natural-border p-6 flex flex-col h-[550px]" id="factories-act-root">
      <div>
        <h2 className="text-xl font-bold text-natural-dark tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-natural-olive" />
          Compliance & Historical Database
        </h2>
        <p className="text-sm text-[#8A8471]">Legal reference manual and incident archives for safety audits</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-natural-border mt-4">
        <button
          onClick={() => setActiveTab('act')}
          className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
            activeTab === 'act'
              ? 'border-natural-olive text-natural-olive'
              : 'border-transparent text-[#8A8471] hover:text-natural-dark'
          }`}
          id="tab-act"
        >
          Factories Act 1948
        </button>
        <button
          onClick={() => setActiveTab('gases')}
          className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
            activeTab === 'gases'
              ? 'border-natural-olive text-natural-olive'
              : 'border-transparent text-[#8A8471] hover:text-natural-dark'
          }`}
          id="tab-gases"
        >
          OSHA Gas Limits
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
            activeTab === 'records'
              ? 'border-natural-olive text-natural-olive'
              : 'border-transparent text-[#8A8471] hover:text-natural-dark'
          }`}
          id="tab-records"
        >
          Indian Incident Records
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-3 shadow-inner" id="tab-content-container">
        {activeTab === 'act' && (
          <div className="space-y-3">
            <div className="p-3 bg-natural-bg rounded-xl text-xs text-natural-dark font-medium border border-natural-border">
              🇮🇳 The <strong>Factories Act 1948</strong> is a social welfare legislation formulated by the Government of India to regulate safety, health, and working environment. Safety laws are robust, but local enforcement is often neglected.
            </div>
            {actSections.map((act, idx) => (
              <div key={idx} className="border border-natural-border rounded-2xl p-4 bg-[#FDFCFB]">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-black text-natural-olive font-mono bg-natural-beige/30 px-2 py-0.5 rounded border border-natural-border">
                    {act.sec}
                  </span>
                  <span className="text-xs font-black text-natural-text">{act.title}</span>
                </div>
                <p className="text-xs text-[#8A8471] mt-1.5 leading-relaxed font-medium">{act.desc}</p>
                <div className="mt-2.5 bg-white border border-natural-border p-2.5 rounded-xl">
                  <div className="text-[9px] font-bold text-natural-olive uppercase tracking-wider">
                    Practical Compliance Checklist (Suraksha Rule)
                  </div>
                  <p className="text-xs text-natural-text font-bold mt-0.5 leading-snug">
                    {act.compliance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'gases' && (
          <div className="space-y-4">
            {gasLimits.map((gas, idx) => (
              <div key={idx} className="border border-natural-border rounded-2xl p-4 bg-[#FDFCFB]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-8 h-8 rounded-full bg-natural-dark text-white flex items-center justify-center font-bold text-xs">
                    {gas.formula}
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-natural-text">{gas.gas}</h4>
                    <p className="text-[10px] text-[#8A8471] font-mono font-medium">Source: {gas.source}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-white border border-natural-border p-2 rounded-xl">
                    <div className="text-[8px] font-bold text-[#8A8471] uppercase">OSHA PEL</div>
                    <div className="text-xs font-black text-natural-dark mt-0.5 font-mono">{gas.oshaPel}</div>
                  </div>
                  <div className="bg-[#A68A64]/5 border border-[#A68A64]/30 p-2 rounded-xl">
                    <div className="text-[8px] font-bold text-natural-sand uppercase">Warning Limit</div>
                    <div className="text-xs font-black text-natural-sand mt-0.5 font-mono">{gas.warning}</div>
                  </div>
                  <div className="bg-natural-rose/5 border border-natural-rose/30 p-2 rounded-xl">
                    <div className="text-[8px] font-bold text-natural-rose uppercase">Critical Limit</div>
                    <div className="text-xs font-black text-natural-rose mt-0.5 font-mono">{gas.critical}</div>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-white rounded-xl border border-natural-border">
                  <div className="text-[9px] font-bold text-natural-rose uppercase flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-natural-rose" />
                    Medical Effects of Exposure
                  </div>
                  <p className="text-xs text-natural-text mt-0.5 leading-snug font-medium">
                    {gas.effects}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'records' && (
          <div className="space-y-3">
            <div className="p-3 bg-natural-rose/5 rounded-xl border border-natural-rose/20 flex gap-2 items-start text-xs text-natural-dark font-medium">
              <Skull className="w-5 h-5 text-natural-rose shrink-0 mt-0.5 animate-pulse" />
              <div>
                <strong>Indian Worker Casualty Records:</strong> Historical data is vital for training AI to identify patterns and predictive alerts. Many small factories use unregistered contractors to bypass safety rules. This app exposes compliance gaps!
              </div>
            </div>

            {IndianIncidents.map((inc) => (
              <div key={inc.id} className="border border-natural-border rounded-2xl p-4 bg-[#FDFCFB] relative overflow-hidden">
                <div className="absolute right-3 top-3 bg-natural-rose/10 text-natural-rose text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-natural-rose/20">
                  <Skull className="w-3 h-3 text-natural-rose" />
                  {inc.fatalities} Fatalities
                </div>

                <div className="flex gap-2 items-baseline">
                  <span className="text-xs font-black text-natural-dark">{inc.hazardType}</span>
                  <span className="text-[10px] text-[#8A8471] font-mono">({inc.year}, {inc.state})</span>
                </div>
                
                <p className="text-[11px] text-[#8A8471] font-mono mt-1 font-bold uppercase">
                  Industry: {inc.industryType}
                </p>

                <p className="text-xs text-natural-text mt-2 leading-relaxed bg-white p-2.5 rounded-xl border border-natural-border">
                  {inc.description}
                </p>

                <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px] font-bold text-natural-olive bg-natural-beige/30 p-2 rounded-xl border border-natural-border">
                  <FileText className="w-3.5 h-3.5 text-natural-olive" />
                  Legal Violation: {inc.factoriesActSection}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
