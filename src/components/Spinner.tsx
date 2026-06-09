import "./Spinner.css";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
};

export default function Spinner({ size = "md", text }: SpinnerProps) {
  return (
    <div className={`spinner spinner--${size}`}>
      <div className="spinner__animation" />
      {text && <p className="spinner__text">{text}</p>}
    </div>
  );
}
