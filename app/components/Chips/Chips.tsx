import Chip from "./Chip";
// import styles from "./ChipsTerms.module.scss";

type ChipsProps = {
  labels: string[];
  onClick: (label: string) => void;
};

const Chips = (props: ChipsProps) => {
  const { labels, onClick } = props;
  return (
    <div>
      <div>
        {labels.map((label) => (
          <Chip key={label} label={label} onClick={onClick} />
        ))}
      </div>
    </div>
  );
};

export default Chips;
