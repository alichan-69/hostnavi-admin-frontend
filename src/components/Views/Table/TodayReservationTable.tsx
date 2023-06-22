import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  getFilteredRowModel,
  Column,
} from '@tanstack/react-table';
import DefaultTextField, { TextFieldOnChange } from '../../Parts/DefaultTextField';
import {
  AiOutlineSearch,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { dayJs } from '../../../utils/day';
import { useRouter } from 'next/router';
import DefaultSelect, { SelectOnChange } from '../../Templates/DefaultSelect';
import type { TableReservation } from './ReservationTable';
import { filterFns, NUMBER_FILTER, TIME_FILTER, SELECTED_ROWS } from '.';
import { YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT } from '../../../const/date';
import {
  RESERVATION_STATUS_IDENTIFIER_JAPANESE,
  RESERVATION_STATUS_IDENTIFIER_ENGLISH,
  RESERVATION_RESERVER_IDENTIFIER_JAPANESE,
  RESERVATION_RESERVER_IDENTIFIER_ENGLISH,
  CHECK_IN_TIME_IDENTIFIER_JAPANESE,
  CHECK_IN_TIME_IDENTIFIER_ENGLISH,
  CHECK_OUT_TIME_IDENTIFIER_JAPANESE,
  CHECK_OUT_TIME_IDENTIFIER_ENGLISH,
  GUEST_NUMBER_IDENTIFIER_JAPANESE,
  GUEST_NUMBER_IDENTIFIER_ENGLISH,
} from '../../../const/reservation';
import {
  INN_NAME_IDENTIFIER_JAPANESE,
  INN_NAME_IDENTIFIER_ENGLISH,
  INN_FEE_IDENTIFIER_JAPANESE,
  INN_FEE_IDENTIFIER_ENGLISH,
} from '../../../const/inn';
import { useRequest } from '../../../hooks/api';
import { getAllReservations } from '../../../utils/api/reservationReservation';
import { useAuth } from '../../../hooks/auth';

const HEADER_TITLES = [
  {
    label: INN_NAME_IDENTIFIER_JAPANESE,
    value: INN_NAME_IDENTIFIER_ENGLISH,
  },
  {
    label: RESERVATION_STATUS_IDENTIFIER_JAPANESE,
    value: RESERVATION_STATUS_IDENTIFIER_ENGLISH,
  },
  {
    label: RESERVATION_RESERVER_IDENTIFIER_JAPANESE,
    value: RESERVATION_RESERVER_IDENTIFIER_ENGLISH,
  },
  {
    label: CHECK_IN_TIME_IDENTIFIER_JAPANESE,
    value: CHECK_IN_TIME_IDENTIFIER_ENGLISH,
  },
  {
    label: CHECK_OUT_TIME_IDENTIFIER_JAPANESE,
    value: CHECK_OUT_TIME_IDENTIFIER_ENGLISH,
  },
  {
    label: GUEST_NUMBER_IDENTIFIER_JAPANESE,
    value: GUEST_NUMBER_IDENTIFIER_ENGLISH,
  },
  {
    label: INN_FEE_IDENTIFIER_JAPANESE,
    value: INN_FEE_IDENTIFIER_ENGLISH,
  },
];
const HEADER_COLUMNS_LENGTH = HEADER_TITLES.length;

const TodayReservationTable = function render() {
  const [searchedTextPlaceholder, setSearchedTextPlaceholder] = useState(HEADER_TITLES[0]?.label);
  const [headerColumn, setHeaderColumn] = useState(HEADER_TITLES[0]?.value || '');
  const [searchedText, setSearchedText] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [reservations, setReservations] = useState<TableReservation[]>([]);
  const [selectedRow, setSelectedRow] = useState(SELECTED_ROWS[0]?.value || 1);

  const router = useRouter();
  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  const columns: ColumnDef<TableReservation>[] = [
    {
      id: 'todayReservation',
      columns: [
        {
          accessorKey: INN_NAME_IDENTIFIER_ENGLISH,
          header: INN_NAME_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: RESERVATION_STATUS_IDENTIFIER_ENGLISH,
          header: RESERVATION_STATUS_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: RESERVATION_RESERVER_IDENTIFIER_ENGLISH,
          header: RESERVATION_RESERVER_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: CHECK_IN_TIME_IDENTIFIER_ENGLISH,
          header: CHECK_IN_TIME_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => dayJs(getValue()).format(YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT),
          filterFn: TIME_FILTER,
        },
        {
          accessorKey: CHECK_OUT_TIME_IDENTIFIER_ENGLISH,
          header: CHECK_OUT_TIME_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => dayJs(getValue()).format(YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT),
          filterFn: TIME_FILTER,
        },
        {
          accessorKey: GUEST_NUMBER_IDENTIFIER_ENGLISH,
          header: GUEST_NUMBER_IDENTIFIER_JAPANESE,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: INN_FEE_IDENTIFIER_ENGLISH,
          header: INN_FEE_IDENTIFIER_JAPANESE,
          filterFn: NUMBER_FILTER,
        },
      ],
    },
  ];

  const table = useReactTable<TableReservation>({
    data: reservations,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    filterFns,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const searchedColumn = useMemo(() => {
    let searchedColumn: Column<TableReservation, unknown> | undefined = table.getHeaderGroups()[0]?.headers[0]?.column;

    // 選択された列にアクセスするためのオブジェクトを探す
    table.getHeaderGroups().map((headerGroup) => {
      headerGroup.headers.map((header) => {
        if (header.id === headerColumn) searchedColumn = header.column;
      });
    });

    return searchedColumn;
  }, [table.getHeaderGroups()]);

  const handleChangeHeaderColumn: SelectOnChange = (event) => {
    // 現在かかっているテーブルのフィルターをはずす
    searchedColumn?.setFilterValue('');

    const changedHeaderColumn = String(event.target.value);
    setHeaderColumn(changedHeaderColumn);

    // 検索ボックスのプレースホルダーを変更する処理
    let searchedTextPlaceholder = '';
    HEADER_TITLES.map((headerTitle) => {
      if (headerTitle.value === changedHeaderColumn) searchedTextPlaceholder = headerTitle.label;
    });
    setSearchedTextPlaceholder(searchedTextPlaceholder);
  };

  const handleChangeSearchedText: TextFieldOnChange = (event) => {
    setSearchedText(event.target.value);

    searchedColumn?.setFilterValue(event.target.value);
  };

  const handleTableRowClick = (id: number) => {
    router.push({
      pathname: '/reservation/[id]',
      query: { id },
    });
  };

  const handleChangePage = (event: ChangeEvent<HTMLInputElement>) => {
    const input = Number(event.target.value);
    const page = input <= table.getPageCount() ? input - 1 : 0;
    table.setPageIndex(page);
  };

  const handleChangeSelectedRow: SelectOnChange = (event) => {
    const input = Number(event.target.value);
    setSelectedRow(input);

    table.setPageSize(Number(event.target.value));
  };

  const getPagedReservationsWrapper = async (checkInTimeAfter: Date, checkOutTimeBefore: Date) => {
    if (!userId) throw new Error();

    const responseReservations = await getAllReservations(userId, checkInTimeAfter, checkOutTimeBefore);
    setReservations(
      responseReservations.map((reservation) => ({
        id: reservation.id,
        innName: reservation.inn.name,
        status: reservation.status.name,
        reserver: reservation.reserver.name,
        checkInTime: reservation.checkInTime,
        checkOutTime: reservation.checkOutTime,
        guestNumber: reservation.guestNumber,
        fee: reservation.fee,
      })),
    );
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    loadingRequest(
      getPagedReservationsWrapper(dayJs().startOf('day').toDate(), dayJs().endOf('day').toDate()),
      '取得中',
      '取得完了',
      '取得中にエラーが発生しました',
    );

    // 初期化時に表示する各ページの列数を指定する
    table.setPageSize(selectedRow);
  }, [userId]);

  return (
    <div className="children:mb-5">
      <DefaultSelect value={headerColumn} onChange={handleChangeHeaderColumn} menuItems={HEADER_TITLES} className="w-60" />
      <DefaultTextField
        startAdornment={<AiOutlineSearch />}
        value={searchedText}
        onChange={handleChangeSearchedText}
        placeholder={`${searchedTextPlaceholder}を検索する`}
        className="w-80"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            {table.getHeaderGroups().map(
              (headerGroup) =>
                headerGroup.headers.length === HEADER_COLUMNS_LENGTH && (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) =>
                      header.column.id === CHECK_IN_TIME_IDENTIFIER_ENGLISH ||
                      header.column.id === CHECK_OUT_TIME_IDENTIFIER_ENGLISH ||
                      header.column.id === GUEST_NUMBER_IDENTIFIER_ENGLISH ||
                      header.column.id === INN_FEE_IDENTIFIER_ENGLISH ? (
                        <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <AiOutlineArrowUp className="inline-block" />,
                            desc: <AiOutlineArrowDown className="inline-block" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </TableCell>
                      ) : (
                        <TableCell key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableCell>
                      ),
                    )}
                  </TableRow>
                ),
            )}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} hover={true}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} onClick={() => handleTableRowClick(row.original.id)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex items-center gap-2">
        <IconButton onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          <AiOutlineDoubleLeft />
        </IconButton>
        <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <AiOutlineLeft />
        </IconButton>
        <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <AiOutlineRight />
        </IconButton>
        <IconButton onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          <AiOutlineDoubleRight />
        </IconButton>
        {`${table.getState().pagination.pageIndex + 1} / ${table.getPageCount() || 1} ページ`}
        <DefaultTextField
          inputProps={{ min: 1, max: table.getPageCount() || 1 }}
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={handleChangePage}
          className="w-16"
        />
        ページに行く
        <DefaultSelect value={selectedRow} onChange={handleChangeSelectedRow} menuItems={SELECTED_ROWS} />
        行表示する
      </div>
    </div>
  );
};

export default TodayReservationTable;
