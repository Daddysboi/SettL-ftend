import { useState } from "react";
import Faqs_data from "../../Data/Faqs_data.json";
const Faqs = () => {
  const [accordion, setAccordion] = useState(0);

  const toogleAccordion = (index) => {
    setAccordion((prev) => (prev === index ? -1 : index));
  };
  return (
    <>
      <div>Frequently Asked Questions</div>
      <div>
        {Faqs_data.map((item, index) => (
          <div key={index} onClick={() => toogleAccordion(index)}>
            <h3>
              {item.question}{" "}
              <span>
                {accordion === index ? <span>-</span> : <span>+</span>}
              </span>
            </h3>
            <div>{accordion === index && <p>{item.answer}</p>}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faqs;
