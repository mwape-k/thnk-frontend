import "../components/component-styles/styles-summCard.css";
import { Maximize2 } from "lucide-react";

interface cardProps {
  onClick?: () => void;
  className?: string;
}

const SummmaryCard: React.FC<cardProps> = ({ onClick, className = "" }) => {
  return (
    <div className={`p-6 ${className}`}>
      <div className="summ-card-cont flex grid-cols-2 gap-4">
        <div className="col-span-12 mb-4 header-card">
          <div className="flex w-full grid-cols-2 justify-center items-center text-center header-card-inner">
            <h4 className="summ-header-title">You search result summary </h4>
            <span className="justify-end">
              <label
                htmlFor="my_modal_6"
                className="btn btn-neutral btn-dash rounded-full cursor-pointer"
              >
                <Maximize2 color="#fff" size={24} className="p-1" />
              </label>
            </span>
          </div>
        </div>
        <div className="col-span-12 neutrality-score">
          <div className="flex grid-cols-2">
            <h4 className="summ-score">Neutrality Score: </h4>
            <h4 className="summ-score">Persuasion Score: </h4>
          </div>
        </div>
        <div className="col-span-12">
          <p className="summ-summary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
            fugiat ratione dolore qui, a porro quod provident quis explicabo
            officia. Alias placeat magni reprehenderit architecto corrupti ad
            maxime soluta iusto?
          </p>
        </div>
      </div>

      {/* DaisyUI modal markup */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <div className="modal-box">
          <h3 id="modal-title" className="text-lg font-bold">
            Hello!
          </h3>
          <p id="modal-desc" className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            laborum, voluptatem quibusdam rerum in repudiandae recusandae
            facilis laudantium et esse non quidem delectus temporibus quisquam
            sequi, maiores id veritatis. Dolorum.
          </p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn cursor-pointer">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummmaryCard;
