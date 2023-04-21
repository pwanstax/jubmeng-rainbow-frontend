import Map from "../components/Map";
import MapProductView from "../components/MapProductView";

const MapPage = () => {
  return (
    <div className="mappage-container">
      <div className="product-view">
        <MapProductView />
      </div>
      <Map />
    </div>
  );
};

export default MapPage;
