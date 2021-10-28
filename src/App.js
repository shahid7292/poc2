import "./App.css";
import { data as mainData } from "./data";

function App() {
  let groups = [];
  let totalVisitors = 0;
  let dates = [];
  for (let data of mainData) {
    groups.push(data.group);
    totalVisitors += data.visitors;
  }
  groups = [...new Set(groups)];
  const newData = {};
  for (let group of groups) {
    newData[group] = {};
  }
  for (let data of mainData) {
    newData[data?.group]["visitors"] =
      (newData[data?.group]["visitors"] || 0) + data.visitors;
    newData[data?.group]["appearanceTimeInSecs"] =
      (newData[data?.group]["appearanceTimeInSecs"] || 0) +
      data.appearanceTimeInSecs;
    dates.push(new Date(data.date));
  }

  const maxDate = new Date(Math.max.apply(null, dates));
  const minDate = new Date(Math.min.apply(null, dates));
  const getRate = (visitors) => {
    return ((visitors / totalVisitors) * 100).toFixed(2);
  };
  return (
    <div className="App">
      <h1>
        Date Range: {minDate.getFullYear()}-{minDate.getMonth() + 1}-
        {minDate.getDate()} ~ {maxDate.getFullYear()}-{maxDate.getMonth() + 1}-
        {maxDate.getDate()}
      </h1>
      <table className="table">
        <thead>
          <tr>
            <td></td>
            <td>visitors</td>
            <td>rate</td>
            <td>appearnce time (min)</td>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => {
            return (
              <tr key={index}>
                <td>{group}</td>
                <td>{newData[group]["visitors"]}</td>
                <td>{getRate(newData[group]["visitors"])}%</td>
                <td>
                  {(newData[group]["appearanceTimeInSecs"] / 60).toFixed(1)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
