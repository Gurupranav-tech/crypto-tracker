import { IoMdMoon } from "react-icons/io";
import { useTheme } from "../contexts/ThemeContext";
import { FaSun } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="w-full relative flex items-center justify-center mt-3">
      <h1 className="text-4xl font-bold bg-gradient-to-l from-[#ffcf67] to-[#d3321d] bg-clip-text text-transparent">
        Crypto Tracker
      </h1>
      <ThemeSwitcher />
    </header>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute left-full top-1/2 -translate-y-2/4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-2xl cursor-pointer border dark:text-gray-100 dark:border-gray-100 border-gray-800 rounded-lg text-gray-800 p-1"
        onClick={toggleTheme}
      >
        {theme === "light" ? <IoMdMoon /> : <FaSun />}
      </motion.button>
    </div>
  );
}
