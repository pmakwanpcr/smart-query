import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { pageRoutes } from "@/configs";
import { useNavigate } from "react-router-dom";
import ReactTable from "@/components/UI/table/ReactTable";
import FilterGroupOneModal from "./partial/FilterGroupOneModal";
import SaveQueryModal from "./partial/SaveQueryModal";
import ShortGroupModal from "./partial/SortGroupModal";
import OutputFieldModal from "./partial/OutputFieldModal";
import { useSelector } from "react-redux";
import RunQueryModal from "./partial/RunQueryModal";
import { store } from "@/store";
import { handleRemoveFilter } from "@/store/toolkit/auth";

const columns = [
	{
		accessor: "column_1",
		Header: "",
	},
	{
		accessor: "column_2",
		Header: "",
	},
	{
		accessor: "name",
		Header: "Name",
	},
	{
		accessor: "data_view",
		Header: "Data View",
	},
	{
		accessor: "last_run_date",
		Header: "Last Run Date",
	},
	{
		accessor: "last_results",
		Header: "Last Results",
	},
	{
		accessor: "created_by",
		Header: "Created By",
	},
	{
		accessor: "creation_date",
		Header: "Creation Date",
	},
];

const options = [
	{ value: "CUST_RAW_POSITIONS", label: "CUST_RAW_POSITIONS" },
	{ value: "CUST_RAW_TRANSACTIONS", label: "CUST_RAW_TRANSACTIONS" },
];

const filterGroupOption = [
	{ value: "and", label: "AND" },
	{ value: "or", label: "OR" },
];

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

const modalStyle = {
	content: {
		maxWidth: "674px",
	},
};

const SmartQuery = () => {
	const navigate = useNavigate();
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

	const data = [
		{
			column_1: (
				<button type="button" className="btn btn-transparent p-0 d-block mx-auto" onClick={() => navigate(pageRoutes.smart_query_result)}>
					<Icon icon="gridicons:play" className="font-16 d-block" />
				</button>
			),
			column_2: (
				<button
					type="button"
					className="btn btn-transparent p-0 d-block mx-auto"
					onClick={() => {
						setIsModalOpen(true);
					}}
				>
					<Icon icon="ic:baseline-edit" className="font-16 d-block" />
				</button>
			),
			name: all_filter_value?.queryName,
			data_view: all_filter_value?.selectedOption?.selectedOption?.value,
			last_run_date: "03-JAN-2024",
			last_results: "10,000",
			created_by: "Raman Singh",
			creation_date: "03-JAN-2024",
		},
	];

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

	// useEffect(() => {
	// 	store.dispatch(handleRemoveFilter());
	// }, []);

	return (
		<>
			<section className="samrt--section bg-theme-bg">
				<div className="smart-query--inner bg-static-white">
					<div className="d-flex align-items-center justify-content-between title--box">
						<h3 className="text-theme-color mb-0 text-capitalize font-19">Smart Query</h3>
						<button
							type="button"
							className="d-flex align-items-center justify-content-center border-0 font-10 text-capitalize text-sec-theme-color theme--btn"
							onClick={() => {
								setIsModalOpen(true);
							}}
						>
							<Icon icon="lucide:plus" className="d-block" /> New Query
						</button>
					</div>
					<div className="smart--query-table">
						<ReactTable columns={columns} data={all_filter_value == null ? [] : data} />
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
					filterGroupOption={filterGroupOption}
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

export default SmartQuery;
