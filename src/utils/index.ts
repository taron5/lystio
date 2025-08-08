import { useState, useEffect } from 'react';

const useMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}
const cleanDistrictName = (input: string): string => {
  return input.replace(/^\d+\.\s*-\s*/, "").trim();
};
export { useMobile, cleanDistrictName };