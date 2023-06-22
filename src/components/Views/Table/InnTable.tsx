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
import { useRouter } from 'next/router';
import DeleteDialog from '../DeleteDialog';
import DefaultSelect, { SelectOnChange } from '../../Templates/DefaultSelect';
import { filterFns, NUMBER_FILTER, SELECTED_ROWS } from '.';
import { RouterButton } from '../../Parts/Button';
import {
  INN_NAME_IDENTIFIER_JAPANESE,
  INN_NAME_IDENTIFIER_ENGLISH,
  INN_FEE_IDENTIFIER_JAPANESE,
  INN_FEE_IDENTIFIER_ENGLISH,
  INN_STATUS_IDENTIFIER_JAPANESE,
  INN_STATUS_IDENTIFIER_ENGLISH,
  INN_TYPE_IDENTIFIER_JAPANESE,
  INN_TYPE_IDENTIFIER_ENGLISH,
  INN_ADDRESS_IDENTIFIER_JAPANESE,
  INN_ADDRESS_IDENTIFIER_ENGLISH,
  ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH,
  ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_JAPANESE,
  BEDROOM_NUMBER_IDENTIFIER_JAPANESE,
  BEDROOM_NUMBER_IDENTIFIER_ENGLISH,
  BED_NUMBER_IDENTIFIER_JAPANESE,
  BED_NUMBER_IDENTIFIER_ENGLISH,
  BATHROOM_NUMBER_IDENTIFIER_JAPANESE,
  BATHROOM_NUMBER_IDENTIFIER_ENGLISH,
} from '../../../const/inn';
import type { InnInnResponseData } from '../../../type/responseData/innInn';
import { getAllInns, deleteInn, deleteBulkInns } from '../../../utils/api/innInn';
import { useRequest } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';

type TableInn = {
  id: InnInnResponseData['id'];
  innName: InnInnResponseData['name'];
  fee: InnInnResponseData['fee'];
  status: InnInnResponseData['status']['name'];
  type: InnInnResponseData['type']['name'];
  address: InnInnResponseData['address'];
  guestNumber: InnInnResponseData['guestNumber'];
  bedroomNumber: InnInnResponseData['bedroomNumber'];
  bedNumber: InnInnResponseData['bedNumber'];
  bathroomNumber: InnInnResponseData['bathroomNumber'];
};

const HEADER_TITLES = [
  {
    label: INN_NAME_IDENTIFIER_JAPANESE,
    value: INN_NAME_IDENTIFIER_ENGLISH,
  },
  {
    label: INN_FEE_IDENTIFIER_JAPANESE,
    value: INN_FEE_IDENTIFIER_ENGLISH,
  },
  {
    label: INN_STATUS_IDENTIFIER_JAPANESE,
    value: INN_STATUS_IDENTIFIER_ENGLISH,
  },
  {
    label: INN_TYPE_IDENTIFIER_JAPANESE,
    value: INN_TYPE_IDENTIFIER_ENGLISH,
  },
  {
    label: INN_ADDRESS_IDENTIFIER_JAPANESE,
    value: INN_ADDRESS_IDENTIFIER_ENGLISH,
  },
  {
    label: ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_JAPANESE,
    value: ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH,
  },
  {
    label: BEDROOM_NUMBER_IDENTIFIER_JAPANESE,
    value: BEDROOM_NUMBER_IDENTIFIER_ENGLISH,
  },
  {
    label: BED_NUMBER_IDENTIFIER_JAPANESE,
    value: BED_NUMBER_IDENTIFIER_ENGLISH,
  },
  {
    label: BATHROOM_NUMBER_IDENTIFIER_JAPANESE,
    value: BATHROOM_NUMBER_IDENTIFIER_ENGLISH,
  },
];
const HEADER_OTHER_TITLES_LENGTH = 2;
const HEADER_COLUMNS_LENGTH = HEADER_TITLES.length + HEADER_OTHER_TITLES_LENGTH;

