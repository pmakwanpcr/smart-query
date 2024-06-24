import React from "react";

const DatePickerUi = ({
	error,
	onChange,
	label,
	name,
	value,
	lable,
	fRef,
	className = "d-block w-100 font14",
	min,
	max,
	classLabel = "",
	selected,
	onKeyDownAllow,
	placeholder,
	tabIndex,
	minDate,
	onKeyDown,
	previousDateDisabled = false,
	...rest
}) => {
	return (
		<div className={`dynamic--date-picker ${className}`}>
			{label && <label className={`date--picker-title text-capitalize ${classLabel}`}>{label}</label>}
			<input
				style={{
					cursor: "pointer",
				}}
				ref={fRef}
				type="date"
				name={name}
				value={value}
				placeholder={placeholder}
				className="date--picker-input bg-transparent is-invalid"
				max="9999-12-31"
				onChange={onChange}
				tabIndex={tabIndex}
				{...rest}
				maxLength={8}
			/>
		</div>
	);
};

export default DatePickerUi;
