import React from "react";

const ReactChekbox = ({ id, label, value, onChange, dataAll, checked, className = "", disabled = false }) => {
	return (
		<>
			<label htmlFor={id} className={`checkbox-wrapper ${className}`}>
				<input
					type="checkbox"
					name="form-check"
					id={id}
					value={value}
					label={label}
					data-all={dataAll}
					onChange={onChange}
					checked={checked}
					disabled={disabled}
				/>
				<span className="checkmark d-block"></span>
				<span className="label ms-2 font13">{label}</span>
			</label>
		</>
	);
};

export default ReactChekbox;
