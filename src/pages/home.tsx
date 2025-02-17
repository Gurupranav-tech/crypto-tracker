import { useState } from "react";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import Crypto from "../components/Crypto";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <>
      <SearchBar search={search} setSearch={(s) => setSearch(s)} />
      <Filters />
      <Crypto search={search} />
    </>
  );
}
