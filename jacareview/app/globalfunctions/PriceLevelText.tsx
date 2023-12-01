import jacoin from "../../public/jacoin.jpg"

function priceLevelText(multiplier: number) {
  return (
    <div>
      $:
      {Array.from({ length: multiplier }, (_, index) => (
        <img
          key={index}
          src={jacoin.src}
          alt="$"
          // Additional attributes or styles can be added here
        />
      ))}
    </div>
  );
}

export default priceLevelText