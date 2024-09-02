import { useState, useEffect, useCallback, useMemo } from "react";

export const useSpeechSynthesis = () => {
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis);
      // Firefox requires a user interaction before allowing speech
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
      setIsReady(true);
    } else {
      setIsSpeechSupported(false);
    }
  }, []);

  const voices = useMemo(() => {
    if (speechSynthesis) {
      return speechSynthesis.getVoices();
    }
    return [];
  }, [speechSynthesis]);

  const playSound = useCallback(
    (character: string) => {
      if (!speechSynthesis || !isReady) return;

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(character);

      // Set a short, fast voice if available
      let shortVoice = voices.find((voice) => voice.name.includes("Whisper"));
      if (!shortVoice) {
        //shortVoice = voices.find((voice) => voice.name.includes("Zarvox"));
      }
      if (shortVoice) {
        utterance.voice = shortVoice;
      }

      // Optimize utterance settings for lower latency
      //utterance.rate = 1.5; // Slightly faster rate
      // utterance.pitch = 1.2; // Slightly higher pitch
      // utterance.volume = 0.8; // Slightly lower volume

      utterance.onend = () => {
        speechSynthesis.cancel();
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
      };

      // Use setTimeout to avoid potential blocking
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 0);
    },
    [speechSynthesis, isReady, voices]
  );

  return { playSound, isSpeechSupported, isReady };
};
