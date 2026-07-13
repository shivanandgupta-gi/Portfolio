import { useState, useEffect, useRef } from 'react';

const roles = [
  'Software Engineer',
  'Full Stack Developer',
  'Problem Solver',
  'React Developer',
  'Java Developer',
  'Backend Engineer',
];

export function useTypingEffect() {
  const [text, setText] = useState('');
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeoutId;

    function typeLoop() {
      const word = roles[roleIdx.current];

      if (deleting.current) {
        charIdx.current--;
        setText(word.substring(0, charIdx.current));
      } else {
        charIdx.current++;
        setText(word.substring(0, charIdx.current));
      }

      let speed = deleting.current ? 35 : 70;

      if (!deleting.current && charIdx.current === word.length) {
        speed = 2200;
        deleting.current = true;
      } else if (deleting.current && charIdx.current === 0) {
        deleting.current = false;
        roleIdx.current = (roleIdx.current + 1) % roles.length;
        speed = 500;
      }

      timeoutId = setTimeout(typeLoop, speed);
    }

    typeLoop();
    return () => clearTimeout(timeoutId);
  }, []);

  return text;
}
