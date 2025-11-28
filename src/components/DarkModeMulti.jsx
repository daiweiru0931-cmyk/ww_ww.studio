import { useEffect } from "react";

const DarkModeMulti = ({ targetRef }) => {
  useEffect(() => {
    const handleScroll = () => {
      const section = targetRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const isVisibleEnough =
        rect.top < viewportHeight * 0.3 && rect.bottom > viewportHeight * 0.3;

      if (isVisibleEnough) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  return null;
};

export default DarkModeMulti;
