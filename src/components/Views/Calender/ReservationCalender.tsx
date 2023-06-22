import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { dayJs } from '../../../utils/day';
import { CALENDER_DISPLAYED_MIN_YEAR, CALENDER_DISPLAYED_MAX_YEAR, DAY_HOUR_MINUTE_TIME_FORMAT, CURRENT_DATE } from '../../../const/date';
import { COLOR } from '../../../const/color';
import { useRouter } from 'next/router';
import type { ReservationReservationResponseData } from '../../../type/responseData/reservationReservation';
import { getAllReservations } from '../../../utils/api/reservationReservation';
import { useRequest } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';

const STATUSES = [
  {
    id: 1,
    color: COLOR.PRIMARY,
  },
  {
    id: 2,
    color: COLOR.WARNING,
  },
  {
    id: 3,
    color: COLOR.PRIMARY,
  },
  {
    id: 4,
    color: COLOR.SECONDARY,
  },
];

const RESOURCES = [
  {
    fieldName: 'statusId',
    instances: STATUSES,
  },
];

type CalenderReservation = {
  id: ReservationReservationResponseData['id'];
  innName: ReservationReservationResponseData['inn']['name'];
  status: ReservationReservationResponseData['status']['name'];
  startDate: ReservationReservationResponseData['checkInTime'];
  endDate: ReservationReservationResponseData['checkOutTime'];
  statusId: ReservationReservationResponseData['status']['id'];
};

const ReservationCalender = function render() {
  const [currentDate, setCurrentDate] = useState(CURRENT_DATE);
  const [isDisabledGoForwardMonthButton, setIsDisabledGoForwardMonthButton] = useState(false);
  const [isDisabledGoBackMonthButton, setIsDisabledGoBackMonthButton] = useState(false);
  const [reservations, setReservations] = useState<CalenderReservation[]>([]);

  const router = useRouter();
  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  /** 表示する月によって表示月を変更するボタンの表示を切り替える処理 */
  const changeDisableOfChangeMonthButton = (currentDate: Date) => {
    if (dayJs(currentDate).toDate().getFullYear() > CALENDER_DISPLAYED_MAX_YEAR) {
      setCurrentDate(dayJs(currentDate).add(-1, 'month').toDate());
      setIsDisabledGoForwardMonthButton(true);
    } else if (dayJs(currentDate).toDate().getFullYear() < CALENDER_DISPLAYED_MIN_YEAR) {
      setCurrentDate(dayJs(currentDate).add(1, 'month').toDate());
      setIsDisabledGoBackMonthButton(true);
    } else {
      setCurrentDate(currentDate);
      setIsDisabledGoForwardMonthButton(false);
      setIsDisabledGoBackMonthButton(false);
    }
  };

  // カレンダーの表示月が変更するごとに表示する予約を変更する処理
  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    const getAllReservationsWrapper = async () => {
      const responseReservations = await getAllReservations(
        userId,
        dayJs(currentDate).startOf('month').toDate(),
        dayJs(currentDate).endOf('month').toDate(),
      );

      setReservations(
        responseReservations.map((reservation) => ({
          id: reservation.id,
          innName: reservation.inn.name,
          status: reservation.status.name,
          startDate: reservation.checkInTime,
          endDate: reservation.checkOutTime,
          statusId: reservation.status.id,
        })),
      );
    };

    loadingRequest(getAllReservationsWrapper(), '取得中です', '取得に成功しました', '取得に失敗しました');
  }, [currentDate, userId]);

  const Appointment = ({ data, ...props }: Appointments.AppointmentProps) => {
    const transitionReservationDetail = () => {
      router.push(`/reservation/${data.id}`);
    };

    return (
      <Appointments.Appointment {...props} data={data} onClick={transitionReservationDetail}>
        <div className="text-thirdly">
          {data['innName']}
          <br />
          {data['status']}
          <br />
          {dayJs(data.startDate).format(DAY_HOUR_MINUTE_TIME_FORMAT)}〜{dayJs(data.endDate).format(DAY_HOUR_MINUTE_TIME_FORMAT)}
          <br />
        </div>
      </Appointments.Appointment>
    );
  };

  const NavigationButton = ({ type, onClick }: DateNavigator.NavigationButtonProps) => {
    return (
      <>
        {type === 'forward' ? (
          <DateNavigator.NavigationButton
            type="forward"
            onClick={
              onClick ||
              (() => {
                return;
              })
            }
            className={isDisabledGoForwardMonthButton ? 'hidden' : ''}
          />
        ) : (
          <DateNavigator.NavigationButton
            type="back"
            onClick={
              onClick ||
              (() => {
                return;
              })
            }
            className={isDisabledGoBackMonthButton ? 'hidden' : ''}
          />
        )}
      </>
    );
  };

  return (
    <Paper>
      <Scheduler locale="ja" data={reservations}>
        <ViewState currentDate={currentDate} onCurrentDateChange={changeDisableOfChangeMonthButton} />
        <MonthView />
        <Appointments appointmentComponent={Appointment} />
        <Toolbar />
        <Resources data={RESOURCES} />
        <DateNavigator navigationButtonComponent={NavigationButton} />
        <TodayButton
          messages={{
            today: '今日',
          }}
        />
      </Scheduler>
    </Paper>
  );
};

export default ReservationCalender;
