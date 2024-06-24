import ReactDynamicModal from "@/components/UI/ReactDynamicModal";
import { Icon } from "@iconify/react";
import React from "react";
import Select from "react-select";

const modalStyle = {
	content: {
		maxWidth: "648px",
	},
};

const ShortGroupModal = ({
	isSortGroupModalOpen,
	setSortGroupFilter,
	sortGroupFilter,
	setSortGroupModalOpen,
	setSortGroupTableValue,
	sortGroupTableValue,
}) => {
	const FieldNameoptions = [
		{ value: "RawPositionId", label: "RawPositionId" },
		{ value: "AccountName", label: "AccountName" },
		{ value: "AccountNumber", label: "AccountNumber" },
		{ value: "AccountType", label: "AccountType" },
	];

	const Operationoptions = [
		{ value: "Ascending", label: "ascending" },
		{ value: "Decending", label: "decending" },
	];

	const handleChange = (groupIndex, filterIndex, field, value) => {
		setSortGroupFilter((prevFilters) => {
			const updatedFilters = [...prevFilters];
			updatedFilters[groupIndex] = {
				...updatedFilters[groupIndex],
				all_filter: updatedFilters[groupIndex].all_filter.map((filter, index) => (index === filterIndex ? { ...filter, [field]: value } : filter)),
			};
			return updatedFilters;
		});
	};

	const handleDeleteFilter = (index) => {
		const updatedFilters = sortGroupFilter.map((items) => {
			return { ...items, all_filter: items.all_filter.filter((_, i) => i !== index) };
		});

		setSortGroupFilter(updatedFilters);
	};

	const handleSave = () => {
		const updatedFilterGroups = sortGroupTableValue.map((group) => {
			const existingGroup = sortGroupFilter.find((filterGroup) => filterGroup.key === group.key);
			if (existingGroup) {
				return { ...existingGroup };
			} else {
				return group;
			}
		});

		sortGroupFilter.forEach((newGroup) => {
			if (!sortGroupTableValue.some((group) => group.key === newGroup.key)) {
				updatedFilterGroups.push({ ...newGroup });
			}
		});
		setSortGroupTableValue(updatedFilterGroups);
		setSortGroupModalOpen(false);
	};

	const handleAddFilter = () => {
		setSortGroupFilter((prev) =>
			prev?.map((item) => {
				return {
					...item,
					all_filter: [
						...item.all_filter,
						{
							fieldName: "",
							operation: "",
						},
					],
				};
			})
		);
	};
	return (
		<ReactDynamicModal
			show={isSortGroupModalOpen}
			additionalStyle={modalStyle}
			title="Sort Group"
			className="filter--group"
			onClose={() => {
				setSortGroupModalOpen(false);
			}}
		>
			<div className="d-flex justify-content-end button--wrap">
				<button
					type="button"
					className="font-10 text-capitalize text-light-black d-block btn btn-transparent p-0"
					onClick={handleAddFilter}
				>
					+sort
				</button>
				<button
					type="button"
					className="bg-thme-black text-sec-theme-color border-0 font-10 text-capitalize d-block"
					onClick={handleSave}
					disabled={sortGroupFilter.every((item) => item.fieldName === "" && item.order === "")}
				>
					save
				</button>
			</div>

			{sortGroupFilter.map((filterGroup, groupIndex) =>
				filterGroup?.all_filter?.map((filter, filterIndex) => {
					return (
						<div key={groupIndex + "-" + filterIndex} className="d-flex align-items-end sort--group--content">
							<div className="content--box">
								<div className=" run-query--select">
									<label className="font-10 text-capitalize text-dark-default-color d-block">Field Name</label>
									<Select
										options={FieldNameoptions}
										onChange={(e) => handleChange(groupIndex, filterIndex, "fieldName", e?.value)}
										value={FieldNameoptions.find((item) => item.value === filter.fieldName) || ""}
										placeholder="Select"
									/>
								</div>
							</div>
							<div className="content--box">
								<div className=" run-query--select">
									<label className="font-10 text-capitalize text-dark-default-color d-block">Operation</label>
									<Select
										options={Operationoptions}
										onChange={(e) => handleChange(groupIndex, filterIndex, "operation", e?.value)}
										value={Operationoptions.find((item) => item.value === filter.operation) || ""}
										placeholder="Select"
									/>
								</div>
							</div>
							<button
								type="button"
								className="p-0 btn btn-transparent border-0 text-danger-color"
								onClick={() => handleDeleteFilter(filterIndex)}
								disabled={sortGroupFilter.some((item) => item.all_filter.length == 1)}
							>
								<Icon icon="material-symbols-light:delete-outline" className="d-block font-29" />
							</button>
						</div>
					);
				})
			)}
		</ReactDynamicModal>
	);
};

export default ShortGroupModal;
