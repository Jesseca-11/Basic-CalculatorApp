import  { useState } from "react";

type operator = "+" | "-" | "*" | "/" | null;

const Calculator = () => {
  const [inputValue, setInputValue] = useState<string>("0");
  const [preValue, setPreValue] = useState<number | null>(null);
  const [currOp, setCurrOp] = useState<operator>(null);

  const numbers = ["7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3"];
  const opNumber = ["/", "*", "0", ".", "="];

  const handleNumClick = (val: string) => {
    if (inputValue === "0" && val !== ".") {
      setInputValue(val);
    } else {
      setInputValue(inputValue + val);
    }
  };

  const handleOperator = (op: operator) => {
    setPreValue(parseFloat(inputValue));
    setInputValue("0");
    setCurrOp(op);
  };

  const handleEquals = () => {
    if (preValue && currOp !== null) {
      const num = parseFloat(inputValue);
      let sum = 0;

      switch (currOp) {
        case "+":
          sum = preValue + num;
          break;
        case "*":
          sum = preValue * num;
          break;
        case "-":
          sum = preValue - num;
          break;
        case "/":
          sum = num === 0 ? 0 : preValue / num;
          break;
      }

      setCurrOp(null);
      setPreValue(null);
      setInputValue(sum.toString());
    }
  };

  const handleDelete = () => {
    if (inputValue.length <= 1) {
      setInputValue("0");
    } else {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  const handleAC = () => {
    setCurrOp(null);
    setPreValue(null);
    setInputValue("0");
  };

  return (
    <div className="flex   pt-[100px] justify-center  min-h-full pb-10  ">
      <form className="rounded-2xl  w-[25%] p-4 bg-white/20 bg-gradient-to-br from-blue-100 to-blue-300 ">
        <input
          type="text"
          value={inputValue}
          className="outline-none border-sm bg-transparent text-right text-[50px] font-medium text-black/50 h-[110px] w-full rounded-xl px-4 "
        />

        <div className="grid grid-cols-4 gap-3  ">
          <button
            type="button"
            onClick={() => handleAC()}
            className="rounded-2xl bg-blue-300/40 text-black/30 text-xl font-medium border border-white/30 py-4"
          >
            AC
          </button>
          <button
            type="button"
            onClick={() => handleDelete()}
            className="rounded-2xl bg-blue-300/40 text-black/30 text-xl font-medium border border-white/30 py-4"
          >
            del
          </button>
          {opNumber.slice(0, 2).map((op) => (
            <button
              type="button"
              onClick={() => handleOperator(op as operator)}
              className="rounded-2xl bg-blue-300/40 text-blue-600 text-xl font-medium border border-white/20"
              key={op}
            >
              {op}
            </button>
          ))}

          {numbers.map((numb) => (
            <button
              type="button"
              onClick={() =>
                numb === "+" || numb === "-"
                  ? handleOperator(numb as operator)
                  : handleNumClick(numb)
              }
              className={
                numb === "+"
                  ? "row-span-2 py-1 rounded-2xl bg-blue-300/40 text-blue-600 text-2xl font-medium border border-white/30 "
                  : numb === "-"
                  ? "rounded-2xl bg-blue-300/40 text-blue-600 text-xl font-medium border border-white/30 py-3"
                  : "rounded-2xl bg-white/30 text-white text-xl font-medium border border-white/30 py-3  "
              }
              key={numb}
            >
              {numb}
            </button>
          ))}

          {opNumber.slice(2, 5).map((op) => (
            <button
              type="button"
              onClick={() =>
                op === "="
                  ? handleEquals()
                  : op === "."
                  ? handleNumClick(".")
                  : handleNumClick(op)
              }
              className={
                op === "0"
                  ? "col-span-2 rounded-2xl bg-white/30 text-white text-xl font-medium border border-white/30 py-2"
                  : op === "="
                  ? "row-span-2 py-2 rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 text-white text-xl font-bold border border-white/30  "
                  : "rounded-2xl  bg-white/30 text-white text-xl font-medium border border-white/20 py-4"
              }
              key={op}
            >
              {op}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Calculator;
