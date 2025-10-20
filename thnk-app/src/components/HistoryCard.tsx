import "../components/component-styles/styles-historyCard.css";

import Node from "../assets/node.svg";

function HistoryCard() {
  return (
    <div className="history-outer flex grid-cols-2 gap-4 p-0 justify-center items-center w-full">
      <div className="node-cont">
        <img src={Node} alt="Node" className="node-history" />
      </div>
      <div className="history-card col-span-10 p-6">
        <div className="history-card-cont flex grid-cols-2 gap-4">
          <div className="col-span-4">
            <h4 className="history-score">Neutrality Score: </h4>
            <h4 className="history-score">Persuasion Score: </h4>
          </div>
          <div className="col-span-8">
            <p className="node-summary">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Obcaecati fugiat ratione dolore qui, a porro quod provident quis
              explicabo officia. Alias placeat magni reprehenderit architecto
              corrupti ad maxime soluta iusto?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
