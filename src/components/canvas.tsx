import { useDraw } from "@/hooks/useDraw";
import { RefObject, useEffect } from "react";
import { createSecureContext } from "tls";

const Canvas = ({ height, width }: { height: any; width: any }) => {
  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = "#000";
    const linewidth = 5;

    let startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = linewidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;

    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  useEffect(() => {
    console.log(canvasRef.current);
    if (canvasRef.current) {
      canvasRef.current.height = height;
      canvasRef.current.width = width;
    }
  }, [canvasRef, height, width]);

  return (
    <canvas
      onMouseDown={onMouseDown}
      ref={canvasRef}
      width={width}
      height={height}
      className=" bg-slate-800 "
    />
  );
};

export default Canvas;
