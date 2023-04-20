const TagChips = ({statesAndSetStates}) => {
  return (
    <div className="tags-chip-container">
      {statesAndSetStates.map(([state, setState]) => {
        if (state && Object.keys(state).length > 0)
          return Object.keys(state).map((name, i) => {
            return (
              state[name] && (
                <button
                  className="tag-chip"
                  key={`tag-chip-${name}-${i}`}
                  value={name}
                  onClick={setState}
                >
                  <span className="pointer-events-none">
                    {name}&nbsp;
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </button>
              )
            );
          });
      })}
    </div>
  );
};

export default TagChips;
