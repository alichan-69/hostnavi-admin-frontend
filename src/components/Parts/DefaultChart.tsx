import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export type DefaultChartProps = {
  title?: string;
  data: ChartData<'line'>;
  options?: ChartOptions;
  width?: string | number;
  height?: number;
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DefaultChart = function render({ title, data, options = {}, width, height }: DefaultChartProps) {
  return <Line style={{ maxHeight: `${height}px` }} title={title} data={data} options={options} width={width} height={height} />;
};

export default DefaultChart;
