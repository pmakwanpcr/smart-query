import React, { useEffect, useState } from "react";
import ReactDynamicModal from "@/components/UI/ReactDynamicModal";
import { Icon } from "@iconify/react";

const modalStyle = {
	content: {
		maxWidth: "360px",
	},
};

const SaveQueryModal = ({ isSaveQueryModalOpen, setQueryName, queryName, setSaveQueryModalOpen }) => {
	const [saveQueryName, setSaveQueryName] = useState("");
	useEffect(() => {
		if (queryName !== null) {
			setSaveQueryName(queryName);
		}
	}, [queryName]);
	return (
		<ReactDynamicModal
			show={isSaveQueryModalOpen}
			title="Save Query"
			className="save--query--modal"
			additionalStyle={modalStyle}
			onClose={() => {
				setSaveQueryModalOpen(false);
			}}
		>
			<div className="button--box">
				<button
					type="button"
					className="theme--btn border-0 font-10 text-capitalize text-sec-theme-color ms-auto d-block"
					onClick={() => {
						setQueryName(saveQueryName);
						setSaveQueryModalOpen(false);
					}}
				>
					Save
				</button>
			</div>
			<div className="save--query-content">
				<div className="save--query-inner-content d-flex align-items-center">
					<span className="d-block text-danger-color">*</span>
					<h4 className="font-10 text-dark-default-color mb-0">Query Name</h4>
					<Icon icon="eva:question-mark-circle-fill" className="d-block fon-12 text-dark-default-color" />
				</div>
				<input
					type="text"
					className="sort--query--input font-11 text-theme-color"
					onChange={(e) => setSaveQueryName(e?.target?.value)}
					value={saveQueryName}
				/>
			</div>
		</ReactDynamicModal>
	);
};

export default SaveQueryModal;
