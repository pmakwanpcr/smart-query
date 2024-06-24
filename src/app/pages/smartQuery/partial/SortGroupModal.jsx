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
	handleSort,
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

	const handleSave = () => {
		const uniqueFilters = sortGroupFilter.filter(
			(filter, index, self) => index === self.findIndex((t) => t.fieldName === filter.fieldName && t.order === filter.order)
		);
		setSortGroupTableValue(uniqueFilters);
		setSortGroupModalOpen(false);
		setSortGroupFilter(uniqueFilters);
	};

	const handleChange = (index, key, value) => {
		const updatedFilters = sortGroupFilter.map((filter, i) => (i === index ? { ...filter, [key]: value } : filter));
		setSortGroupFilter(updatedFilters);
	};

	const handleDeleteFilter = (index) => {
		const updatedFilters = sortGroupFilter.filter((_, i) => i !== index);
		setSortGroupFilter(updatedFilters);
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
				<button type="button" className="font-10 text-capitalize text-light-black d-block btn btn-transparent p-0" onClick={handleSort}>
					+sort
				</button>
				<button
					type="button"
					className="bg-thme-black text-sec-theme-color border-0 font-10 text-capitalize d-block"
					onClick={handleSave}
					disabled={sortGroupFilter.some((item) => item.fieldName === "" || item.order === "")}
				>
					save
				</button>
			</div>

			{sortGroupFilter?.map((filter, index) => (
				<div key={index} className="d-flex align-items-end sort--group--content">
					<div className="content--box">
						<div className=" run-query--select">
							<label className="font-10 text-capitalize text-dark-default-color d-block">Field Name</label>
							<Select
								options={FieldNameoptions}
								onChange={(e) => handleChange(index, "fieldName", e?.value)}
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
								onChange={(e) => handleChange(index, "order", e?.value)}
								value={Operationoptions.find((item) => item.value === filter.order) || ""}
								placeholder="Select"
							/>
						</div>
					</div>
					<button
						type="button"
						className="p-0 btn btn-transparent border-0 text-danger-color"
						onClick={() => handleDeleteFilter(index)}
						disabled={sortGroupFilter.length === 1}
					>
						<Icon icon="material-symbols-light:delete-outline" className="d-block font-29" />
					</button>
				</div>
			))}
		</ReactDynamicModal>
	);
};

export default ShortGroupModal;
