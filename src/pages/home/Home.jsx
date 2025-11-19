import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import "./Home.css";
import { Link } from "react-router-dom";


const locations = [
  // EUA
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Nova York", lat: 40.7128, lng: -74.0060 },
  { name: "Austin", lat: 30.2672, lng: -97.7431 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },
  { name: "Atlanta", lat: 33.749, lng: -84.388 },
  { name: "Philadelphia", lat: 39.9526, lng: -75.1652 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Minneapolis", lat: 44.9778, lng: -93.2650 },

  // Europa
  { name: "Londres", lat: 51.5074, lng: -0.1278 },
  { name: "Berlim", lat: 52.52, lng: 13.405 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Milão", lat: 45.4642, lng: 9.19 },
  { name: "Amsterdã", lat: 52.3676, lng: 4.9041 },
  { name: "Madrid", lat: 40.4168, lng: -3.7038 },
  { name: "Barcelona", lat: 41.3851, lng: 2.1734 },
  { name: "Bruxelas", lat: 50.8503, lng: 4.3517 },
  { name: "Zurique", lat: 47.3769, lng: 8.5417 },
  { name: "Viena", lat: 48.2082, lng: 16.3738 },
  { name: "Lisboa", lat: 38.7223, lng: -9.1393 },
  { name: "Dublin", lat: 53.3498, lng: -6.2603 },
  { name: "Copenhague", lat: 55.6761, lng: 12.5683 },
  { name: "Oslo", lat: 59.9139, lng: 10.7522 },
  { name: "Helsinki", lat: 60.1699, lng: 24.9384 },
  { name: "Praga", lat: 50.0755, lng: 14.4378 },
  { name: "Varsóvia", lat: 52.2297, lng: 21.0122 },

  // Ásia (sem China)
  { name: "Tóquio", lat: 35.6762, lng: 139.6503 },
  { name: "Seul", lat: 37.5665, lng: 126.9780 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { name: "Cingapura", lat: 1.3521, lng: 103.8198 },
  { name: "Taipei", lat: 25.033, lng: 121.5654 },
  { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Dhaka (Bangladesh)", lat: 23.8103, lng: 90.4125 },
  { name: "Kuala Lumpur", lat: 3.1390, lng: 101.6869 },
  { name: "Hanoi", lat: 21.0278, lng: 105.8342 },
  { name: "Manila", lat: 14.5995, lng: 120.9842 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Riyadh", lat: 24.7136, lng: 46.6753 },

  // América Latina
  { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
  { name: "Cidade do México", lat: 19.4326, lng: -99.1332 },
  { name: "Brasília", lat: -15.8267, lng: -47.9218 },
  { name: "Lima", lat: -12.0464, lng: -77.0428 },
  { name: "Bogotá", lat: 4.7110, lng: -74.0721 },
  { name: "Medellín", lat: 6.2442, lng: -75.5812 },
  { name: "Quito", lat: -0.1807, lng: -78.4678 },
  { name: "Montevidéu", lat: -34.9011, lng: -56.1645 },
  { name: "Caracas", lat: 10.4806, lng: -66.9036 },

  // Oceania
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
  { name: "Auckland", lat: -36.8485, lng: 174.7633 },
  { name: "Wellington", lat: -41.2865, lng: 174.7762 },

  // África
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
  { name: "Tunis", lat: 36.8065, lng: 10.1815 },
  { name: "Algiers", lat: 36.7538, lng: 3.0588 },
  { name: "Lagos", lat: 6.5244, lng: 3.3792 },
  { name: "Accra", lat: 5.6037, lng: -0.1870 },
  { name: "Abuja", lat: 9.0765, lng: 7.3986 },
  { name: "Nairobi", lat: -1.2921, lng: 36.8219 },
  { name: "Addis Abeba", lat: 9.0300, lng: 38.7400 },
  { name: "Dar es Salaam", lat: -6.7924, lng: 39.2083 },
  { name: "Kinshasa", lat: -4.4419, lng: 15.2663 },
  { name: "Luanda", lat: -8.8390, lng: 13.2894 },
  { name: "Johannesburgo", lat: -26.2041, lng: 28.0473 },
  { name: "Cidade do Cabo", lat: -33.9249, lng: 18.4241 },
  { name: "Harare", lat: -17.8252, lng: 31.0335 },
  { name: "Maputo", lat: -25.9692, lng: 32.5732 }
];

export default function Home() {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: 500, // altura do globo
  });

  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: 500 });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div className="home">
      {/* IMAGEM INICIAL (VÍDEO) */}
      <section className="imagem-inicial">
        <div className="video-fundo">
          <video autoPlay muted loop className="video-mesmo">
            <source src="/imagens/video-oculos3.mov" type="video/mp4" />
          </video>
        </div>
        <div className="texto-inicial">
          <h1>Óculos Tradutor</h1>
          <p>Entenda tudo com a mais alta tecnologia</p>
        </div>
      </section>

      {/* SOBRE O PRODUTO */}
      <section className="about-section">
        <div className="about-text">
          <h2>Óculos Tradutor</h2>
          <p>
            Um óculos SUPER tecnológico com a capacidade de traduzir textos e
            falas em outras línguas INSTANTANEAMENTE!!! (menos em mandarim)
          </p>
          <p>
            Ao colocar o óculos, um NOVO MUNDO se abre e seu entendimento
            APRIMORADO!! <br />
            Além de ter 100% de estilo!
          </p>
        </div>
        <div className="about-image">
          <img src="tecnologia.jpg" alt="Produto" className="imagem-2" />
        </div>
      </section>

      {/* IMAGEM FINAL */}
      <section className="end-section">
        <p> Onde chegamos:</p>
      </section>

      {/* GLOBO 3D - ÚLTIMA SEÇÃO */}
      <section style={{ width: "100%", height: `${dimensions.height}px`, marginTop: "50px" }}>
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          polygonsData={countries.features}
          polygonCapColor={() => "rgba(0, 255, 255, 0.2)"}
          polygonSideColor={() => "rgba(0, 255, 255, 0.1)"}
          polygonStrokeColor={() => "#00ffff"}
          pointsData={locations}
          pointLat={(d) => d.lat}
          pointLng={(d) => d.lng}
          pointColor={() => "red"}
          pointRadius={0.7}
          pointAltitude={0.03}
          pointLabel={(d) => d.name}
          width={dimensions.width}
          height={dimensions.height}
        />
      </section>

      <section className="rodape">
        <p> Gostou do nosso produto?
          <br/>
           <Link to= "/colecao">  Compre já! </Link>
           <br/>

          <Link to="https://youtu.be/dQw4w9WgXcQ"> Sobre  nós  </Link> 
        </p>

      </section>
      
    </div>
  );
}
