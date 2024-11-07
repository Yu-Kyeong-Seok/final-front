import Chip from "./Chip";
// import styles from "./ChipsTerms.module.scss";

type ChipsProps = {
  labels: string[];
  onLabelClick: (label: string) => void;
};

const Chips = (props: ChipsProps) => {
  const { labels, onLabelClick } = props;
  return (
    <div>
      <div>
        {labels.map((label) => (
          <Chip key={label} label={label} onClick={onLabelClick} />
        ))}
      </div>
    </div>
  );
};

export default Chips;
