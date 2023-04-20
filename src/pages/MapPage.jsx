import MapProductView from "../components/MapProductView";

const MapPage = () => {
  return (
    <div className="mappage-container">
      <div className="product-view">
        <MapProductView />
      </div>
      <div className="map-view">map view in here</div>
    </div>
  );
};

export default MapPage;
