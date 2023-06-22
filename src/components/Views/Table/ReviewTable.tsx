import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, IconButton } from '@mui/material';
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
import { useState, useMemo, ChangeEvent, useEffect } from 'react';
import { dayJs } from '../../../utils/day';
import { useRouter } from 'next/router';
import { useRequest } from '../../../hooks/api';
import DeleteDialog from '../DeleteDialog';
import DefaultSelect, { SelectOnChange } from '../../Templates/DefaultSelect';
import { filterFns, NUMBER_FILTER, TIME_FILTER, SELECTED_ROWS } from '.';
import { YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT } from '../../../const/date';
import {
  REVIEWER_IDENTIFIER_JAPANESE,
  REVIEWER_IDENTIFIER_ENGLISH,
  CLEAN_SCORE_IDENTIFIER_JAPANESE,
  CLEAN_SCORE_IDENTIFIER_ENGLISH,
  SERVICE_SCORE_IDENTIFIER_JAPANESE,
  SERVICE_SCORE_IDENTIFIER_ENGLISH,
  LOCATION_SCORE_IDENTIFIER_JAPANESE,
  LOCATION_SCORE_IDENTIFIER_ENGLISH,
  FACILITY_SCORE_IDENTIFIER_JAPANESE,
  FACILITY_SCORE_IDENTIFIER_ENGLISH,
  FEE_SCORE_IDENTIFIER_JAPANESE,
  FEE_SCORE_IDENTIFIER_ENGLISH,
  CREATE_TIME_IDENTIFIER_JAPANESE,
  CREATE_TIME_IDENTIFIER_ENGLISH,
} from '../../../const/review';
import { INN_NAME_IDENTIFIER_JAPANESE, INN_NAME_IDENTIFIER_ENGLISH } from '../../../const/inn';
import type { ReservationReviewResponseData } from '../../../type/responseData/reservationReview';
import { deleteReview, getAllReviews, deleteBulkReviews } from '../../../utils/api/reservationReview';
import { useAuth } from '../../../hooks/auth';

type TableReview = {
  id: ReservationReviewResponseData['id'];
  innName: ReservationReviewResponseData['reservation']['inn']['name'];
  reviewer: ReservationReviewResponseData['reservation']['reserver']['name'];
  cleanScore: ReservationReviewResponseData['cleanScore'];
  serviceScore: ReservationReviewResponseData['serviceScore'];
  facilityScore: ReservationReviewResponseData['facilityScore'];
  communicationScore: ReservationReviewResponseData['communicationScore'];
  locationScore: ReservationReviewResponseData['locationScore'];
  checkInSupportScore: ReservationReviewResponseData['checkInSupportScore'];
  feeScore: ReservationReviewResponseData['feeScore'];
  createTime: ReservationReviewResponseData['createTime'];
};

const HEADER_TITLES = [
  {
    label: INN_NAME_IDENTIFIER_JAPANESE,
    value: INN_NAME_IDENTIFIER_ENGLISH,
  },
  {
    label: REVIEWER_IDENTIFIER_JAPANESE,
    value: REVIEWER_IDENTIFIER_ENGLISH,
  },
  {
    label: CLEAN_SCORE_IDENTIFIER_JAPANESE,
    value: CLEAN_SCORE_IDENTIFIER_ENGLISH,
  },
  {
    label: SERVICE_SCORE_IDENTIFIER_JAPANESE,
    value: SERVICE_SCORE_IDENTIFIER_ENGLISH,
  },
  {
    label: FACILITY_SCORE_IDENTIFIER_JAPANESE,
    value: FACILITY_SCORE_IDENTIFIER_ENGLISH,
  },
  {
    label: LOCATION_SCORE_IDENTIFIER_JAPANESE,
    value: LOCATION_SCORE_IDENTIFIER_ENGLISH,
  },
  {
    label: FEE_SCORE_IDENTIFIER_JAPANESE,
    value: FEE_SCORE_IDENTIFIER_ENGLISH,
  },
  {
    label: CREATE_TIME_IDENTIFIER_JAPANESE,
    value: CREATE_TIME_IDENTIFIER_ENGLISH,
  },
];
const HEADER_OTHER_TITLES_LENGTH = 2;
const HEADER_COLUMNS_LENGTH = HEADER_TITLES.length + HEADER_OTHER_TITLES_LENGTH;

