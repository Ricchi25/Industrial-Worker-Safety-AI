import React, { useState, useEffect } from 'react';
import { Wind, Compass, MapPin, AlertTriangle, ShieldCheck, FileWarning, HelpCircle } from 'lucide-react';
import { EnvironmentalState } from '../types';

interface PlumeSimulatorProps {
  sensors: EnvironmentalState;
}

interface NearMissReport {
  id: string;
  timestamp: string;
  gasType: string;
  description: string;
  location: string;
}

export default function PlumeSimulator({ sensors }: PlumeSimulatorProps) {
  // Wind Direction: 0 = North, 90 = East, 180 = South, 270 = West
  const [windAngle, setWindAngle] = useState<number>(45);
  const [reports, setReports] = useState<NearMissReport[]>([
    {
      id: "REP-01",
      timestamp: "13-Jul-2026 11:20 AM",
      gasType: "Hydrogen Sulfide (H₂S)",
      description: "Slight sulfur smell noticed near the chemical acid neutralization pit. No PPE warning tags installed.",
      location: "Acid Storage Area"
    }
  ]);
  const [newReport, setNewReport] = useState({
    gasType: "Hydrogen Sulfide (H₂S)",
    description: "",
    location: ""
  });

  // Calculate highest toxicity status across gases
  const highestGasStatus = 
    sensors.h2s.status === 'CRITICAL' || sensors.co.status === 'CRITICAL' || sensors.methane.status === 'CRITICAL'
      ? 'CRITICAL'
      : sensors.h2s.status === 'WARNING' || sensors.co.status === 'WARNING' || sensors.methane.status === 'WARNING'
      ? 'WARNING'
      : 'NORMAL';

  // Interactive Wind rotation handler
  const rotateWind = () => {
    setWindAngle(prev => (prev + 90) % 360);
  };

  // Convert wind angle to direction string
  const getWindDirectionStr = (angle: number) => {
    if (angle === 0) return "North (Blowing South)";
    if (angle === 90) return "East (Blowing West)";
    if (angle === 180) return "South (Blowing North)";
    return "West (Blowing East)";
  };

  // Grid sizes: 7 x 7
  const gridSize = 7;
  const sourceRow = 4; // Center row
  const sourceCol = 3; // Center-left

  // Assembly Gate locations on grid
  // Gate 1 (Top Left) -> row 0, col 0
  // Gate 2 (Top Right) -> row 0, col 6
  const gate1 = { row: 1, col: 1, name: "Assembly Gate 1 (Top-Left)" };
  const gate2 = { row: 1, col: 5, name: "Assembly Gate 2 (Top-Right)" };

  // Determine if a cell is in the plume pathway based on wind angle
  const isCellInPlume = (row: number, col: number) => {
    if (row === sourceRow && col === sourceCol) return true;

    const rowDiff = row - sourceRow;
    const colDiff = col - sourceCol;

    if (windAngle === 0) { // Blowing South (y increased)
      return rowDiff > 0 && Math.abs(colDiff) <= Math.abs(rowDiff);
    }
    if (windAngle === 90) { // Blowing West (x decreased)
      return colDiff < 0 && Math.abs(rowDiff) <= Math.abs(colDiff);
    }
    if (windAngle === 180) { // Blowing North (y decreased)
      return rowDiff < 0 && Math.abs(colDiff) <= Math.abs(rowDiff);
    }
    // Blowing East (x increased)
    return colDiff > 0 && Math.abs(rowDiff) <= Math.abs(colDiff);
  };

  const gate1InPlume = isCellInPlume(gate1.row, gate1.col);
  const gate2InPlume = isCellInPlume(gate2.row, gate2.col);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.description.trim() || !newReport.location.trim()) return;

    const now = new Date();
    const timestampStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newRec: NearMissReport = {
      id: `REP-${Math.floor(10 + Math.random() * 90)}`,
      timestamp: timestampStr,
      gasType: newReport.gasType,
      description: newReport.description,
      location: newReport.location
    };

    setReports(prev => [newRec, ...prev]);
    setNewReport({
      gasType: "Hydrogen Sulfide (H₂S)",
      description: "",
      location: ""
    });
  };

  return (
    <div className="p-6 flex flex-col h-full overflow-y-auto space-y-6" id="plume-simulator-root">
      {/* Header and Info */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-natural-olive uppercase tracking-wider flex items-center gap-1">
          <Compass className="w-4 h-4 text-natural-olive animate-spin" style={{ animationDuration: '6s' }} />
          Interactive Plume dispersion and safety lines
        </span>
        <h3 className="text-sm font-black text-natural-dark uppercase">
          Dynamic Gas Smoke Drift (Ventilation Flow)
        </h3>
        <p className="text-[11px] text-[#8A8471] leading-relaxed font-semibold">
          Adjust the wind dial to see how toxic leak plumes propagate. Under Factories Act Sec 38, always evacuate <strong>crosswind</strong> to avoid gas drift!
        </p>
      </div>

      {/* Simulator Board */}
      <div className="border border-natural-border bg-[#FDFCFB] p-4 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Plume visual grid (col-span-7) */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className="grid grid-cols-7 gap-1.5 w-full max-w-[280px]">
            {Array.from({ length: gridSize }).map((_, rIdx) => (
              <React.Fragment key={rIdx}>
                {Array.from({ length: gridSize }).map((_, cIdx) => {
                  const isSource = rIdx === sourceRow && cIdx === sourceCol;
                  const isGate1 = rIdx === gate1.row && cIdx === gate1.col;
                  const isGate2 = rIdx === gate2.row && cIdx === gate2.col;
                  const inPlume = isCellInPlume(rIdx, cIdx);

                  let cellColor = "bg-natural-bg/30 border-natural-border/30";
                  let content = null;

                  if (isSource) {
                    cellColor = "bg-natural-dark text-white border-natural-dark animate-pulse";
                    content = <div className="text-[8px] font-extrabold text-center leading-none">LEAK</div>;
                  } else if (isGate1) {
                    cellColor = gate1InPlume && highestGasStatus !== 'NORMAL'
                      ? "bg-natural-rose/20 text-natural-rose border-natural-rose animate-bounce"
                      : "bg-natural-olive/25 text-natural-olive border-natural-olive";
                    content = <div className="text-[8px] font-black">G1</div>;
                  } else if (isGate2) {
                    cellColor = gate2InPlume && highestGasStatus !== 'NORMAL'
                      ? "bg-natural-rose/20 text-natural-rose border-natural-rose animate-bounce"
                      : "bg-natural-olive/25 text-natural-olive border-natural-olive";
                    content = <div className="text-[8px] font-black">G2</div>;
                  } else if (inPlume) {
                    if (highestGasStatus === 'CRITICAL') {
                      cellColor = "bg-natural-rose/20 border-natural-rose/40 animate-pulse";
                    } else if (highestGasStatus === 'WARNING') {
                      cellColor = "bg-natural-sand/20 border-natural-sand/40";
                    } else {
                      cellColor = "bg-natural-olive/5 border-natural-border/20";
                    }
                    content = <div className="w-1.5 h-1.5 rounded-full bg-natural-sand/60 animate-ping"></div>;
                  }

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`aspect-square rounded-lg border flex items-center justify-center relative ${cellColor}`}
                    >
                      {content}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div className="flex justify-between items-center w-full max-w-[280px] mt-3 text-[10px] text-[#8A8471] font-mono">
            <span>G1: Assembly Gate 1</span>
            <span>G2: Assembly Gate 2</span>
          </div>
        </div>

        {/* Controls & evacuation checks (col-span-5) */}
        <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Wind Angle Dial Button */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-[#8A8471] uppercase tracking-wider block">
                Wind Flow Controller
              </label>
              <button
                onClick={rotateWind}
                className="w-full bg-natural-olive text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-natural-olive/90 transition-all border border-natural-border"
                id="btn-rotate-wind"
              >
                <Wind className="w-4 h-4 animate-pulse" />
                Change Wind: {getWindDirectionStr(windAngle)}
              </button>
            </div>

            {/* Safety Evaluator Alerts */}
            <div className="space-y-2 text-xs">
              <div className={`p-3 rounded-2xl border ${
                gate1InPlume && highestGasStatus !== 'NORMAL'
                  ? 'border-natural-rose bg-natural-rose/5 text-natural-rose'
                  : 'border-natural-border bg-natural-olive/5 text-natural-olive'
              }`} id="gate1-status-box">
                <div className="font-extrabold flex items-center gap-1 text-[11px]">
                  {gate1InPlume && highestGasStatus !== 'NORMAL' ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-natural-rose" />
                      Gate 1 is DANGEROUS!
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-natural-olive" />
                      Gate 1 is SAFE for evacuation
                    </>
                  )}
                </div>
                <p className="text-[10px] text-natural-text mt-1 leading-snug font-medium">
                  {gate1InPlume && highestGasStatus !== 'NORMAL'
                    ? "Gas drift covers the pathway. Do not exit via the North-West zone."
                    : "Upwind pathway is clear of toxic particle drifting lines."}
                </p>
              </div>

              <div className={`p-3 rounded-2xl border ${
                gate2InPlume && highestGasStatus !== 'NORMAL'
                  ? 'border-natural-rose bg-natural-rose/5 text-natural-rose'
                  : 'border-natural-border bg-natural-olive/5 text-natural-olive'
              }`} id="gate2-status-box">
                <div className="font-extrabold flex items-center gap-1 text-[11px]">
                  {gate2InPlume && highestGasStatus !== 'NORMAL' ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-natural-rose" />
                      Gate 2 is DANGEROUS!
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-natural-olive" />
                      Gate 2 is SAFE for evacuation
                    </>
                  )}
                </div>
                <p className="text-[10px] text-natural-text mt-1 leading-snug font-medium">
                  {gate2InPlume && highestGasStatus !== 'NORMAL'
                    ? "Gas drift covers the pathway. Avoid exit via the North-East zone."
                    : "Upwind pathway is clear of toxic particle drifting lines."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Near Miss Incident Reporter Log Form */}
      <div className="border border-natural-border bg-[#FDFCFB] p-4 rounded-3xl space-y-4" id="near-miss-reporter-section">
        <div className="flex items-center gap-2">
          <FileWarning className="w-5 h-5 text-natural-olive" />
          <h4 className="text-xs font-black text-natural-dark uppercase tracking-wide">
            Section 41-H Legal Complaint Log (Hazards & Near-Misses)
          </h4>
        </div>

        <form onSubmit={handleReportSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="form-near-miss">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#8A8471] uppercase">Hazardous Area / Location</label>
            <input
              type="text"
              value={newReport.location}
              onChange={e => setNewReport(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. Boiler Block A, Sewer Pit"
              className="w-full bg-natural-bg/30 border border-natural-border rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-natural-olive font-medium"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#8A8471] uppercase">Category</label>
            <select
              value={newReport.gasType}
              onChange={e => setNewReport(prev => ({ ...prev, gasType: e.target.value }))}
              className="w-full bg-[#FDFCFB] border border-natural-border rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-natural-olive font-bold cursor-pointer"
            >
              <option>Hydrogen Sulfide (H₂S) Leak</option>
              <option>Methane (CH₄) Flammability Risk</option>
              <option>Carbon Monoxide (CO) Suffocation</option>
              <option>Thermal Stress / Excessive Heat</option>
              <option>Noisy Boiler / Sec 34 Hearing Risk</option>
            </select>
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-[10px] font-bold text-[#8A8471] uppercase">Describe Near-Miss / Hazard Warning</label>
            <textarea
              value={newReport.description}
              onChange={e => setNewReport(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Apne lakshan ya gas leak safety rules violation likhein..."
              rows={2}
              className="w-full bg-natural-bg/30 border border-natural-border rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-natural-olive font-medium"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="sm:col-span-2 bg-natural-olive hover:bg-natural-olive/90 text-white font-black py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border border-natural-border"
          >
            File Section 41-H Safety Record Complaint
          </button>
        </form>

        {/* Existing reports list */}
        <div className="space-y-2 mt-2">
          <label className="text-[10px] font-extrabold text-[#8A8471] uppercase tracking-wider block">
            Logged Safety Complaints ({reports.length})
          </label>
          <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1">
            {reports.map(rep => (
              <div key={rep.id} className="p-3 bg-white border border-natural-border rounded-2xl text-xs font-medium space-y-1 relative" id={`report-item-${rep.id}`}>
                <span className="absolute top-3 right-3 text-[9px] font-mono text-natural-olive bg-natural-olive/5 px-2 py-0.5 rounded-full border border-natural-olive/20 font-bold">
                  {rep.id}
                </span>
                <div className="text-[10px] font-black text-natural-dark uppercase">
                  {rep.gasType} - <span className="text-natural-sand">{rep.location}</span>
                </div>
                <p className="text-[#8A8471] text-[11px] leading-relaxed font-bold">{rep.description}</p>
                <div className="text-[9px] text-[#8A8471] font-mono font-medium">Logged: {rep.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
