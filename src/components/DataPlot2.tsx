// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface DataPoint {
  x: number;
  y: number;
}

interface Props {
  title: string;
  yTitle: string;
  lineColor: string;
  maxLen: number;
  tag: string;
  socket: Socket;
}

function DataPlot2({ title, yTitle, lineColor, maxLen, tag, socket }: Props) {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    socket.on(tag, (x, y) => {
      setData((data) => {
        if (data.length > maxLen) {
          return [...data.slice(1), { x: x, y: y }];
        } else {
          return [...data, { x: x, y: y }];
        }
      });
    });
  }, []);

  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "2px",
      }}
    >
      <CanvasJSChart
        options={{
          theme: "light1",
          animationEnabled: false,
          title: {
            fontFamily: "tahoma",
            fontSize: 22,
            text: title,
          },
          axisY: {
            gridColor: "black",
            gridDashType: "dot",
            gridThickness: 1,
            lineThickness: 1,
            tickColor: "black",
            tickLength: 8,
            tickThickness: 1,
            title: yTitle,
          },
          axisX: {
            gridColor: "black",
            gridDashType: "dot",
            gridThickness: 1,
            lineThickness: 1,
            tickColor: "black",
            tickLength: 8,
            tickThickness: 1,
            title: "Time / s",
          },
          data: [{ type: "line", lineColor: lineColor, dataPoints: data }],
        }}
      />
    </div>
  );
}

export default DataPlot2;
