import { useEffect, useState } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  enabled?: boolean;
}

interface UseTypingEffectReturn {
  displayedText: string;
  isTyping: boolean;
}

export function useTypingEffect({ 
  text, 
  speed = 50, 
  enabled = true 
}: UseTypingEffectOptions): UseTypingEffectReturn {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayedText, isTyping };
}

