const ClinicCard = ({clinic}) => {
  const {name, address, rating, ratingCount, image} = clinic;
  return (
    <div className="clinic-card">
      <div className="pic" />
      <div className="description">
        <h2>{name}</h2>
        {Array.from({length: rating}, (_, i) => (
          <circle key={i} />
        ))}
      </div>
    </div>
  );
};
export default ClinicCard;
