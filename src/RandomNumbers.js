import { useState } from "react";
import { round } from "lodash";

export default function RandomNumberList() {
  const [randomNum, setRandomNum] = useState(0);
  const [list, setList] = useState([]);

  const handleButton = () => {
    // random # between 0-100 (inclusive)
    const newNum = round(Math.random() * 100);
    // unique key
    const newID = Date.now();
    setRandomNum(newNum);
    // sort low to high
    setList(
      [...list, { id: newID, value: newNum }].sort((a, b) => a.value - b.value)
    );
  };

  const handleClear = () => {
    setList([]);
  };

  const count = list.length;
  // reduce to return min value
  const min = list.length
    ? list.reduce((acc, cur) => Math.min(acc, cur.value), 100)
    : 0;

  // reduce to return max value
  const max = list.length
    ? list.reduce((acc, cur) => Math.max(acc, cur.value), 0)
    : 0;

  // reduce to return sum
  // divide sum by # of all elements
  const avg = list.length
    ? (list.reduce((acc, cur) => acc + cur.value, 0) / list.length).toFixed(2)
    : 0;

  const median = list.length
    ? // if odd
      // return middle element
      list.length % 2
      ? list[Math.floor(list.length / 2)].value
      : // if even
        // return average of two middle elements
        (list[list.length / 2 - 1].value + list[list.length / 2].value) / 2
    : 0;

  return (
    <div className="Container">
      <div className="Stats">
        <h2>Statistics</h2>
        <p>
          <strong>Count: </strong>
          {count}
          <strong> Minimum: </strong>
          {min}
          <strong> Maximum: </strong>
          {max}
          <strong> Average: </strong>
          {avg}
          <strong> Median: </strong>
          {median}
        </p>
      </div>
      <div className="Buttons">
        <button onClick={handleButton}>Add</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div className="List">
        <h2>Random Number Generator</h2>
        {list.map((i) => (
          <p key={i.id}>{i.value}</p>
        ))}
      </div>
    </div>
  );
}
