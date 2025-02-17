import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import useScreenType from "../hooks/useScreenType";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  search: string;
  setSearch: (s: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  const screen = useScreenType();
  const [isActive, setIsActive] = useState(false);
  const scaleValue = useMemo(
    () => (screen === "mobile" ? 1.1 : 1.05),
    [screen]
  );

  const debounced = useDebouncedCallback((s: string) => setSearch(s));

  return (
    <motion.div
      animate={{ scale: isActive ? scaleValue : 1.0 }}
      className="mt-4 w-min mx-auto flex gap-2 py-2 px-4 rounded-xl dark:bg-gray-700 dark:text-white bg-slate-200 items-center justify-center"
    >
      <input
        type="text"
        className=" outline-none md:w-2xl dark:text-white"
        placeholder="Search Crypto..."
        value={search}
        onChange={(e) => debounced(e.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      <FaSearch />
    </motion.div>
  );
}
