import { useEffect, useState } from "react";
import { fetchProjects } from "../../../utils/projectUtils";
import ProjectCard from "./ProjectCard";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0);

  const cardsPerPageDesktop = 3;
  const cardsPerPageMobile = 1;

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const cardsPerPage = isMobile ? cardsPerPageMobile : cardsPerPageDesktop;
  const totalPages = Math.ceil(projects.length / cardsPerPage);

  const onPrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage((prev) => prev - 1);
    }
  };

  const onNext = () => {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage((prev) => prev + 1);
    }
  };

  if (loading)
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <svg
          className="animate-spin h-9 w-9 text-teal-400 opacity-90"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-30" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4" />
          <path className="opacity-80" fill="currentColor"
                d="M4 12a8 8 0 018-8v5a3 3 0 00-3 3H4z" />
        </svg>
        <span className="ml-3 text-teal-300 text-xl font-semibold animate-pulse">
          Loading projects...
        </span>
      </div>
    );

  if (projects.length === 0)
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-8 text-center text-gray-400 text-lg">
        No projects found.
      </div>
    );

  const displayedProjects = projects.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 80 : -80
    }),
    center: {
      opacity: 1,
      x: 0
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -80 : 80
    })
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center pt-38 px-4 max-sm:px-10">
      <div
        style={{ minHeight: "450px" }}
        className={`
          flex max-w-full hide-scrollbar
          ${isMobile ? "flex-col items-center w-full gap-6" : "gap-8 justify-center items-start"}
          max-sm:items-center max-sm:justify-start max-sm:w-full max-sm:overflow-hidden
        `}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {displayedProjects.map((proj) => (
            <motion.div
              key={proj.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-sm:w-full max-sm:max-w-sm"
              style={{ flexShrink: 0 }}
            >
              <ProjectCard project={proj} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center gap-6 max-sm:gap-4 max-sm:flex-wrap max-sm:justify-center">
        <motion.button
          onClick={onPrev}
          disabled={page === 0}
          className={`rounded-full p-3 bg-teal-700/20 hover:bg-teal-400/80 transition ${page === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Previous page"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowCircleLeft className="text-teal-300" size={24} />
        </motion.button>
        <div className="flex items-center gap-6 select-none max-sm:gap-3">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <motion.div
              key={idx}
              onClick={() => {
                setDirection(idx > page ? 1 : -1);
                setPage(idx);
              }}
              className={`w-3 h-3 rounded-full cursor-pointer ${idx === page ? "bg-teal-400" : "bg-teal-700/50"}`}
              whileHover={{ scale: 1.4 }}
              layout
            />
          ))}
        </div>
        <motion.button
          onClick={onNext}
          disabled={page === totalPages - 1}
          className={`rounded-full p-3 bg-teal-700/20 hover:bg-teal-400/80 transition ${page === totalPages - 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Next page"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowCircleRight className="text-teal-300" size={24} />
        </motion.button>
      </div>
    </div>
  );
}
