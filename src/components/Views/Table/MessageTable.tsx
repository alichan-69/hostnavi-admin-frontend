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
import { filterFns, TIME_FILTER, SELECTED_ROWS } from '.';
import {
  LAST_MESSAGE_IDENTIFIER_JAPANESE,
  LAST_MESSAGE_IDENTIFIER_ENGLISH,
  SEND_LAST_MESSAGE_TIME_IDENTIFIER_JAPANESE,
  SEND_LAST_MESSAGE_TIME_IDENTIFIER_ENGLISH,
} from '../../../const/message';
import { USER_NAME_IDENTIFIER_ENGLISH, USER_NAME_IDENTIFIER_JAPANESE } from '../../../const/user';
import { INN_NAME_IDENTIFIER_JAPANESE, INN_NAME_IDENTIFIER_ENGLISH } from '../../../const/inn';
import { MONTH_DAY_HOUR_MINUTE_TIME_FORMAT } from '../../../const/date';
import type { ReservationMessageResponseData } from '../../../type/responseData/reservationMessage';
import { useRequest } from '../../../hooks/api';
import { getSameReservationsLastMessages } from '../../../utils/api/reservationMessage';
import { useAuth } from '../../../hooks/auth';

type TableMessage = {
  id: ReservationMessageResponseData['id'];
  innName: ReservationMessageResponseData['reservation']['inn']['name'];
  userName: ReservationMessageResponseData['reservation']['reserver']['name'];
  reservationId: ReservationMessageResponseData['reservation']['id'];
  lastMessage: ReservationMessageResponseData['message'];
  sendTime: ReservationMessageResponseData['sendTime'];
};

const HEADER_TITLES = [
  {
    label: INN_NAME_IDENTIFIER_JAPANESE,
    value: INN_NAME_IDENTIFIER_ENGLISH,
  },
  {
    label: USER_NAME_IDENTIFIER_JAPANESE,
    value: USER_NAME_IDENTIFIER_ENGLISH,
  },
  {
    label: LAST_MESSAGE_IDENTIFIER_JAPANESE,
    value: LAST_MESSAGE_IDENTIFIER_ENGLISH,
  },
  {
    label: SEND_LAST_MESSAGE_TIME_IDENTIFIER_JAPANESE,
    value: SEND_LAST_MESSAGE_TIME_IDENTIFIER_ENGLISH,
  },
];
const HEADER_COLUMNS_LENGTH = HEADER_TITLES.length;

const MessageTable = function render() {
  const [searchedTextPlaceholder, setSearchedTextPlaceholder] = useState(HEADER_TITLES[0]?.label);
  const [headerColumn, setHeaderColumn] = useState(HEADER_TITLES[0]?.value || '');
  const [searchedText, setSearchedText] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [messages, setMessages] = useState<TableMessage[]>([]);
  const [selectedRow, setSelectedRow] = useState(SELECTED_ROWS[0]?.value || 1);

  const router = useRouter();
  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  const columns: ColumnDef<TableMessage>[] = [
    {
      id: 'message',
      columns: [
        {
          accessorKey: INN_NAME_IDENTIFIER_ENGLISH,
          header: INN_NAME_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: USER_NAME_IDENTIFIER_ENGLISH,
          header: USER_NAME_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: LAST_MESSAGE_IDENTIFIER_ENGLISH,
          header: LAST_MESSAGE_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: SEND_LAST_MESSAGE_TIME_IDENTIFIER_ENGLISH,
          header: SEND_LAST_MESSAGE_TIME_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => dayJs(getValue()).format(MONTH_DAY_HOUR_MINUTE_TIME_FORMAT),
          filterFn: TIME_FILTER,
        },
      ],
    },
  ];

  const table = useReactTable<TableMessage>({
    data: messages,
    columns,
    state: {
      sorting,
    },
    filterFns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const searchedColumn = useMemo(() => {
    let searchedColumn: Column<TableMessage, unknown> | undefined = table.getHeaderGroups()[0]?.headers[0]?.column;

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

    const changedHeaderColumn = event.target.value;
    setHeaderColumn(String(changedHeaderColumn));

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
      pathname: '/message/[id]',
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

  const getSameReservationsLastMessagesWrapper = async () => {
    if (!userId) throw new Error();

    const responseMessages = await getSameReservationsLastMessages(userId);

    setMessages(
      responseMessages.map((message) => ({
        id: message.id,
        innName: message.reservation.inn.name,
        userName: message.reservation.reserver.name,
        reservationId: message.reservation.id,
        lastMessage: message.message,
        sendTime: message.sendTime,
      })),
    );
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    loadingRequest(getSameReservationsLastMessagesWrapper(), '取得中', '取得完了', '取得中にエラーが発生しました');

    // 初期化時に表示する各ページの列数を指定する
    table.setPageSize(selectedRow);
  }, [userId]);

  return (
    <div className="children:mb-5">
      <div className="flex">
        <DefaultSelect value={headerColumn} onChange={handleChangeHeaderColumn} menuItems={HEADER_TITLES} className="w-60" />
        <DefaultTextField
          startAdornment={<AiOutlineSearch />}
          value={searchedText}
          onChange={handleChangeSearchedText}
          placeholder={`${searchedTextPlaceholder}を検索する`}
          className="w-80"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(
              (headerGroup) =>
                headerGroup.headers.length === HEADER_COLUMNS_LENGTH && (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) =>
                      header.column.id === SEND_LAST_MESSAGE_TIME_IDENTIFIER_ENGLISH ? (
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
                  <TableCell key={cell.id} onClick={() => handleTableRowClick(row.original.reservationId)}>
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

export default MessageTable;
