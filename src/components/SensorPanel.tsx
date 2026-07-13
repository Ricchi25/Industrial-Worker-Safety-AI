import React from 'react';
import { AlertStatus, EnvironmentalState, SensorMetric } from '../types';
import { AlertTriangle, ShieldCheck, Flame, Thermometer, Volume2, Wind } from 'lucide-react';

interface SensorPanelProps {
  sensors: EnvironmentalState;
  setSensors: React.Dispatch<React.SetStateAction<EnvironmentalState>>;
  activePreset: string;
  setActivePreset: (preset: string) => void;
}

export default function SensorPanel({
  sensors,
  setSensors,
  activePreset,
  setActivePreset,
}: SensorPanelProps) {
  
  const presets = [
    {
      id: 'normal',
      name: 'Green Shift (Normal)',
      description: 'Standard safe operating conditions. Environment is well-ventilated.',
      data: {
        co: { value: 12, status: 'NORMAL' as AlertStatus },
        h2s: { value: 1.5, status: 'NORMAL' as AlertStatus },
        methane: { value: 0.1, status: 'NORMAL' as AlertStatus },
        temperature: { value: 24.5, status: 'NORMAL' as AlertStatus },
        noise: { value: 68, status: 'NORMAL' as AlertStatus },
      },
    },
    {
      id: 'coal_mine',
      name: 'Underground Mine (Methane Peak)',
      description: 'High explosion risk due to coalbed gas accumulation (Factories Act Sec 36).',
      data: {
        co: { value: 18, status: 'NORMAL' as AlertStatus },
        h2s: { value: 3.2, status: 'NORMAL' as AlertStatus },
        methane: { value: 2.8, status: 'CRITICAL' as AlertStatus },
        temperature: { value: 31.0, status: 'WARNING' as AlertStatus },
        noise: { value: 82, status: 'WARNING' as AlertStatus },
      },
    },
    {
      id: 'chemical_leak',
      name: 'Chemical Unit (CO & H2S Gas Leak)',
      description: 'Highly toxic environment. Rotten egg smell. Correlates to rapid dizziness.',
      data: {
        co: { value: 65, status: 'WARNING' as AlertStatus },
        h2s: { value: 28.5, status: 'CRITICAL' as AlertStatus },
        methane: { value: 0.4, status: 'NORMAL' as AlertStatus },
        temperature: { value: 29.5, status: 'NORMAL' as AlertStatus },
        noise: { value: 75, status: 'NORMAL' as AlertStatus },
      },
    },
    {
      id: 'furnace_heat',
      name: 'Smelting Furnace (Severe Heat Stress)',
      description: 'Thermal stress exceeds OSHA Wet Bulb limit. High risk of heat stroke.',
      data: {
        co: { value: 32, status: 'WARNING' as AlertStatus },
        h2s: { value: 0.8, status: 'NORMAL' as AlertStatus },
        methane: { value: 0.1, status: 'NORMAL' as AlertStatus },
        temperature: { value: 42.8, status: 'CRITICAL' as AlertStatus },
        noise: { value: 96, status: 'CRITICAL' as AlertStatus },
      },
    },
  ];

  const handlePresetSelect = (presetId: string, presetData: typeof presets[0]['data']) => {
    setActivePreset(presetId);
    setSensors((prev) => {
      const updated = { ...prev };
      
      // Update Carbon Monoxide
      updated.co = {
        ...updated.co,
        value: presetData.co.value,
        status: presetData.co.status,
      };
      
      // Update Hydrogen Sulfide
      updated.h2s = {
        ...updated.h2s,
        value: presetData.h2s.value,
        status: presetData.h2s.status,
      };
      
      // Update Methane
      updated.methane = {
        ...updated.methane,
        value: presetData.methane.value,
        status: presetData.methane.status,
      };
      
      // Update Temperature
      updated.temperature = {
        ...updated.temperature,
        value: presetData.temperature.value,
        status: presetData.temperature.status,
      };
      
      // Update Noise
      updated.noise = {
        ...updated.noise,
        value: presetData.noise.value,
        status: presetData.noise.status,
      };

      return updated;
    });
  };

  const handleSliderChange = (metricKey: keyof EnvironmentalState, value: number) => {
    setActivePreset('custom');
    setSensors((prev) => {
      const updated = { ...prev };
      const metric = updated[metricKey];
      let status: AlertStatus = 'NORMAL';
      
      if (value >= metric.criticalLimit) {
        status = 'CRITICAL';
      } else if (value >= metric.warningLimit) {
        status = 'WARNING';
      }

      updated[metricKey] = {
        ...metric,
        value,
        status,
      };

      return updated;
    });
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-natural-rose/10 text-natural-rose animate-pulse border border-natural-rose/20">
            <span className="w-2 h-2 rounded-full bg-natural-rose animate-ping"></span>
            CRITICAL
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-natural-sand/10 text-natural-sand border border-natural-sand/20">
            <span className="w-2 h-2 rounded-full bg-natural-sand"></span>
            WARNING
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-natural-olive/10 text-natural-olive border border-natural-olive/20">
            <span className="w-2 h-2 rounded-full bg-natural-olive"></span>
            SAFE
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-natural-border p-6 flex flex-col h-full" id="sensor-panel-root">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-natural-dark tracking-tight flex items-center gap-2">
            <Wind className="w-5 h-5 text-natural-olive" />
            Environment Sensor Hub
          </h2>
          <p className="text-sm text-[#8A8471]">Real-time telemetry and air quality monitoring</p>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 bg-natural-bg text-natural-olive rounded-md border border-natural-border">
          OSHA & Factories Act Standards
        </div>
      </div>

      {/* Preset Incident Scenarios */}
      <div className="mb-6">
        <label className="text-xs font-bold text-[#8A8471] uppercase tracking-wider block mb-2">
          Select Environmental Preset (Test Scenarios)
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id, preset.data)}
              className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                activePreset === preset.id
                  ? 'border-natural-olive bg-natural-beige/30 ring-1 ring-natural-olive shadow-xs'
                  : 'border-natural-border hover:border-natural-beige-dark bg-[#FDFCFB] hover:bg-natural-bg'
              }`}
              id={`preset-btn-${preset.id}`}
            >
              <div className="font-bold text-natural-text truncate">{preset.name}</div>
              <div className="text-[10px] text-[#8A8471] mt-1 line-clamp-2 leading-tight">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sensors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 flex-1">
        {/* Carbon Monoxide (CO) */}
        <div className="border border-natural-border rounded-2xl p-4 bg-[#FDFCFB] flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#8A8471] uppercase tracking-wider">
                Carbon Monoxide (CO)
              </span>
              {getStatusBadge(sensors.co.status)}
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-black font-mono tracking-tight text-natural-dark">
                {sensors.co.value.toFixed(0)}
              </span>
              <span className="text-sm text-[#8A8471] font-mono">ppm</span>
            </div>
          </div>
          <div>
            <input
              type="range"
              min="0"
              max="150"
              value={sensors.co.value}
              onChange={(e) => handleSliderChange('co', Number(e.target.value))}
              className="w-full h-1.5 bg-natural-bg rounded-lg appearance-none cursor-pointer accent-natural-olive"
              id="slider-co"
            />
            <div className="flex justify-between text-[10px] text-[#8A8471] mt-1.5 font-mono">
              <span>Warn: &gt;35</span>
              <span>Crit: &gt;100</span>
            </div>
          </div>
        </div>

        {/* Hydrogen Sulfide (H2S) */}
        <div className="border border-natural-border rounded-2xl p-4 bg-[#FDFCFB] flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#8A8471] uppercase tracking-wider">
                Sulfide (H₂S)
              </span>
              {getStatusBadge(sensors.h2s.status)}
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-black font-mono tracking-tight text-natural-dark">
                {sensors.h2s.value.toFixed(1)}
              </span>
              <span className="text-sm text-[#8A8471] font-mono">ppm</span>
            </div>
          </div>
          <div>
            <input
              type="range"
              min="0"
              max="60"
              step="0.5"
              value={sensors.h2s.value}
              onChange={(e) => handleSliderChange('h2s', Number(e.target.value))}
              className="w-full h-1.5 bg-natural-bg rounded-lg appearance-none cursor-pointer accent-natural-olive"
              id="slider-h2s"
            />
            <div className="flex justify-between text-[10px] text-[#8A8471] mt-1.5 font-mono">
              <span>Warn: &gt;10</span>
              <span>Crit: &gt;20</span>
            </div>
          </div>
        </div>

        {/* Methane (CH4) */}
        <div className="border border-natural-border rounded-2xl p-4 bg-[#FDFCFB] flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#8A8471] uppercase tracking-wider">
                Methane (CH₄)
              </span>
              {getStatusBadge(sensors.methane.status)}
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-black font-mono tracking-tight text-natural-dark">
                {sensors.methane.value.toFixed(1)}
              </span>
              <span className="text-sm text-[#8A8471] font-mono">% LEL</span>
            </div>
          </div>
          <div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={sensors.methane.value}
              onChange={(e) => handleSliderChange('methane', Number(e.target.value))}
              className="w-full h-1.5 bg-natural-bg rounded-lg appearance-none cursor-pointer accent-natural-olive"
              id="slider-methane"
            />
            <div className="flex justify-between text-[10px] text-[#8A8471] mt-1.5 font-mono">
              <span>Warn: &gt;1.0</span>
              <span>Crit: &gt;2.5</span>
            </div>
          </div>
        </div>

        {/* Temperature (Thermal Stress) */}
        <div className="border border-natural-border rounded-2xl p-4 bg-[#FDFCFB] flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#8A8471] uppercase tracking-wider flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-natural-sand" />
                Temperature
              </span>
              {getStatusBadge(sensors.temperature.status)}
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-black font-mono tracking-tight text-natural-dark">
                {sensors.temperature.value.toFixed(1)}
              </span>
              <span className="text-sm text-[#8A8471] font-mono">°C</span>
            </div>
          </div>
          <div>
            <input
              type="range"
              min="15"
              max="50"
              step="0.5"
              value={sensors.temperature.value}
              onChange={(e) => handleSliderChange('temperature', Number(e.target.value))}
              className="w-full h-1.5 bg-natural-bg rounded-lg appearance-none cursor-pointer accent-natural-olive"
              id="slider-temp"
            />
            <div className="flex justify-between text-[10px] text-[#8A8471] mt-1.5 font-mono">
              <span>Warn: &gt;35</span>
              <span>Crit: &gt;38</span>
            </div>
          </div>
        </div>

        {/* Noise Level */}
        <div className="border border-natural-border rounded-2xl p-4 bg-[#FDFCFB] flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#8A8471] uppercase tracking-wider flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-natural-olive" />
                Noise Level
              </span>
              {getStatusBadge(sensors.noise.status)}
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-black font-mono tracking-tight text-natural-dark">
                {sensors.noise.value.toFixed(0)}
              </span>
              <span className="text-sm text-[#8A8471] font-mono">dB</span>
            </div>
          </div>
          <div>
            <input
              type="range"
              min="50"
              max="115"
              value={sensors.noise.value}
              onChange={(e) => handleSliderChange('noise', Number(e.target.value))}
              className="w-full h-1.5 bg-natural-bg rounded-lg appearance-none cursor-pointer accent-natural-olive"
              id="slider-noise"
            />
            <div className="flex justify-between text-[10px] text-[#8A8471] mt-1.5 font-mono">
              <span>Warn: &gt;85</span>
              <span>Crit: &gt;95</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Summary Banner */}
      <div className="mt-4 p-3 bg-natural-bg rounded-2xl border border-natural-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Object.values(sensors).some((s) => s.status === 'CRITICAL') ? (
            <div className="w-8 h-8 rounded-full bg-natural-rose/10 text-natural-rose flex items-center justify-center animate-bounce border border-natural-rose/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          ) : Object.values(sensors).some((s) => s.status === 'WARNING') ? (
            <div className="w-8 h-8 rounded-full bg-natural-sand/10 text-natural-sand flex items-center justify-center border border-natural-sand/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-natural-olive/10 text-natural-olive flex items-center justify-center border border-natural-olive/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="text-xs font-bold text-natural-dark uppercase">
              {Object.values(sensors).some((s) => s.status === 'CRITICAL')
                ? 'CRITICAL EXPOSURE DETECTED!'
                : Object.values(sensors).some((s) => s.status === 'WARNING')
                ? 'WARNING: SUB-OPTIMAL ENVIRONMENT LIMITS'
                : 'ENVIRONMENT SAFE AND SECURE'}
            </div>
            <div className="text-[10px] text-[#8A8471] leading-tight font-medium">
              {Object.values(sensors).some((s) => s.status === 'CRITICAL')
                ? 'Immediate gas clearance or evacuation safety drill recommended (Factories Act Sec 36/40).'
                : Object.values(sensors).some((s) => s.status === 'WARNING')
                ? 'Ensure exhaust ventilation is operational. Monitor symptoms.'
                : 'All toxic gases, heat stress, and hearing safety values reside within legal Indian limit lines.'}
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-[10px] text-[#8A8471]">Ventilation System</div>
          <div className={`text-xs font-bold ${Object.values(sensors).some((s) => s.status !== 'NORMAL') ? 'text-natural-olive animate-pulse' : 'text-natural-olive'}`}>
            {Object.values(sensors).some((s) => s.status === 'CRITICAL') ? 'BOOST MAX (100%)' : Object.values(sensors).some((s) => s.status === 'WARNING') ? 'MODERATE (60%)' : 'AUTO (35%)'}
          </div>
        </div>
      </div>
    </div>
  );
}
