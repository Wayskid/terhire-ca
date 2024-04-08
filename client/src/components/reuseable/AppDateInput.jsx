import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

export default function AppDateInput({ onChange, value }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const options = {
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-gray-700 dark:bg-gray-700",
      clearBtn: "bg-main dark:bg-main",
      icons: "",
      text: "",
      disabledText: "bg-gray-500 dark:bg-gray",
      input:
        "bg-transparent dark:bg-transparent rounded-none border-[1px] py-[0.5rem] text-black dark:text-black text-base",
      inputIcon: "text-main dark:text-main",
      selected: "bg-main dark:bg-main",
    },
    language: "en",
    disabledDates: [],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  };

  return (
    <div className="relative" onClick={() => !show && setShow(true)}>
      <Datepicker
        options={options}
        onChange={onChange}
        show={show}
        setShow={handleClose}
        value={value}
      />
    </div>
  );
}
