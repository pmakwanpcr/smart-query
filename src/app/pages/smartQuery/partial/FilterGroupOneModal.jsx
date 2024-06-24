import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ReactDynamicModal from "@/components/UI/ReactDynamicModal";
import Select from "react-select";

const modalStyle = {
	content: {
		maxWidth: "648px",
	},
};

const FilterGroupOneModal = ({
	isFilterGroupOneModalOpen,
	setFilterGroupTableValue,
	filterGroupTableValue,
	setIsFilterGroupOneModalOpen,
	filters,
	setFilters,
}) => {
	const [operationValues, setOperationValues] = useState("");
	const FieldNameoptions = [
		{ value: "AccountName", label: "AccountName", type: "text" },
		{ value: "AccountNumber", label: "AccountNumber", type: "number" },
		{ value: "AcquisitionDate", label: "AcquisitionDate", type: "date" },
	];
	const filterGroupOption = [
		{ value: "AND", label: "AND" },
		{ value: "OR", label: "OR" },
	];
	const Operationoptions = [
		{ value: "NOT NULL", label: "notnull" },
		{ value: "NULL", label: "null" },
		{ value: "-", label: "-" },
		{ value: ">=", label: ">=" },
		{ value: ">", label: ">" },
		{ value: "<=", label: "<=" },
	];

	const handleChange = (groupIndex, filterIndex, field, value) => {
		setFilters((prevFilters) => {
			const updatedFilters = [...prevFilters];
			updatedFilters[groupIndex] = {
				...updatedFilters[groupIndex],
				all_filter: updatedFilters[groupIndex].all_filter.map((filter, index) => (index === filterIndex ? { ...filter, [field]: value } : filter)),
			};
			return updatedFilters;
		});
	};

	const handleDeleteFilter = (index) => {
		const updatedFilters = filters.map((items) => {
			return { ...items, all_filter: items.all_filter.filter((_, i) => i !== index) };
		});

		setFilters(updatedFilters);
	};

	const handleSave = () => {
		const updatedFilterGroups = filterGroupTableValue.map((group) => {
			const existingGroup = filters.find((filterGroup) => filterGroup.key === group.key);
			if (existingGroup) {
				return { ...existingGroup, operation_value: typeof operationValues == "object" ? operationValues?.value : operationValues }; // Replace existing group with updated one
			} else {
				return group;
			}
		});

		filters.forEach((newGroup) => {
			if (!filterGroupTableValue.some((group) => group.key === newGroup.key)) {
				updatedFilterGroups.push({ ...newGroup });
			}
		});
		setFilterGroupTableValue(updatedFilterGroups);
	};

	const handleAddFilter = () => {
		setFilters((prev) =>
			prev?.map((item) => {
				return {
					...item,
					all_filter: [
						...item.all_filter,
						{
							fieldName: "",
							operation: "",
							filterValue: "",
						},
					],
				};
			})
		);
	};

	useEffect(() => {
		if (filters.length > 0) {
			if (filters[0]?.operation_value) {
				const _val = filterGroupOption.find((item) => item.value == filters[0]?.operation_value || "");
				setOperationValues(_val);
			}
		}
	}, [filters]);

	return (
		<ReactDynamicModal
			show={isFilterGroupOneModalOpen}
			size="lg"
			title={` ${filters[0]?.key}`}
			className="filter--group"
			additionalStyle={modalStyle}
			onClose={() => {
				setIsFilterGroupOneModalOpen(false);
			}}
		>
			<div className="d-flex align-items-center justify-content-between filter--modal-content">
				<div className="run-query--main--select">
					<Select
						placeholder="Select AND/OR"
						onChange={(e) => setOperationValues(e?.value)}
						isDisabled={filterGroupTableValue.length == 0}
						value={filterGroupOption.find((item) => operationValues.value == item.value)}
						options={filterGroupOption}
						notShowSelectText={true}
						isClearable
					/>
				</div>
				<div className="d-flex align-items-center justify-content-end button--box ">
					<button
						type="button"
						className="font-10 btn btn-transparent text-capitalize text-light-black p-0"
						onClick={() => {
							setIsFilterGroupOneModalOpen(true);
							handleAddFilter();
						}}
					>
						+filter
					</button>
					<button
						type="button"
						className={`${
							filters.every((item) => item?.all_filter.every((items) => items.fieldName == "" || items.operation == "" || items.filterValue == ""))
								? "text-default-font-color "
								: "text-sec-theme-color bg-thme-black"
						} font-10 border-0 text-capitalize text-default-font-color p-0`}
						onClick={() => {
							handleSave();
							setIsFilterGroupOneModalOpen(false);
						}}
						disabled={filters.every((item) =>
							item?.all_filter.every((items) => items.fieldName == "" || items.operation == "" || items.filterValue == "")
						)}
					>
						save
					</button>
				</div>
			</div>

			{filters.map((filterGroup, groupIndex) => {
				return (
					<React.Fragment key={groupIndex}>
						{filterGroup?.all_filter?.map((filter, filterIndex) => {
							const selectedField = FieldNameoptions.find((item) => item.value === filter.fieldName);
							const inputType = selectedField ? selectedField.type : "text";
							return (
								<div key={groupIndex + "-" + filterIndex} className="filter--group--one">
									<div className="filer--single-group">
										<div className="run-query--select">
											<label className="font-10 text-capitalize text-dark-default-color d-block">Field Name</label>
											<Select
												options={FieldNameoptions}
												onChange={(e) => handleChange(groupIndex, filterIndex, "fieldName", e?.value)}
												value={FieldNameoptions.find((item) => item.value === filter.fieldName) || ""}
												placeholder="Select"
											/>
										</div>
										<div className="run-query--select">
											<label className="font-10 text-capitalize text-dark-default-color d-block">Operation</label>
											<Select
												options={Operationoptions}
												onChange={(e) => handleChange(groupIndex, filterIndex, "operation", e?.value)}
												value={Operationoptions.find((item) => item.value === filter.operation) || ""}
												placeholder="Select"
												isDisabled={!filter.fieldName}
											/>
										</div>
										<div className="run-query--select">
											<label className="font-10 text-capitalize text-dark-default-color d-block">Filter Value</label>
											<input
												type={inputType}
												onChange={(e) => handleChange(groupIndex, filterIndex, "filterValue", e.target.value)}
												value={filter.filterValue || ""}
												className="w-100 filter--input font-11"
												disabled={!filter.operation}
											/>
										</div>
										<button
											type="button"
											className="p-0 btn btn-transparent border-0 text-danger-color"
											disabled={filters.some((item) => item.all_filter.length == 1)}
											onClick={() => handleDeleteFilter(filterIndex)}
										>
											<Icon icon="material-symbols-light:delete-outline" className="d-block font-29" />
										</button>
									</div>
								</div>
							);
						})}
					</React.Fragment>
				);
			})}
		</ReactDynamicModal>
	);
};

export default FilterGroupOneModal;