const InnTable = function render() {
  const [searchedTextPlaceholder, setSearchedTextPlaceholder] = useState(HEADER_TITLES[0]?.label);
  const [headerColumn, setHeaderColumn] = useState(HEADER_TITLES[0]?.value || '');
  const [searchedText, setSearchedText] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [inns, setInns] = useState<TableInn[]>([]);
  const [selectedRow, setSelectedRow] = useState(SELECTED_ROWS[0]?.value || 1);

  const router = useRouter();
  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  // deleteInnWrapper内で使用されるため、事前に宣言
  const getAllInnsWrapper = async () => {
    if (!userId) throw new Error();

    const responseInns = await getAllInns(userId);
    setInns(
      responseInns.map((inn) => ({
        id: inn.id,
        innName: inn.name,
        fee: inn.fee,
        status: inn.status.name,
        type: inn.type.name,
        address: inn.address,
        guestNumber: inn.guestNumber,
        bedroomNumber: inn.bedroomNumber,
        bedNumber: inn.bedNumber,
        bathroomNumber: inn.bathroomNumber,
      })),
    );
  };

  // セル内の削除ボタン押下時に処理される関数として設定されるため、セル描画前に定義
  const deleteInnWrapper = async (id: number) => {
    await deleteInn(id);
    await getAllInnsWrapper();
  };

  const columns: ColumnDef<TableInn>[] = [
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
          accessorKey: INN_FEE_IDENTIFIER_ENGLISH,
          header: INN_FEE_IDENTIFIER_JAPANESE,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: INN_STATUS_IDENTIFIER_ENGLISH,
          header: INN_STATUS_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: INN_TYPE_IDENTIFIER_ENGLISH,
          header: INN_TYPE_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: INN_ADDRESS_IDENTIFIER_ENGLISH,
          header: INN_ADDRESS_IDENTIFIER_JAPANESE,
        },
        {
          accessorKey: ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH,
          header: ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_JAPANESE,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: BEDROOM_NUMBER_IDENTIFIER_ENGLISH,
          header: BEDROOM_NUMBER_IDENTIFIER_JAPANESE,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: BED_NUMBER_IDENTIFIER_ENGLISH,
          header: BED_NUMBER_IDENTIFIER_JAPANESE,
          filterFn: NUMBER_FILTER,
        },
        {
          accessorKey: BATHROOM_NUMBER_IDENTIFIER_ENGLISH,
          header: BATHROOM_NUMBER_IDENTIFIER_JAPANESE,
          filterFn: NUMBER_FILTER,
        },
      ],
    },
    {
      id: 'action',
      header: () => <div>アクション</div>,
      cell: ({ row }) => (
        <div className="flex">
          <DeleteDialog onDelete={() => deleteInnWrapper(row.original.id)} label="削除" dangerButtonClassName="mr-2 p-2" />
          <RouterButton className="p-2" href={`/inn/edit/${row.original.id}`} label="編集" />
        </div>
      ),
    },
  ];

  const table = useReactTable<TableInn>({
    data: inns,
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
    let searchedColumn: Column<TableInn, unknown> | undefined = table.getHeaderGroups()[1]?.headers[1]?.column;

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
      pathname: '/inn/edit/[id]',
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

  const deleteBulkInnsWrapper = async () => {
    const ids: number[] = [];
    table.getSelectedRowModel().rows.map((row) => {
      ids.push(row.original.id);
    });
    await deleteBulkInns(ids);
    await getAllInnsWrapper();
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    loadingRequest(getAllInnsWrapper(), '取得中', '取得完了', '取得中にエラーが発生しました');

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
        <div>
          <RouterButton className="mr-2 w-60" label="宿泊施設の追加" href="/inn/add" />
          <DeleteDialog label="選択した宿泊施設の削除" dangerButtonClassName="w-60" onDelete={() => deleteBulkInnsWrapper()} />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} size="small">
          <TableHead>
            {table.getHeaderGroups().map(
              (headerGroup) =>
                headerGroup.headers.length === HEADER_COLUMNS_LENGTH && (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) =>
                      header.column.id === INN_FEE_IDENTIFIER_ENGLISH ||
                      header.column.id === ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH ||
                      header.column.id === BEDROOM_NUMBER_IDENTIFIER_ENGLISH ||
                      header.column.id === BED_NUMBER_IDENTIFIER_ENGLISH ||
                      header.column.id === BATHROOM_NUMBER_IDENTIFIER_ENGLISH ? (
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

export default InnTable;
