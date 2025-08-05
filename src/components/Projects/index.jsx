import { useEffect, useState } from "react";
import { fetchProjects } from "../../../utils/projectUtils";
import ProjectCard from "./ProjectCard";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const fadeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const cardsPerPage = 3;

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const totalPages = Math.ceil(projects.length / cardsPerPage);

  const onPrev = () => setPage((prev) => (prev > 0 ? prev - 1 : prev));
  const onNext = () => setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  if (loading)
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <svg
          className="animate-spin h-9 w-9 text-teal-400 opacity-90"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-30"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v5a3 3 0 00-3 3H4z"
          />
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

  const displayedProjects = projects.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center pt-32">
      <div className="flex gap-8 p-8 max-w-full hide-scrollbar" style={{ minHeight: '450px' }}>
        {displayedProjects.map((proj, index) => (
          <AnimatePresence mode="wait" key={proj.id}>
            <motion.div
              key={proj.id}
              variants={fadeTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={fadeTransition.transition}
              style={{ minWidth: '290px', maxWidth: '320px' }}
            >
              <ProjectCard project={proj} />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-6">
        <motion.button
          onClick={onPrev}
          disabled={page === 0}
          className={`rounded-full p-3 bg-teal-700/20 hover:bg-teal-400/80 transition ${
            page === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Previous page"
          whileHover={{ scale: 1.2, backgroundColor: "rgba(20,184,166,0.6)" }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowCircleLeft className="text-teal-300" size={24} />
        </motion.button>
        <div className="flex items-center gap-6 select-none">
            {Array.from({ length: totalPages }).map((_, idx) => (
                <motion.div
                key={idx}
                onClick={() => setPage(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                    idx === page ? "bg-teal-400" : "bg-teal-700/50"
                }`}
                whileHover={{ scale: 1.4 }}
                layout
                />
            ))}
            </div>
        <motion.button
          onClick={onNext}
          disabled={page === totalPages - 1}
          className={`rounded-full p-3 bg-teal-700/20 hover:bg-teal-400/80 transition ${
            page === totalPages - 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Next page"
          whileHover={{ scale: 1.2, backgroundColor: "rgba(20,184,166,0.6)" }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowCircleRight className="text-teal-300" size={24} />
        </motion.button>
      </div>
    </div>
  );
}
