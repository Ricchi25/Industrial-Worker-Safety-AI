import React, { useState, useEffect, useRef } from 'react';
import { AlertOctagon, PhoneCall, Radio, HelpCircle, MapPin, ShieldAlert, VolumeX, Volume2 } from 'lucide-react';

interface EmergencyButtonProps {
  isTriggered: boolean;
  setIsTriggered: (val: boolean) => void;
}

export default function EmergencyButton({
  isTriggered,
  setIsTriggered,
}: EmergencyButtonProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef1 = useRef<OscillatorNode | null>(null);
  const oscRef2 = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sirenIntervalRef = useRef<number | null>(null);

  // Stop/Start Alarm Audio using Web Audio API
  useEffect(() => {
    if (isTriggered && soundEnabled) {
      startSiren();
    } else {
      stopSiren();
    }

    return () => {
      stopSiren();
    };
  }, [isTriggered, soundEnabled]);

  const startSiren = () => {
    try {
      // Ensure we clean up any previous oscillators
      stopSiren();

      // Create Audio Context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Master Gain
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime); // Low volume so as not to startle
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      // Create two oscillators for a thick industrial buzz
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      osc1.type = 'sawtooth';
      osc2.type = 'square';

      osc1.connect(gainNode);
      osc2.connect(gainNode);

      osc1.start();
      osc2.start();

      oscRef1.current = osc1;
      oscRef2.current = osc2;

      // Alternate frequency (Siren oscillation effect)
      let high = true;
      sirenIntervalRef.current = window.setInterval(() => {
        if (!ctx || ctx.state === 'closed') return;
        const targetFreq1 = high ? 450 : 350;
        const targetFreq2 = high ? 454 : 354;
        
        osc1.frequency.exponentialRampToValueAtTime(targetFreq1, ctx.currentTime + 0.15);
        osc2.frequency.exponentialRampToValueAtTime(targetFreq2, ctx.currentTime + 0.15);
        high = !high;
      }, 350);

    } catch (err) {
      console.error('Audio synthesizer error:', err);
    }
  };

  const stopSiren = () => {
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    
    try {
      if (oscRef1.current) {
        oscRef1.current.stop();
        oscRef1.current.disconnect();
        oscRef1.current = null;
      }
      if (oscRef2.current) {
        oscRef2.current.stop();
        oscRef2.current.disconnect();
        oscRef2.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
      if (audioContextRef.current) {
        if (audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
        audioContextRef.current = null;
      }
    } catch (err) {
      console.warn('Sound clean up warning:', err);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-natural-border p-6 flex flex-col h-full" id="emergency-button-root">
      <div>
        <h2 className="text-xl font-bold text-natural-dark tracking-tight flex items-center gap-2">
          <ShieldAlert className="text-natural-rose w-5 h-5 animate-pulse" />
          Emergency Command Console
        </h2>
        <p className="text-sm text-[#8A8471]">Instant evacuation signaling and safety coordination</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-6">
        {!isTriggered ? (
          // Inactive / Trigger Button
          <div className="text-center flex flex-col items-center">
            <button
              onClick={() => setIsTriggered(true)}
              className="w-40 h-40 rounded-full bg-natural-rose hover:bg-[#D74F67] text-white font-black text-sm tracking-widest flex flex-col items-center justify-center gap-2 border-8 border-natural-rose/20 hover:border-natural-rose/30 shadow-md cursor-pointer transition-all active:scale-95 animate-pulse"
              id="main-emergency-red-btn"
            >
              <AlertOctagon className="w-10 h-10 text-white animate-bounce" />
              <span>PUSH TO</span>
              <span>ALERT</span>
            </button>
            <p className="text-xs font-bold text-[#8A8471] max-w-xs mt-4">
              Pressing this triggers a dual-tone local siren, alerts supervisors, and starts gas purging ventilation.
            </p>
          </div>
        ) : (
          // Active Strobe State
          <div className="w-full text-center flex flex-col items-center bg-natural-rose/5 p-4 rounded-2xl border border-natural-rose/30 relative overflow-hidden">
            {/* Visual Red Flash indicator */}
            <div className="absolute inset-0 bg-natural-rose/10 animate-ping pointer-events-none"></div>

            <div className="flex justify-end w-full mb-2">
              <button
                onClick={toggleSound}
                className="p-1.5 rounded-lg bg-white border border-natural-border hover:bg-natural-bg text-natural-text cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                id="toggle-alarm-sound"
              >
                {soundEnabled ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-natural-rose" />
                    Mute Siren
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-natural-olive" />
                    Unmute Siren
                  </>
                )}
              </button>
            </div>

            <div className="w-16 h-16 rounded-full bg-natural-rose/10 flex items-center justify-center border-4 border-natural-rose animate-bounce mb-3">
              <AlertOctagon className="w-8 h-8 text-natural-rose" />
            </div>

            <h3 className="text-lg font-black text-natural-rose tracking-tight animate-pulse">
              !! EMERGENCY ALERT SYSTEM ACTIVE !!
            </h3>
            <p className="text-xs font-black text-natural-dark mt-1 max-w-sm leading-tight">
              Siren sound is active. Indian safety compliance rules require immediate physical action.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full mt-4 text-left">
              <div className="bg-white border border-natural-border p-3 rounded-xl">
                <div className="text-[10px] font-bold text-[#8A8471] uppercase tracking-wider flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 text-natural-rose" />
                  Supervisor Radio Broadcast
                </div>
                <div className="text-xs font-bold text-natural-dark mt-1">Alerting Emergency Services</div>
                <div className="text-[10px] text-[#8A8471] mt-0.5">Siren level: 105 dB (High Purge Fan Active)</div>
              </div>

              <div className="bg-white border border-natural-border p-3 rounded-xl">
                <div className="text-[10px] font-bold text-[#8A8471] uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-natural-olive" />
                  Mock GPS Coordinates
                </div>
                <div className="text-xs font-bold text-natural-dark mt-1">19.0222° N, 72.8561° E</div>
                <div className="text-[10px] text-[#8A8471] mt-0.5 font-medium">VJTI Industrial Estate, Mumbai</div>
              </div>
            </div>

            {/* Indian legal evacuation guide */}
            <div className="mt-4 p-3 bg-natural-rose/10 rounded-2xl text-left border border-natural-rose/20">
              <div className="text-xs font-extrabold text-natural-rose flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-natural-rose" />
                Factories Act 1948 - Section 40 Evacuation Protocol
              </div>
              <ul className="text-[10.5px] text-natural-dark font-medium space-y-1 mt-1.5 list-disc pl-4 leading-relaxed">
                <li><strong>Assembly Area:</strong> Walk immediately to the open-air assembly field near Main Gate 2.</li>
                <li><strong>Do NOT use lift:</strong> Use only emergency fire exit stairs (Factories Act Sec 38).</li>
                <li><strong>Wind direction:</strong> Observe the orange windsock. Walk crosswind to avoid gas cloud leaks.</li>
                <li><strong>First-aid Box:</strong> Safety Wardens are deploying oxygen kits near the assembly zone.</li>
              </ul>
            </div>

            <button
              onClick={() => setIsTriggered(false)}
              className="mt-4 w-full bg-natural-dark hover:bg-natural-dark/90 text-white font-black py-2.5 px-3 rounded-xl text-xs cursor-pointer transition-colors"
              id="reset-alarm-btn"
            >
              Reset Siren / Clear Emergency Alarm
            </button>
          </div>
        )}
      </div>

      {/* Speed Dial Contacts */}
      <div className="border-t border-natural-border pt-4 mt-2">
        <label className="text-[10px] font-extrabold text-[#8A8471] uppercase tracking-wider block mb-2">
          Emergency Speed Dial Contacts (Industrial Compliance)
        </label>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-[#3D3A33]">
          <a
            href="tel:101"
            className="flex items-center gap-2 p-2 rounded-xl bg-natural-bg/30 border border-natural-border hover:bg-natural-bg hover:border-natural-border transition-all text-natural-text"
          >
            <PhoneCall className="w-3.5 h-3.5 text-natural-rose shrink-0" />
            Fire Station: 101
          </a>
          <a
            href="tel:108"
            className="flex items-center gap-2 p-2 rounded-xl bg-natural-bg/30 border border-natural-border hover:bg-natural-bg hover:border-natural-border transition-all text-natural-text"
          >
            <PhoneCall className="w-3.5 h-3.5 text-natural-olive shrink-0" />
            Ambulance: 108
          </a>
        </div>
      </div>
    </div>
  );
}
