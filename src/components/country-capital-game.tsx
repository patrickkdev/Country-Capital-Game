import React from 'react';

type ButtonState = "normal" | "selected" | "wrong"

interface Option {
  text: string
  state: ButtonState
}

export default function CountryCapitalGame ({data}: {data: Record<string, string>}) {
  const countries = Object.keys(data)
  const capitals = Object.values(data)

  const [selectedPlace, setSelectedPlace] = React.useState<string | null>(null)
  const [options, setOptions] = React.useState<Option[]>([...countries, ...capitals].sort(() => Math.random() - 0.5).map((option) => ({text: option, state: "normal"})))

  const isGameOver = options.length === 0;

  const buttonColor = (optionState: string) => {
    if (optionState === "selected") {
      return "#009Bff";
    } else if (optionState === "wrong") {
      return "#ff0000";
    } else {
      return "black";
    }
  }

  function onClickOption(clickedOption: Option) {
    if (selectedPlace === null) {
      setSelectedPlace(clickedOption.text)
      setOptions((prev) => prev.map((opt) => {
        if (clickedOption.text === opt.text) {
          return {...opt, state: "selected"}
        } else {
          return {...opt, state: "normal"};
        }
      }))
    } else {  
      const isPair = data[clickedOption.text] === selectedPlace || data[selectedPlace] === clickedOption.text;

      if (isPair) {
        setSelectedPlace(null);
        setOptions(options.filter(o => o.text !== clickedOption.text && o.text !== selectedPlace));
      } else {
        setSelectedPlace(null);
        setOptions(options.map((opt) => {
          if (clickedOption.text === opt.text || selectedPlace === opt.text) {
            return { ...opt, state: "wrong" };
          } else {
            return opt;
          }
        }));
      }
    }
  }

  return (
    <div>
      {
        options.map((option) => (
          <button
            disabled={option.state !== "normal"}
            key={option.text}
            onClick={() => onClickOption(option)} 
            style={{backgroundColor: buttonColor(option.state)}}
          >
            <p>{option.text}</p>
          </button>
        ))
      }
      {
        isGameOver && 
        <h3>Congratulations</h3>
      }
    </div>
  )
}