import React from "react";
import { PiPlusThin } from "react-icons/pi";

export default function Accordion({ faq, id }) {
  return (
    <div className="border-b-[1px] border-b-black pb-4">
      <input type="checkbox" id={id} className="hidden peer/accordion" />
      <label
        htmlFor={id}
        className="grid grid-cols-[1fr_0.15fr] justify-between items-center cursor-pointer peer-checked/accordion:[&>*:last-child]:rotate-[45deg]"
      >
        <p className="text-base">{faq.qstn}</p>
        <PiPlusThin className="text-3xl justify-self-end transition-all" />
      </label>
      <div className="grid grid-rows-[0] overflow-hidden peer-checked/accordion:grid-rows-1">
        <p className="text-base font-light mt-5 mb-3 translate-all whitespace-pre-wrap">
          {faq.ans}
        </p>
      </div>
    </div>
  );
}
