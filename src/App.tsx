import { useEffect, useState } from "react";
import DataPlot from "./components/DataPlot";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

interface DataPoint {
  x: number;
  y: number;
}

function App() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    socket.on("data", (x, y) => {
      //console.log(data.length);

      setData((data) => {
        if (data.length > 2000) {
          return [...data.slice(1), { x: x, y: y }];
        } else {
          return [...data, { x: x, y: y }];
        }
      });
    });
  }, []);

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <DataPlot title="I0" yTitle="Signal / V" data={data} />
        </div>
        <div className="col">
          <DataPlot title="I1" yTitle="Signal / V" data={data} />
        </div>
        <div className="col">
          <DataPlot title="I2" yTitle="Signal / V" data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
