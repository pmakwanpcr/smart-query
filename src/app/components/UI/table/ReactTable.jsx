import React, { useState } from "react";
import { useTable, usePagination } from "react-table";
import { Table } from "react-bootstrap";
import { isDefined } from "@/services/helper";

const ReactTable = ({ columns, data, isLoading }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 }, // Start on the first page
		},
		usePagination
	);

	return (
		<div className="table-section">
			<Table responsive bordered striped className="w-100 mb-0 align-middle" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr key={index} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, i) => (
								<th key={i} className="text-start text-capitalize text-sec-theme-color bg-light-black font-10">
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{isLoading ? (
						<tr>
							<td colSpan={columns.length}>Loading...</td>
						</tr>
					) : page.length > 0 ? (
						page.map((row, i) => {
							prepareRow(row);
							return (
								<tr key={i} {...row.getRowProps()}>
									{row.cells.map((cell, i) => (
										<td key={i} {...cell.getCellProps()} className="text-start text-capitalize font-10">
											{cell.render("Cell")}
										</td>
									))}
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={columns.length} className="text-center font-10">Record not found</td>
						</tr>
					)}
				</tbody>
				{isDefined(columns) && isDefined(columns[0].Footer) && (
					<tfoot>
						{footerGroups.map((footerGroup, index) => (
							<tr key={index} {...footerGroup.getFooterGroupProps()}>
								{footerGroup.headers.map((column, i) => (
									<th key={i} {...column.getFooterProps()} className="text-start text-capitalize">
										{column.render("Footer")}
									</th>
								))}
							</tr>
						))}
					</tfoot>
				)}
			</Table>
			<div className="pagination-bottom">
				<div className="pagination d-flex align-items-stretch justify-content-between">
					<div className="previous">
						<button
							type="button"
							disabled={!canPreviousPage}
							className="page--btn text-default-font-color border-0 font-9 text-capitalize"
							onClick={() => previousPage()}
						>
							Previous
						</button>
					</div>
					<div className="center d-flex align-items-center justify-content-around">
						<span className="pageInfo font-9 text-capitalize">
							Page
							<div className="pageJump">
								<input
									type="number"
									defaultValue={pageIndex + 1}
									onBlur={(e) => {
										const page = e.target.value ? Number(e.target.value) - 1 : 0;
										gotoPage(page);
									}}
									className="font-9"
								/>
							</div>
							of <span className="totalPages">{pageCount}</span>
						</span>
						<span className="select--wrap pageSizeOptions">
							<select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="font-9 text-theme-color">
								{[5, 10, 20, 25, 50, 100].map((size) => (
									<option key={size} value={size}>
										{size} rows
									</option>
								))}
							</select>
						</span>
					</div>
					<div className="next">
						<button
							type="button"
							disabled={!canNextPage}
							className="page--btn text-default-font-color border-0 font-9 text-capitalize"
							onClick={() => nextPage()}
						>
							Next
						</button>
					</div>
				</div>
				<span className="total--record font-10 d-block text-center text-default-font-color text-capitalize">{data.length} Total Records</span>
			</div>
		</div>
	);
};

export default ReactTable;
