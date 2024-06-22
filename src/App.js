import { useEffect, useState } from "react";
import axios from "axios";

const colors = {
  fire: "orange",
  grass: "lightgreen",
  electric: "yellow",
  water: "#70ffea",
  ground: "darkgrey",
  rock: "grey",
  fairy: "pink",
  poison: "greenyellow",
  bug: "#94ecbe",
  dragon: "orange",
  psychic: "#7c7db6",
  flying: "#fcca46",
  fighting: "darkgrey",
  normal: "lightgrey",
  ice: "#00f2f2",
  dark: "#4f7ecf",
  ghost: "#7685a7",
  steel: "steelblue",
};

function capitalizeFirstLetter(string) {
  if (string.length === 0) return string; // Handle empty string
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const result = [];
      for (let i = 1; i <= 20; i++) {
        const pokemon = await getPokemon(i);
        result.push(pokemon);
      }
      setPokemonData(result);
    };

    fetchPokemon();
  }, []);

  const getPokemon = async (id) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const response = await axios.get(url);
      const data = await response.data;
      // console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Main>
        {pokemonData.length === 0 ? (
          <div className="loader"></div>
        ) : (
          pokemonData.map((pokemon, index) => (
            <Card key={index} pokemon={pokemon} />
          ))
        )}
      </Main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <img
        loading="eager"
        src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png"
        alt="Pokemon Logo"
      />
      <div className="title">
        <img
          src="https://www.pngkey.com/png/full/144-1446994_pokeball-clipart-transparent-background-pokeball-png.png"
          alt=""
          className="pokeball"
        />
        <img
          style={{ width: "50%" }}
          src="https://see.fontimg.com/api/renderfont4/xyWR/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UG9rZVdpa2k/pokemon-solid-normal.png"
          alt="logo"
        />
      </div>
    </div>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

const Card = ({ pokemon }) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleEnter = () => {
    setFlipped(true);
  };
  const handleLeave = () => {
    setFlipped(false);
  };

  const id = pokemon.id.toString().padStart(3, "0");
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const height = pokemon.height;
  const weight = pokemon.weight;
  const pokeTypes = pokemon.types.map((typeKind) => typeKind.type.name);
  const moves = pokemon.moves.slice(0, 10).map((i) => i.move.name);
  const image = pokemon.sprites.other.dream_world.front_default;
  const type = pokeTypes[0];

  const styleCardBorder = {
    border: `2px solid ${colors[type]}`,
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={isFlipped ? handleLeave : handleEnter}
      style={styleCardBorder}
    >
      <FlipCardInner>
        <div className="flip-card-front">
          <CardTop id={id} type={type} />
          <PokeImg image={image} />
          <CardContent
            cardFront={name}
            height={height}
            weight={weight}
            pokeTypes={pokeTypes}
          />
        </div>
        <div
          className="flip-card-back"
          onClick={handleLeave}
          onMouseLeave={handleLeave}
        >
          <BackCardContent moves={moves} key={id} handleLeave={handleLeave} />
        </div>
      </FlipCardInner>
    </div>
  );
};

function FlipCardInner({ children }) {
  return <div className="flip-card-inner">{children}</div>;
}

function CardTop({ id, type }) {
  const color = colors[type] || null;
  const styleIcon = {
    backgroundColor: color,
    boxShadow: `${color} 0px 0px 6px`,
  };
  return (
    <div className="top">
      <span className="number">#{id}</span>
      <span
        className="type-icon"
        title={type}
        style={color ? styleIcon : ""}
      ></span>
    </div>
  );
}

function PokeImg({ image }) {
  return (
    <div className="pokeImg">
      <img loading="lazy" alt="Pokemon" src={image} />
    </div>
  );
}

function CardContent({ cardFront, height, weight, pokeTypes }) {
  return (
    <>
      <div className="card-content">
        <h2 style={{ margin: 0 }}>
          <strong>{capitalizeFirstLetter(cardFront)}</strong>
        </h2>
      </div>
      <div className="h-w">
        <div className="gg">
          <small>Height:</small>
          <h5 className="wh">{height / 10}mt</h5>
        </div>
        <div className="gg">
          <small>Weight:</small>
          <h5 className="wh">{weight / 10}kg</h5>
        </div>
      </div>
      <div className="type">
        <small>Type: </small>
        <h5>{pokeTypes.map((i) => capitalizeFirstLetter(i)).join(" / ")}</h5>
      </div>
    </>
  );
}

function BackCardContent({ moves, handleLeave }) {
  return (
    <div className="card-content" onClick={() => handleLeave()}>
      <h1 style={{ marginTop: "0" }}>
        <strong>Moves:</strong>
      </h1>
      <ul>
        {moves.map((move, index) => (
          <li key={index}>{capitalizeFirstLetter(move)}</li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <strong>© 2024 BanksBond</strong> Source API:
      <a href="https://pokeapi.co/">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="PokeAPI"
        />
      </a>
    </footer>
  );
}
