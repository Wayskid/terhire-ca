import "./style/appLoader.css";

export default function AppLoader() {
  
  return (
    <div
      className={`appLoader w-full h-full grid place-items-center py-20 `}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
