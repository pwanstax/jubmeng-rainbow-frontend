const ServiceCard = ({clinic}) => {
  const {name, address, rating, ratingCount, image} = clinic;
  return (
    <div className="clinic-card">
      <div className="pic">
        <img
          src="https://images.unsplash.com/photo-1551301657-ae4d18055505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
      </div>
      <div className="description">
        <h2>{name}</h2>
        <div className="rating-circle">
          {[...Array(rating)].map((v, i) => (
            <circle className="full-circle" key={`full-circle-${i}`} />
          ))}
          {[...Array(5 - rating)].map((v, i) => (
            <circle className="blank-circle" key={`blank-circle-${i}`} />
          ))}
          <span>&nbsp;{`${ratingCount} reviews`}</span>
          <span style={{color: "red"}}>&nbsp;&nbsp;{`Closed Now`}</span>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere neque
          laudantium aut at quos cum eos, maxime hic quo magni quidem veniam
          culpa quasi amet commodi, dicta cupiditate! Deserunt, vel!
        </p>
      </div>
    </div>
  );
};
export default ServiceCard;
