import "./Loader.scss";

function Loader({ className }: { className: string }) {
  return <div className={`loader ${className}`}></div>;
}

export default Loader;