const ReviewTable = function render() {
  const [searchedTextPlaceholder, setSearchedTextPlaceholder] = useState(HEADER_TITLES[0]?.label);
  const [headerColumn, setHeaderColumn] = useState(HEADER_TITLES[0]?.value || '');
  const [searchedText, setSearchedText] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [reviews, setReviews] = useState<TableReview[]>([]);
  const [selectedRow, setSelectedRow] = useState(SELECTED_ROWS[0]?.value || 1);

  const router = useRouter();
  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  // deleteReviewWrapper内部で使用されるため、事前に定義
  const getAllReviewsWrapper = async () => {
    if (!userId) throw new Error();

    const responseReviews = await getAllReviews(userId);
    setReviews(
      responseReviews.map((review) => ({
        id: review.id,
        innName: review.reservation.inn.name,
        reviewer: review.reservation.reserver.name,
        cleanScore: review.cleanScore,
        serviceScore: review.serviceScore,
        facilityScore: review.facilityScore,
        communicationScore: review.communicationScore,
        locationScore: review.locationScore,
        checkInSupportScore: review.checkInSupportScore,
        feeScore: review.feeScore,
        createTime: review.createTime,
      })),
    );
  };

  // セル内の削除ボタン押下時に処理される関数として設定されるため、セル描画前に定義
  const deleteReviewWrapper = async (id: number) => {
    await deleteReview(id);
    await getAllReviewsWrapper();
  };

  const columns: ColumnDef<TableReview>[] = [
    {
      id: 'select',
      header: ({ table }) => <Checkbox checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
    },
    {
      id: 'review',
      columns: [
        {
          accessorKey: INN_NAME_IDENTIFIER_ENGLISH,
          header: INN_NAME_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: REVIEWER_IDENTIFIER_ENGLISH,
          header: REVIEWER_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: CLEAN_SCORE_IDENTIFIER_ENGLISH,
          header: CLEAN_SCORE_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => `${getValue()}点`,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: SERVICE_SCORE_IDENTIFIER_ENGLISH,
          header: SERVICE_SCORE_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => `${getValue()}点`,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: FACILITY_SCORE_IDENTIFIER_ENGLISH,
          header: FACILITY_SCORE_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => `${getValue()}点`,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: LOCATION_SCORE_IDENTIFIER_ENGLISH,
          header: LOCATION_SCORE_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => `${getValue()}点`,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: FEE_SCORE_IDENTIFIER_ENGLISH,
          header: FEE_SCORE_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => `${getValue()}点`,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: CREATE_TIME_IDENTIFIER_ENGLISH,
          header: CREATE_TIME_IDENTIFIER_JAPANESE,
          cell: ({ getValue }) => dayJs(getValue()).format(YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT),
          filterFn: TIME_FILTER,
        },
      ],
    },
    {
      id: 'action',
      header: () => <div>アクション</div>,
      cell: ({ row }) => <DeleteDialog onDelete={() => deleteReviewWrapper(row.original.id)} dangerButtonClassName="p-2" label="削除" />,
    },
  ];

  const table = useReactTable<TableReview>({
    data: reviews,
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
    let searchedColumn: Column<TableReview, unknown> | undefined = table.getHeaderGroups()[0]?.headers[0]?.column;

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
      pathname: '/achievement/review/[id]',
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

    table.setPageSize(input);
  };

  const deleteBulkReviewsWrapper = async () => {
    const ids: number[] = [];
    table.getSelectedRowModel().rows.map((row) => {
      ids.push(row.original.id);
    });
    await deleteBulkReviews(ids);
    await getAllReviewsWrapper();
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    loadingRequest(getAllReviewsWrapper(), '取得中', '取得完了', '取得中にエラーが発生しました');

    // 初期化時に表示する各ページの列数を指定する
    table.setPageSize(selectedRow);
  }, [userId]);

  return (
    <div className="children:mb-5">
      <div className="flex justify-between">
        <div>
          <DefaultSelect value={headerColumn} onChange={handleChangeHeaderColumn} menuItems={HEADER_TITLES} className="w-60" />
          <DefaultTextField
            startAdornment={<AiOutlineSearch />}
            value={searchedText}
            onChange={handleChangeSearchedText}
            placeholder={`${searchedTextPlaceholder}を検索する`}
            className="w-80"
          />
        </div>
        <DeleteDialog label="選択したレビューの削除" onDelete={() => deleteBulkReviewsWrapper()} dangerButtonClassName="w-60" />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} size="small">
          <TableHead>
            {table.getHeaderGroups().map(
              (headerGroup) =>
                headerGroup.headers.length === HEADER_COLUMNS_LENGTH && (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) =>
                      header.column.id === CLEAN_SCORE_IDENTIFIER_ENGLISH ||
                      header.column.id === SERVICE_SCORE_IDENTIFIER_ENGLISH ||
                      header.column.id === FACILITY_SCORE_IDENTIFIER_ENGLISH ||
                      header.column.id === LOCATION_SCORE_IDENTIFIER_ENGLISH ||
                      header.column.id === FEE_SCORE_IDENTIFIER_ENGLISH ||
                      header.column.id === CREATE_TIME_IDENTIFIER_ENGLISH ? (
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
                {row.getVisibleCells().map((cell) =>
                  cell.column.columnDef.id === 'select' || cell.column.columnDef.id === 'action' ? (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ) : (
                    <TableCell key={cell.id} onClick={() => handleTableRowClick(row.original.id)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ),
                )}
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

export default ReviewTable;
