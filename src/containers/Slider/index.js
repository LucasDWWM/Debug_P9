import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // .slice() permet de créer un tableau temporaire qui contient tous les éléments du tableau d'origine sans modifier l'original.
  // .sort() permet de trier un tableau selon un ordre que tu définis ( convertis en chaines de caractères )
  const byDateAsc = data?.focus.slice().sort((evtA, evtB) =>
    new Date(evtA.date) - new Date(evtB.date) // le " - " au lieu de " < " permet de trier par ordre décroissant
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateAsc.length ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateAsc.map((evt, radioIdx) => (
                // key est utilisé chaque élément <input /> généré dans la pagination a une clé unique.
                <input
                  key={evt.title + evt.date}
                  type="radio"
                  name="slider-pagination"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;