import ReactTable from "@/components/UI/table/ReactTable";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import RunQueryModal from "./partial/RunQueryModal";
import { useNavigate } from "react-router-dom";
import FilterGroupOneModal from "./partial/FilterGroupOneModal";
import SaveQueryModal from "./partial/SaveQueryModal";
import ShortGroupModal from "./partial/SortGroupModal";
import OutputFieldModal from "./partial/OutputFieldModal";
import { useSelector } from "react-redux";

const options = [
	{ value: "CUST_RAW_POSITIONS", label: "CUST_RAW_POSITIONS" },
	{ value: "CUST_RAW_TRANSACTIONS", label: "CUST_RAW_TRANSACTIONS" },
];

const modalStyle = {
	content: {
		maxWidth: "674px",
	},
};
const outputFieldsData = [
	{ id: "RawPositionID", label: "RawPositionID" },
	{ id: "AccountName", label: "AccountName" },
	{ id: "AccountNumber", label: "AccountNumber" },
	{ id: "AccountType", label: "AccountType" },
	{ id: "AccruedInterestBase", label: "AccruedInterestBase" },
	{ id: "AccruedInterestLocal", label: "AccruedInterestLocal" },
	{ id: "AcquisitionDate", label: "AcquisitionDate" },
	{ id: "Label1", label: "Label" },
	{ id: "Label2", label: "Label" },
];

	const columns = [
		{
			accessor: "row_position_id",
			Header: "RowPositionId",
		},
		{
			accessor: "account_name",
			Header: "accountName",
		},
		{
			accessor: "account_number",
			Header: "accountNumber",
		},
		{
			accessor: "account_type",
			Header: "Account Type",
		},
		{
			accessor: "accured_interest_base",
			Header: "AccuredInterestBase",
		},
		{
			accessor: "accured_interest_local",
			Header: "AccuredInterestLocal",
		},
		{
			accessor: "acquisition_date",
			Header: "AcquisitionDate",
		},
	];

	const datas = [
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
		{
			row_position_id: "Label",
			account_name: "Label",
			account_number: "Label",
			account_type: "Label",
			accured_interest_base: "Label",
			accured_interest_local: "Label",
			acquisition_date: "Label",
		},
	];

