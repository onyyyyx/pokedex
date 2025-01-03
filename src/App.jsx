import { nanoid } from "nanoid";
import Item from "./components/Item";
import Search from "./components/Search";
import { useState } from "react";
import FilterButton from "./components/FilterButton";
import AboutPage from "./components/AboutPage";
import DetailedPage from "./components/DetailedPage";

function App(props) {
  const pkmns = props.pokemons;
  const [detailedId, setDetailed] = useState(null);
  const [search, setSearch] = useState("");
  const [aboutView, setAboutView] = useState(false);
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [genFilter, setGenFilter] = useState("Tous");

  const TYPES_MAP = {
    Tous: () => true,
    ...Object.fromEntries(
      [
        "acier",
        "combat",
        "dragon",
        "eau",
        "électrik",
        "fée",
        "feu",
        "glace",
        "insecte",
        "normal",
        "plante",
        "poison",
        "psy",
        "roche",
        "sol",
        "spectre",
        "ténèbres",
        "vol",
      ].map((type) => [
        type.charAt(0).toUpperCase() + type.slice(1),
        (pk) => pk.types.some((t) => t.toLowerCase() === type),
      ])
    ),
  };
  const TYPES_NAMES = Object.keys(TYPES_MAP);

  const GEN_MAP = {
    Tous: () => true,
    1: (pk) => pk.gen === "1",
    2: (pk) => pk.gen === "2",
    3: (pk) => pk.gen === "3",
    4: (pk) => pk.gen === "4",
    5: (pk) => pk.gen === "5",
    6: (pk) => pk.gen === "6",
    7: (pk) => pk.gen === "7",
    8: (pk) => pk.gen === "8",
    9: (pk) => pk.gen === "9",
    Méga: (pk) => pk.gen.toLowerCase() === "méga",
    Gigamax: (pk) => pk.gen.toLowerCase() === "gigamax",
  };
  const GEN_NAMES = Object.keys(GEN_MAP);

  const searchFilter = (pk) =>
    pk.name.toLowerCase().includes(search.toLowerCase());

  const pkmnList = pkmns
    .filter(searchFilter)
    .filter(TYPES_MAP[typeFilter])
    .filter(GEN_MAP[genFilter])
    .map((pk) => (
      <Item
        key={pk.id}
        id={pk.id}
        name={pk.name}
        num={pk.num}
        location={pk.location}
        types={pk.types}
        onClick={setDetailed}
      />
    ));

  if (detailedId) {
    return (
      <DetailedPage setTypeFilter={setTypeFilter} id={detailedId} pkmns={pkmns} setDetailed={setDetailed} />
    );
  } else if (aboutView) {
    return <AboutPage quit={setAboutView} />;
  } else {
    return (
      <div className="subroot">
        <section>
          <h1>
            P<img src="/favicon.svg" id="pokeh1" />
            kedex
          </h1>
          <Search setSearch={setSearch} search={search} />
          {search ? (
            <div id="resultscounter">
              {pkmnList.length ? pkmnList.length : "Aucun"} résultat
              {pkmnList.length === 2 ? "" : "s"}
            </div>
          ) : (
            ""
          )}
          <div className="filterbuttons">
            <FilterButton
              options={TYPES_NAMES}
              filter={typeFilter}
              name="Type"
              setFilter={setTypeFilter}
            />
            <FilterButton
              options={GEN_NAMES}
              filter={genFilter}
              name="Génération"
              setFilter={setGenFilter}
            />
          </div>
          <div className="carillion">{pkmnList}</div>
        </section>
        <footer className="footer">
          <p>
            &copy; 2024{" "}
            <a
              style={{ color: "whitesmoke" }}
              href="https://github.com/onyyyyx"
            >
              Onyx
            </a>
            . Tous droits réservés.
          </p>
          <nav>
            <ul>
              <li>
                <a onClick={() => setAboutView(true)}>About</a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    );
  }
}

export default App;
