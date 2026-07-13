import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    function onScroll() {
      let currentId = '';
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 120;
          if (window.scrollY >= top) currentId = id;
        }
      });
      setActiveId(currentId);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds]);

  return activeId;
}
