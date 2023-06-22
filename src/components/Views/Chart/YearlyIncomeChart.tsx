import DefaultChart from '../../Parts/DefaultChart';
import { months } from 'dayjs/locale/ja';
import { SelectInputGroup } from '../../Templates/InputGroup';
import type { SelectOnChange } from '../../Templates/DefaultSelect';
import { BORDER_COLOR, CHART_OPTIONS, CHART_SELECTED_YEARS, COMPLETED_PAYMENT_STATUS_IDS } from '.';
import { dayJs } from '../../../utils/day';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getAllReservations } from '../../../utils/api/reservationReservation';
import { useRequest } from '../../../hooks/api';
import type { ReservationReservationResponseData } from '../../../type/responseData/reservationReservation';
import { useAuth } from '../../../hooks/auth';

const INITIAL_YEARLY_INCOME_DATA = new Array(12).fill(0);

const YearlyIncomeChart = ({ initialReservations }: { initialReservations: ReservationReservationResponseData[] }) => {
  const [selectedYear, setSelectedYear] = useState(dayJs().year());
  const [data, setData] = useState([...INITIAL_YEARLY_INCOME_DATA]);

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

  /** 予約のデータを各月の収入のデータに変換させる処理 */
  const convertReservationsToIncomeData = (responseReservations: ReservationReservationResponseData[]) => {
    const newData = [...INITIAL_YEARLY_INCOME_DATA];

    responseReservations.map((reservation) => {
      const month = dayJs(reservation.checkInTime).get('month');
      const monthlyIncome = newData[month];

      if (monthlyIncome !== undefined) {
        newData[month] = monthlyIncome + reservation.fee;
      }
    });

    return newData;
  };

  /** 指定した年の予約を全て取得し、各月の収入データに整形する処理 */
  const getAllReservationsWrapper = async (year: number) => {
    if (!userId) throw new Error();

    const responseReservations = await getAllReservations(
      userId,
      dayJs().year(year).startOf('year').toDate(),
      dayJs().year(year).endOf('year').toDate(),
      COMPLETED_PAYMENT_STATUS_IDS,
    );

    const newData = convertReservationsToIncomeData(responseReservations);

    setData([...newData]);
  };

  const handleChangeSelectedYear: SelectOnChange = (event) => {
    const inputYear = Number(event.target.value);
    setSelectedYear(inputYear);
    // 選択された年が変更するごとに表示するチャートを変更する処理
    loadingRequest(getAllReservationsWrapper(inputYear), '取得中です', '取得に成功しました', '取得に失敗しました');
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    const newData = convertReservationsToIncomeData(initialReservations);

    setData([...newData]);
  }, [initialReservations, userId]);

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
        <div>{selectedYear}年の収入</div>
        <div className="text-24 font-bold">¥{_.sum(data)}円</div>
      </div>
      <DefaultChart data={chartData} options={CHART_OPTIONS} height={300} />
    </div>
  );
};

export default YearlyIncomeChart;
