import { IconButton } from '@mui/material';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { ChangeEvent, useState } from 'react';
import DefaultSelect, { SelectOnChange } from '../DefaultSelect';
import type { Table } from '@tanstack/react-table';
import DefaultTextField from '../../Parts/DefaultTextField';

const SELECTED_ROWS = [
  {
    label: 5,
    value: 5,
  },
  {
    label: 10,
    value: 10,
  },
  {
    label: 20,
    value: 20,
  },
];

const TablePagination = function render<TableData>({ table }: { table: Table<TableData> }) {
  const [selectedRow, setSelectedRow] = useState(SELECTED_ROWS[0]?.value || 1);

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

  return (
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
      {`${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()} ページ`}
      <DefaultTextField
        type="number"
        defaultValue={table.getState().pagination.pageIndex + 1}
        onChange={handleChangePage}
        className="w-16"
      />
      ページに行く
      <DefaultSelect value={selectedRow} onChange={handleChangeSelectedRow} menuItems={SELECTED_ROWS} />
      行表示する
    </div>
  );
};

export default TablePagination;
