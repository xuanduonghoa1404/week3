import React from 'react';
import {useTable, usePagination} from 'react-table'
import styles from '/styles/Table.module.css';
import Pagination from "@material-ui/lab/Pagination";
// import Pagination from "./Pagination";

function TableLog({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0},
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <table className={styles.table} {...getTableProps()}>
                <thead className={styles.thead}>
                {headerGroups.map(headerGroup => (
                    <tr className={styles.tr} key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th className={styles.th}
                                key={column} {...column.getHeaderProps()}>{column.render('title')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className={styles.tbody} {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr className={styles.tr} key={i} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td className={styles.td}
                                           key={cell} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {/*<Pagination count={10} variant="outlined" shape="rounded" />*/}
            <div className={styles.pagination}>
                <button className={styles.buttonPagination} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                {' '}
                <button className={styles.buttonPagination} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                {' '}
                <button className={styles.buttonPagination} onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                {' '}
                <button className={styles.buttonPagination} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                &nbsp;
                <span>
              Page{' '}
                    <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            {/*    <span>*/}
            {/*  | Go to page:{' '}*/}
            {/*        <input*/}
            {/*            type="number"*/}
            {/*            defaultValue={pageIndex + 1}*/}
            {/*            onChange={e => {*/}
            {/*                const page = e.target.value ? Number(e.target.value) - 1 : 0*/}
            {/*                gotoPage(page)*/}
            {/*            }}*/}
            {/*            style={{width: '100px'}}*/}
            {/*        />*/}
            {/*</span>{' '}*/}
            {/*    <select*/}
            {/*        value={pageSize}*/}
            {/*        onChange={e => {*/}
            {/*            setPageSize(Number(e.target.value))*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {[10, 20, 30, 40, 50].map(pageSize => (*/}
            {/*            <option key={pageSize} value={pageSize}>*/}
            {/*                Show {pageSize}*/}
            {/*            </option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            </div>
        </>
    )
}

export default TableLog