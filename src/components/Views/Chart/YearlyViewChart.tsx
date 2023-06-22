import DefaultChart from '../../Parts/DefaultChart';
import { months } from 'dayjs/locale/ja';
import { SelectInputGroup } from '../../Templates/InputGroup';
import type { SelectOnChange } from '../../Templates/DefaultSelect';
import { BORDER_COLOR, CHART_OPTIONS, CHART_SELECTED_YEARS } from '.';
import { dayJs } from '../../../utils/day';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getAllViews } from '../../../utils/api/innView';
import { useRequest } from '../../../hooks/api';
import type { InnViewResponseData } from '../../../type/responseData/innView';
import { useAuth } from '../../../hooks/auth';

const INITIAL_YEARLY_VIEW_DATA = new Array(12).fill(0);

const YearlyViewChart = ({ initialViews }: { initialViews: InnViewResponseData[] }) => {
  const [selectedYear, setSelectedYear] = useState(dayJs().year());
  const [data, setData] = useState([...INITIAL_YEARLY_VIEW_DATA]);

  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  const chartData = {
    labels: months || [],
    datasets: [
      {
        data,
        borderColor: BORDER_COLOR,
      },
    ],
  };

  /** ビューのレスポンスのデータを各月のビュー数に変換させる処理 */
  const convertResponseToViewsArray = (responseViews: InnViewResponseData[]) => {
    const newData = [...INITIAL_YEARLY_VIEW_DATA];

    responseViews.map((view) => {
      const month = dayJs(view.createTime).get('month');
      const monthlyView = newData[month];

      if (monthlyView !== undefined) {
        newData[month] = monthlyView + 1;
      }
    });

    return newData;
  };

  /** 指定した年のビューのレスポンスのデータを全て取得し、各月のビュー数に変換させる処理 */
  const getAllViewsWrapper = async (year: number) => {
    if (!userId) throw new Error();

    const responseViews = await getAllViews(userId, dayJs().year(year).startOf('year').toDate(), dayJs().year(year).endOf('year').toDate());

    const newData = convertResponseToViewsArray(responseViews);

    setData([...newData]);
  };

  const handleChangeSelectedYear: SelectOnChange = (event) => {
    const inputYear = Number(event.target.value);
    setSelectedYear(inputYear);
    // 選択された年が変更するごとに表示するチャートを変更する処理
    loadingRequest(getAllViewsWrapper(inputYear), '取得中です', '取得に成功しました', '取得に失敗しました');
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    // initialViewsは非同期で受け取るため、受け取り以降、次の処理に進む
    if (!initialViews) return;

    const newData = convertResponseToViewsArray(initialViews);

    setData([...newData]);
  }, [initialViews, userId]);

  return (
    <div className="children:mb-5">
      <SelectInputGroup
        name="selectedYear"
        value={selectedYear}
        onChange={handleChangeSelectedYear}
        menuItems={CHART_SELECTED_YEARS}
        label="年を選択"
        selectClassName="w-full"
      />
      <div>
        <div>{selectedYear}年の宿泊施設の総閲覧数</div>
        <div className="text-24 font-bold">{_.sum(data)}ビュー</div>
      </div>
      <DefaultChart data={chartData} options={CHART_OPTIONS} height={300} />
    </div>
  );
};

export default YearlyViewChart;
