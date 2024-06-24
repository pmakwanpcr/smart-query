import ReactDynamicModal from "@/components/UI/ReactDynamicModal";
import React from "react";

const modalStyle = {
	content: {
		maxWidth: "360px",
	},
};

const OutputFieldModal = ({
	isOutputFields,
	setIsOutputFields,
	handleSubmit,
	selectAll,
	handleSelectAll,
	outputFieldsData,
	handleCheckboxChange,
	selectedFields,
}) => {
	return (
		<ReactDynamicModal
			show={isOutputFields}
			title="Select Output Fields"
			className="output--fields"
			additionalStyle={modalStyle}
			onClose={() => {
				setIsOutputFields(false);
			}}
		>
			<div className="button--box">
				<button type="button" className="theme--btn border-0 font-10 text-capitalize text-sec-theme-color ms-auto d-block" onClick={handleSubmit}>
					submit
				</button>
			</div>
			<div className="checkbox--list">
				<div className="checkbox--single-all-check">
					<label htmlFor="input--check" className="d-flex align-items-center font-12 text-theme-color text-capitalize">
						<input type="checkbox" name="form--box" id="input--check" checked={selectAll} onChange={handleSelectAll} />
						<span className="checkmark"></span>
						select all
					</label>
				</div>
				{outputFieldsData.map((field) => (
					<div key={field.id} className="checkbox--single">
						<label htmlFor={field.id} className="d-flex align-items-center font-12 text-theme-color text-capitalize">
							<input type="checkbox" id={field.id} checked={selectedFields[field.id]} onChange={() => handleCheckboxChange(field.id)} />
							<span className="checkmark"></span>
							{field.label}
						</label>
					</div>
				))}
			</div>
		</ReactDynamicModal>
	);
};

export default OutputFieldModal;