const SmartQueryResultTable = () => {

			const [isModalOpen, setIsModalOpen] = useState(false);
			const [isSecondSelectDisabled, setIsSecondSelectDisabled] = useState(true);
			const [isFilterGroupOneModalOpen, setIsFilterGroupOneModalOpen] = useState(false);
			const [isOutputFields, setIsOutputFields] = useState(false);
			const [isSortGroupModalOpen, setSortGroupModalOpen] = useState(false);
			const [isSaveQueryModalOpen, setSaveQueryModalOpen] = useState(false);
			const [selectedOption, setSelectOption] = useState(null);
			const [filterGroupTableValue, setFilterGroupTableValue] = useState([]);
			const [queryName, setQueryName] = useState("");
			const [sortGroupTableValue, setSortGroupTableValue] = useState([]);
			const [groupOneFilter, setGroupOneFilter] = useState({
				selectAndOr: "",
				fieldName: "",
				operation: "",
				filterValue: "",
			});
			const [selectedFields, setSelectedFields] = useState(
				outputFieldsData.reduce((acc, field) => {
					acc[field.id] = true;
					return acc;
				}, {})
			);
			const [selectAll, setSelectAll] = useState(true);
			const [displayedFields, SetDisplayedFieds] = useState([]);
			const all_filter_value = useSelector((state) => state.auth?.all_filter);
			const [sortGroupFilter, setSortGroupFilter] = useState([
				{
					fieldName: "",
					order: "",
				},
			]);

		
			const initialFilterState = [
				{
					key: "",
					all_filter: [{ fieldName: "", operation: "", filterValue: "" }],
				},
			];

			const initialSortFilterState = [
				{
					key: "",
					all_filter: [{ fieldName: "", operation: "" }],
				},
			];

			const [filters, setFilters] = useState([]);

			const handleFirstSelectChange = (selectedOption) => {
				setSelectOption(selectedOption);
				setIsSecondSelectDisabled(false);
			};

			const handleOutputFieldsClick = () => {
				if (!isSecondSelectDisabled) {
					setIsOutputFields(true);
				}
			};

			const handleSelectAll = () => {
				const newSelectAll = !selectAll;
				const newSelectedFields = outputFieldsData.reduce((acc, field) => {
					acc[field.id] = newSelectAll;
					return acc;
				}, {});
				setSelectedFields(newSelectedFields);
				setSelectAll(newSelectAll);
			};

			const handleCheckboxChange = (id) => {
				setSelectedFields((prevState) => {
					const newSelectedFields = { ...prevState, [id]: !prevState[id] };
					setSelectAll(Object.values(newSelectedFields).every((value) => value));
					return newSelectedFields;
				});
			};

			const handleAddFilterGroup = () => {
				const newFilterGroup = {
					key: `Filter Group ${filterGroupTableValue.length + 1}`,
					all_filter: [
						{
							fieldName: "",
							operation: "",
							filterValue: "",
						},
					],
				};
				setFilters([newFilterGroup]);
			};

			const handleAddSortFilter = () => {
				const newFilterGroup = {
					key: `Sort Group ${sortGroupTableValue.length + 1}`,
					all_filter: [
						{
							fieldName: "",
							operation: "",
						},
					],
				};
				setSortGroupFilter([newFilterGroup]);
			};

			const handleSort = () => {
				setSortGroupModalOpen(true);
				handleAddSortFilter();
			};

			const handleDeleteFilter = (index) => {
				const updatedFilters = filterGroupTableValue.filter((_, i) => i !== index);
				setFilters(updatedFilters);
				setFilterGroupTableValue(updatedFilters);
			};

				const handleDeleteFilters = (index) => {
					const updatedFilters = sortGroupTableValue.filter((_, i) => i !== index);
					setSortGroupFilter(updatedFilters);
					setSortGroupTableValue(updatedFilters);
				};

			const handleSubmit = () => {
				const selected = outputFieldsData.filter((field) => selectedFields[field.id]);
				SetDisplayedFieds(selected);
				setIsOutputFields(false);
			};

			const checkIfDate = (value) => {
				const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
				if (!dateRegex.test(value)) {
					return false;
				}
				const date = new Date(value);
				return !isNaN(date.getTime());
			};

			useEffect(() => {
				if (all_filter_value) {
					if (all_filter_value?.filterGroupTableValue?.filterGroupTableValue.length > 0) {
						setFilterGroupTableValue(all_filter_value.filterGroupTableValue?.filterGroupTableValue);
					}
					if (all_filter_value?.sortGroupTableValue?.sortGroupTableValue?.length > 0) {
						setSortGroupTableValue(all_filter_value.sortGroupTableValue?.sortGroupTableValue);
					}
					if (all_filter_value?.selectedOption?.selectedOption) {
						setSelectOption(all_filter_value.selectedOption?.selectedOption);
					}
					if (all_filter_value?.queryName) {
						setQueryName(all_filter_value.queryName);
					}
					if (all_filter_value?.outputField) {
						SetDisplayedFieds(all_filter_value.outputField);
						setIsSecondSelectDisabled(false);
					}
				}
			}, [all_filter_value]);

			


    
	return (
		<>
			<section className="samrt--section bg-theme-bg">
				<div className="smart-query--inner bg-static-white">
					<div className="d-flex align-items-center justify-content-between title--box">
						<h3 className="text-theme-color mb-0 text-capitalize font-19">Smart Query Results</h3>
						<div className="d-flex justify-content-end align-items-center smart-query--result-btn">
							<button
								type="button"
								className="btn btn-transparent p-0 d-block rounded-0"
								onClick={() => {
									setIsModalOpen(true);
								}}
							>
								<Icon icon="typcn:filter" className="d-block font-20" />
							</button>
							<button type="button" className="btn btn-transparent p-0 d-block rounded-0">
								<Icon icon="mdi:microsoft-word" className="d-block font-20" />
							</button>
						</div>
					</div>
					<div className="smart--query-result-table">
						<ReactTable columns={columns} data={datas} />
					</div>
				</div>
			</section>

			{/* Run query Modal <------- */}
			{isModalOpen && (
				<RunQueryModal
					isModalOpen={isModalOpen}
					queryName={queryName}
					setIsModalOpen={setIsModalOpen}
					setSaveQueryModalOpen={setSaveQueryModalOpen}
					filterGroupTableValue={filterGroupTableValue}
					handleAddFilterGroup={handleAddFilterGroup}
					selectedOption={selectedOption}
					handleSort={handleSort}
					sortGroupTableValue={sortGroupTableValue}
					displayedFields={displayedFields}
					handleFirstSelectChange={handleFirstSelectChange}
					isSecondSelectDisabled={isSecondSelectDisabled}
					handleOutputFieldsClick={handleOutputFieldsClick}
					setIsFilterGroupOneModalOpen={setIsFilterGroupOneModalOpen}
					setFilters={setFilters}
					handleDeleteFilter={handleDeleteFilter}
					checkIfDate={checkIfDate}
					setSortGroupModalOpen={setSortGroupModalOpen}
					setSortGroupFilter={setSortGroupFilter}
					modalStyle={modalStyle}
					options={options}
					handleDeleteFilters={handleDeleteFilters}
				/>
			)}
			{/* Run query Modal <------- */}

			{/* Select Output Fields <------- */}
			{isOutputFields && (
				<OutputFieldModal
					isOutputFields={isOutputFields}
					setIsOutputFields={setIsOutputFields}
					handleSubmit={handleSubmit}
					selectAll={selectAll}
					handleSelectAll={handleSelectAll}
					outputFieldsData={outputFieldsData}
					selectedFields={selectedFields}
					handleCheckboxChange={handleCheckboxChange}
				/>
			)}
			{/* Select Output Fields <------- */}

			{/* Open Short-Group Modal <------- */}
			{isSortGroupModalOpen && (
				<ShortGroupModal
					setSortGroupFilter={setSortGroupFilter}
					sortGroupFilter={sortGroupFilter}
					isSortGroupModalOpen={isSortGroupModalOpen}
					setSortGroupModalOpen={setSortGroupModalOpen}
					setSortGroupTableValue={setSortGroupTableValue}
					initialSortFilterState={initialSortFilterState}
					sortGroupTableValue={sortGroupTableValue}
				/>
			)}
			{/* Open Short-Group Modal <------- */}

			{/* Open Query Modal <------- */}
			{isSaveQueryModalOpen && (
				<SaveQueryModal
					setQueryName={setQueryName}
					selectedOption={selectedOption}
					isSaveQueryModalOpen={isSaveQueryModalOpen}
					setSaveQueryModalOpen={setSaveQueryModalOpen}
					queryName={queryName}
				/>
			)}
			{/* Open Query Modal <------- */}

			{/* Open Filter-Group-One Modal <------- */}
			{isFilterGroupOneModalOpen && (
				<FilterGroupOneModal
					setFilterGroupTableValue={setFilterGroupTableValue}
					filterGroupTableValue={filterGroupTableValue}
					setIsFilterGroupOneModalOpen={setIsFilterGroupOneModalOpen}
					isFilterGroupOneModalOpen={isFilterGroupOneModalOpen}
					setGroupOneFilter={setGroupOneFilter}
					groupOneFilter={groupOneFilter}
					filters={filters}
					setFilters={setFilters}
					initialFilterState={initialFilterState}
				/>
			)}
			{/* End Filter-Group-One Modal <------- */}
		</>
	);
};

export default SmartQueryResultTable;
