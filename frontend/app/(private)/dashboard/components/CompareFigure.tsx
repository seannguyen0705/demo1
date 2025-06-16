interface IProps {
  lastFigure: number;
  currentFigure: number;
}

export default function CompareFigure({ lastFigure, currentFigure }: IProps) {
  if (lastFigure === 0) {
    return <span className="text-green-600">+ 0%</span>;
  }
  const difference = Math.abs(currentFigure - lastFigure) / lastFigure;
  if (currentFigure >= lastFigure) {
    return <span className="text-green-600">+ {(difference * 100).toFixed(2)}%</span>;
  }
  return <span className="text-red-600"> - {(difference * 100).toFixed(2)}%</span>;
}
