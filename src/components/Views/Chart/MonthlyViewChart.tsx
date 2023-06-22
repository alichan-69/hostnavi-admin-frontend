import DefaultChart from '../../Parts/DefaultChart';
import { SelectInputGroup } from '../../Templates/InputGroup';
import type { SelectOnChange } from '../../Templates/DefaultSelect';
import { BORDER_COLOR, CHART_OPTIONS, CHART_SELECTED_MONTHS } from '.';
import { dayJs } from '../../../utils/day';
import { useMemo, useState, useEffect } from 'react';
import _ from 'lodash';
import { useRequest } from '../../../hooks/api';
import type { InnViewResponseData } from '../../../type/responseData/innView';
import { getAllViews } from '../../../utils/api/innView';
import { useAuth } from '../../../hooks/auth';

const MonthlyViewChart = ({ initialViews }: { initialViews: InnViewResponseData[] }) => {
  const [selectedMonth, setSelectedMonth] = useState(Number(dayJs().format('M')));
  const [data, setData] = useState(new Array(dayJs().daysInMonth()).fill(0));

  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  const days = useMemo(
    () =>
      [
        ...Array(
          dayJs()
            .set('month', selectedMonth - 1)
            .daysInMonth(),
        ),
      ].map((_, i) => {
        return `${i + 1}日`;
      }),
    [selectedMonth],
  );
  const chartData = useMemo(() => {
    return {
      labels: days || [],
      datasets: [
        {
          data,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  }, [days, data]);

  /** ビューのレスポンスデータを各日のビュー数に変換させる処理 */
  const convertResponseToViewsArray = (responseViews: InnViewResponseData[], month: number) => {
    const newData = new Array(
      dayJs()
        .set('month', month - 1)
        .daysInMonth(),
    ).fill(0);
    responseViews.map((view) => {
      const day = Number(dayJs(view.createTime).format('D')) - 1;
      const dailyView = newData[day];

      if (dailyView !== undefined) {
        newData[day] = dailyView + 1;
      }
    });

    return newData;
  };

  /** 指定した月のビューを全て取得し、各日のビュー数に整形する処理 */
  const getAllViewsWrapper = async (month: number) => {
    if (!userId) throw new Error();

    const responseViews = await getAllViews(
      userId,
      dayJs()
        .month(month - 1)
        .startOf('month')
        .toDate(),
      dayJs()
        .month(month - 1)
        .endOf('month')
        .toDate(),
    );

    const newData = convertResponseToViewsArray(responseViews, month);

    setData([...newData]);
  };

  const handleChangeSelectedMonth: SelectOnChange = (event) => {
    const inputMonth = Number(event.target.value);
    setSelectedMonth(inputMonth);
    // 選択された月が変更するごとに表示するチャートを変更する処理
    loadingRequest(getAllViewsWrapper(inputMonth), '取得中です', '取得に成功しました', '取得に失敗しました');
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    // initialViewsは非同期で受け取るため、受け取り以降、次の処理に進む
    if (!initialViews) return;

    const newData = convertResponseToViewsArray(initialViews, selectedMonth);

    setData([...newData]);
  }, [initialViews, userId]);

  return (
    <div className="children:mb-5">
      <SelectInputGroup
        name="selectedMonth"
        value={selectedMonth}
        onChange={handleChangeSelectedMonth}
        menuItems={CHART_SELECTED_MONTHS}
        label="月を選択"
        selectClassName="w-full"
      />
      <div>
        <div>{selectedMonth}月の宿泊施設の総閲覧数</div>
        <div className="text-24 font-bold">{_.sum(data)}ビュー</div>
      </div>
      <DefaultChart data={chartData} options={CHART_OPTIONS} height={300} />
    </div>
  );
};

export default MonthlyViewChart;
