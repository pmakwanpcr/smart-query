import React from "react";

const pageSizes = [
	{
		label: "5 rows",
		value: 5,
	},
	{
		label: "10 rows",
		value: 10,
	},
	{
		label: "20 rows",
		value: 20,
	},
	{
		label: "25 rows",
		value: 25,
	},
	{
		label: "50 rows",
		value: 50,
	},
	{
		label: "100 rows",
		value: 100,
	},
];

export default function ReactPaginate({ activePage, pageSize, onPageSizeChange, onPageChange, pageCount }) {
	return (
		<div className="pagination-bottom">
			<div className="pagination d-flex align-items-stretch justify-content-between">
				<div className="previous">
					<button
						type="button"
						disabled={activePage == 1}
						className="page--btn text-default-font-color border-0 font-9 text-capitalize"
						onClick={() => {
							onPageChange((prev) => prev - 1);
						}}
					>
						Previous
					</button>
				</div>
				<div className="center d-flex align-items-center justify-content-around">
					<span className="pageInfo font-9 text-capitalize">
						page
						<div className="pageJump">
							<input type="number" defaultValue={activePage} onBlur={(e) => onPageChange(e.target.value)} className="font-9" />
						</div>
						of <span className="totalPages">{pageCount}</span>
					</span>
					<span className="select--wrap pageSizeOptions">
						<select value={pageSize} onChange={(e) => onPageSizeChange(e.target.value)} className="font-9 text-theme-color">
							{pageSizes.map((pageSize) => (
								<option key={pageSize.value} value={pageSize.value}>
									{pageSize.label}
								</option>
							))}
						</select>
					</span>
				</div>
				<div className="next">
					<button
						type="button"
						disabled={activePage == pageCount}
						className="page--btn text-default-font-color border-0 font-9 text-capitalize"
						onClick={() => {
							onPageChange((prev) => prev + 1);
						}}
					>
						next
					</button>
				</div>
			</div>
			<span className="total--recode font-10 d-block text-center text-default-font-color text-capitalize">17 Total Records</span>
		</div>
	);
}
