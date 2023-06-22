import DefaultChart from '../../Parts/DefaultChart';
import { SelectInputGroup } from '../../Templates/InputGroup';
import type { SelectOnChange } from '../../Templates/DefaultSelect';
import { BORDER_COLOR, CHART_OPTIONS, CHART_SELECTED_MONTHS, COMPLETED_PAYMENT_STATUS_IDS } from '.';
import { dayJs } from '../../../utils/day';
import { useMemo, useState, useEffect } from 'react';
import _ from 'lodash';
import { useRequest } from '../../../hooks/api';
import type { ReservationReservationResponseData } from '../../../type/responseData/reservationReservation';
import { getAllReservations } from '../../../utils/api/reservationReservation';
import { useAuth } from '../../../hooks/auth';

const MonthlyIncomeChart = ({ initialReservations }: { initialReservations: ReservationReservationResponseData[] }) => {
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

  /** 予約のデータを各日の収入のデータに変換させる処理 */
  const convertReservationsToIncomeData = (responseReservations: ReservationReservationResponseData[], month: number) => {
    const newData = new Array(
      dayJs()
        .set('month', month - 1)
        .daysInMonth(),
    ).fill(0);
    responseReservations.map((reservation) => {
      const day = Number(dayJs(reservation.checkInTime).format('D')) - 1;
      const dailyIncome = newData[day];

      if (dailyIncome !== undefined) {
        newData[day] = dailyIncome + reservation.fee;
      }
    });

    return newData;
  };

  /** 指定した月の予約を全て取得し、各日の収入データに整形する処理 */
  const getAllReservationsWrapper = async (month: number) => {
    if (!userId) throw new Error();

    const responseReservations = await getAllReservations(
      userId,
      dayJs()
        .month(month - 1)
        .startOf('month')
        .toDate(),
      dayJs()
        .month(month - 1)
        .endOf('month')
        .toDate(),
      COMPLETED_PAYMENT_STATUS_IDS,
    );

    const newData = convertReservationsToIncomeData(responseReservations, month);

    setData([...newData]);
  };

  const handleChangeSelectedMonth: SelectOnChange = (event) => {
    const inputMonth = Number(event.target.value);
    setSelectedMonth(inputMonth);
    // 選択された月が変更するごとに表示するチャートを変更する処理
    loadingRequest(getAllReservationsWrapper(inputMonth), '取得中です', '取得に成功しました', '取得に失敗しました');
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    const newData = convertReservationsToIncomeData(initialReservations, selectedMonth);

    setData([...newData]);
  }, [initialReservations, userId]);

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
        <div>{selectedMonth}月の収入</div>
        <div className="text-24 font-bold">¥{_.sum(data)}円</div>
      </div>
      <DefaultChart data={chartData} options={CHART_OPTIONS} height={300} />
    </div>
  );
};

export default MonthlyIncomeChart;
