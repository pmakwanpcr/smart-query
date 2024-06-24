import React from "react";
import { pageRoutes } from "@/configs";
import { store } from "@/store";
import { handleAllFilter } from "@/store/toolkit/auth";
import Select from "react-select";
import ReactDynamicModal from "@/components/UI/ReactDynamicModal";
import { Icon } from "@iconify/react";
import { isEmpty } from "@/services/helper";
import { Table } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RunQueryModal = ({
	isModalOpen,
	queryName,
	setIsModalOpen,
	setSaveQueryModalOpen,
	filterGroupTableValue,
	handleAddFilterGroup,
	selectedOption,
	handleSort,
	sortGroupTableValue,
	displayedFields,
	handleFirstSelectChange,
	isSecondSelectDisabled,
	handleOutputFieldsClick,
	setIsFilterGroupOneModalOpen,
	setFilters,
	handleDeleteFilter,
	checkIfDate,
	setSortGroupModalOpen,
	setSortGroupFilter,
	setSortGroupTableValue,
	modalStyle,
	options,
	filterGroupOption,
}) => {
	const navigate = useNavigate();
	return (
		<ReactDynamicModal
			title={`Run query ${queryName ? `-` + " " + queryName : "*"}`}
			show={isModalOpen}
			className="run-query--modal"
			additionalStyle={modalStyle}
			onClose={() => {
				setIsModalOpen(false);
			}}
		>
			<div className="d-flex align-items-center justify-content-end button--wrap">
				<button
					type="button"
					onClick={() => setSaveQueryModalOpen(true)}
					disabled={filterGroupTableValue.length == 0 || queryName !== ""}
					className="font-10 text-capitalize btn btn-transparent text-light-black p-0"
				>
					save
				</button>
				<button
					type="button"
					onClick={() => {
						setIsFilterGroupOneModalOpen(true);
						handleAddFilterGroup();
					}}
					disabled={!selectedOption}
					className={`${selectedOption ? "bg-thme-black text-sec-theme-color" : "text-default-font-color"} font-10 border-0 text-capitalize  p-0`}
				>
					+filter
				</button>
				<button
					type="button"
					onClick={handleSort}
					disabled={!selectedOption}
					className={`${selectedOption ? "bg-thme-black text-sec-theme-color" : "text-default-font-color"} font-10 border-0 text-capitalize  p-0`}
				>
					+sort
				</button>
				<button
					type="button"
					className="bg-thme-black text-sec-theme-color font-10 border-0 text-capitalize p-0"
					disabled={queryName === ""}
					onClick={() => {
						setIsModalOpen(false);
						navigate(pageRoutes.smart_query_result);
						store.dispatch(
							handleAllFilter({
								selectedOption: { selectedOption },
								filterGroupTableValue: { filterGroupTableValue },
								sortGroupTableValue: { sortGroupTableValue },
								queryName: queryName,
								outputField: displayedFields,
							})
						);
					}}
				>
					run
				</button>
			</div>
			<div className="d-flex align-items-center content--box">
				<div className="w-50 run-query--select">
					<label className="font-10 text-capitalize text-dark-default-color d-block">data view</label>
					<Select options={options} value={options.find((item) => item.value == selectedOption?.value)} onChange={handleFirstSelectChange} />
				</div>
				<div className="w-50 run-query--select">
					<label className="font-10 text-capitalize text-dark-default-color d-block">output fields</label>
					<div
						className={`${isSecondSelectDisabled ? "disable--color" : ""} custom--select d-flex align-items-center`}
						onClick={handleOutputFieldsClick}
					>
						<div className={`${displayedFields.length > 0 ? "text-theme-color" : "text-default-font-color"}  font-11 text-capitalize text--value`}>
							{displayedFields.length > 0 ? displayedFields.map((field) => field.label).join(",") : "select..."}
						</div>
						<div className="icon--separator-wrap">
							<div className="separator--line bg-thme-black"></div>
							<Icon icon="mingcute:down-fill" className="d-block text-light-black font-20" />
						</div>
					</div>
				</div>
			</div>

			<div className="table--box-wrap">
				{!isEmpty(filterGroupTableValue?.flat()) && (
					<>
						{filterGroupTableValue?.flat()?.map((item, i) => {
							return (
								<React.Fragment key={i}>
									<div className="d-flex align-items-center justify-content-between">
										<h4 className="font-16">{item?.key}</h4>
										<div className="filter--btn-box d-flex align-items-center">
											<button
												type="button"
												className="border-0 btn btn-transparent p-0 d-block"
												onClick={() => {
													setIsFilterGroupOneModalOpen(true);
													setFilters([item]);
												}}
											>
												<Icon icon="ic:round-edit" className="d-block font-20" />
											</button>
											<button type="button" className="btn btn-transparent p-0 text-danger-color d-block" onClick={() => handleDeleteFilter(i)}>
												<Icon icon="material-symbols-light:delete-outline" className="d-block font-20" />
											</button>
										</div>
									</div>

									<Table striped bordered className="mb-0 filter--table align-middle">
										<thead>
											<tr>
												<th className="bg-light-black font-10 text-sec-theme-color"></th>
												<th className="bg-light-black font-10 text-sec-theme-color">Field Name</th>
												<th className="bg-light-black font-10 text-sec-theme-color">Operation</th>
												<th className="bg-light-black font-10 text-sec-theme-color">Value</th>
											</tr>
										</thead>
										<tbody>
											{item?.all_filter?.map((items, index) => {
												return (
													<tr key={index}>
														<td className="text-center text-theme-color font-10">{index == 0 ? "-" : item?.operation_value || "-"}</td>
														<td className="font-10 text-theme-color">{items?.fieldName}</td>
														<td className="font-10 text-theme-color">{items?.operation}</td>
														<td className="font-10 text-theme-color">
															{checkIfDate(items.filterValue)
																? moment(items?.filterValue, "YYYY-MM-DD").format("DD-MMM-YYYY").toUpperCase()
																: items?.filterValue}
														</td>
													</tr>
												);
											})}
										</tbody>
									</Table>

									{i < filterGroupTableValue.flat().length - 1 && (
										<div className="operation-filter--groups d-flex align-items-center justify-content-between" key={`${i}-extra`}>
											<div className="d-flex align-items-center operation-filter-inner">
												<Icon icon="fluent:arrow-sort-16-filled" className="d-block font-20" />
												<span className="font-9 d-block">Set Operation between filter groups</span>
											</div>
											<Select options={filterGroupOption} placeholder="Select" />
										</div>
									)}
								</React.Fragment>
							);
						})}
					</>
				)}
				{!isEmpty(sortGroupTableValue?.flat()) && (
					<>
						<div className="d-flex align-items-center justify-content-between sorting--button">
							<h4 className="font-16">Sort group</h4>
							<div className="filter--btn-box d-flex align-items-center">
								<button
									type="button"
									className="border-0 btn btn-transparent p-0 d-block"
									onClick={() => {
										setSortGroupModalOpen(true);

                                        setSortGroupFilter(sortGroupTableValue?.flat());
									}}
								>
									<Icon icon="ic:round-edit" className="d-block font-20" />
								</button>
								<button
									type="button"
									className="btn btn-transparent p-0 text-danger-color d-block"
									onClick={() => {
										setSortGroupTableValue([]);
										setSortGroupFilter([
											{
												fieldName: "",
												order: "",
											},
										]);
									}}
								>
									<Icon icon="material-symbols-light:delete-outline" className="d-block font-20" />
								</button>
							</div>
						</div>

						<Table striped bordered className="mb-0 filter--table align-middle">
							<thead>
								<tr>
									<th className="bg-light-black font-10 text-sec-theme-color">Field Name</th>
									<th className="bg-light-black font-10 text-sec-theme-color">order</th>
								</tr>
							</thead>
							<tbody>
								{sortGroupTableValue?.flat()?.map((item, i) => {
									return (
										<tr key={i}>
											<td className="font-10 text-theme-color">{item?.fieldName}</td>
											<td className="font-10 text-theme-color">{item?.order}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</>
				)}
			</div>
		</ReactDynamicModal>
	);
};

export default RunQueryModal;
