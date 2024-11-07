import Chips from "./Chips";

export default function Home() {
  const chips = ["기저귀", "아침식사", "낫또", "식빵", "샐러드"];

  const handleChipsClick = (label: string) => {
    console.log(`${label}`);
  };
  return (
    <div>
      <Chips labels={chips} onLabelClick={handleChipsClick} />
    </div>
  );
}
