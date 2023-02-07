import { useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<Point | null>(null);

  const onMouseDown = () => {
    setMouseDown(true);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;

      const currentPoint = computeCanvasPosition(e);

      const ctx = canvasRef.current?.getContext("2d");

      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computeCanvasPosition = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };

    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [mouseDown, onDraw]);

  return { canvasRef, onMouseDown };
};
