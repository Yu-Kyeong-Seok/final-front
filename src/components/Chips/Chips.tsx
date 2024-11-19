import Chip from "./Chip";
// import styles from "./ChipsTerms.module.scss";

type ChipsProps = {
  labels: string[];
  onClick: (label: string) => void;
  className?: string;
  containerClassName?: string;
};

const Chips = (props: ChipsProps) => {
  const { labels, onClick, className, containerClassName } = props;
  return (
    <div className={containerClassName}>
      <div>
        {labels.map((label) => (
          <Chip
            key={label}
            label={label}
            onClick={onClick}
            className={className}
          />
        ))}
      </div>
    </div>
  );
};

export default Chips;
