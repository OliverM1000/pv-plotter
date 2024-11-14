import { io } from "socket.io-client";
import DataPlot2 from "./components/DataPlot2";

const socket = io("http://localhost:3000");

function App() {
  const maxLen = 500;

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <DataPlot2
            title="I0"
            yTitle="Signal / V"
            lineColor="blue"
            maxLen={maxLen}
            socket={socket}
            tag="signal1"
          />
        </div>
        <div className="col">
          <DataPlot2
            title="I1"
            yTitle="Signal / V"
            lineColor="red"
            maxLen={maxLen}
            socket={socket}
            tag="signal2"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
