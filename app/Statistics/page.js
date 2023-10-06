

import StaticsComponent from "../components/StaticsComponent";

function Statistics() {


  return (
    <div style={{
      overflow: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none"}} className="overflow-auto flex relative flex-col px-10 py-5  w-full h-full justify-between ">
     <StaticsComponent />
    </div>
  );
}

export default Statistics;
