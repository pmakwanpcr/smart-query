import { helper } from "@/services";
import React from "react";
import Select from "react-select";

const ReactSelect = ({
	placeholder,
	className = "",
	name,
	value,
	error,
	onChange,
	register,
	options,
	defaultValue,
	isClearable = false,
	fRef,
	label,
	isSearchable,
	tabIndex,
	disabled,
	notShowSelectText = false,
}) => {
	let selectedValues = helper.isDefined(options)
		? options.find((e) => {
				return value == e.value;
		  })
		: null;

	if (helper.isDefined(options) && typeof options[0] != "object") {
		options = options.map((_value) => {
			return {
				label: _value,
				value: _value,
			};
		});
	}

	if (notShowSelectText == true) {
		options;
	} else {
		options = [
			{
				label: placeholder ? placeholder : "Select...",
				value: "",
			},
			...options,
		];
	}

	return (
		<>
			{name && (
				<>
					{label && <label>{label}</label>}
					<Select
						className={`custom-select ${className}`}
						options={options}
						name={name}
						id="hh"
						placeholder={placeholder}
						onChange={(e) => {
							onChange({
								target: {
									name,
									value: e?.value,
								},
							});
						}}
						value={selectedValues}
						defaultValue={defaultValue}
						register={register}
						error={error}
						backspaceRemovesValue={true}
						isDisabled={disabled}
						escapeClearsValue={true}
						isClearable={isClearable}
						ref={fRef}
						isSearchable={isSearchable}
						theme={(theme) => ({
							...theme,
							borderRadius: "10px",
							colors: {
								...theme.colors,
								primary25: "#f4f5fa",
								primary: "#2e37a4",
							},
						})}
						tabIndex={tabIndex}
					/>
				</>
			)}

			{!name && (
				<>
					{label && <label>{label}</label>}
					<Select
						className={`custom-select ${className}`}
						options={options}
						id="hh"
						placeholder={placeholder}
						backspaceRemovesValue={true}
						escapeClearsValue={true}
						isClearable={isClearable}
						onChange={onChange}
						value={selectedValues}
						defaultValue={defaultValue}
						name={name}
						register={register}
						error={error}
						ref={fRef}
						isDisabled={disabled}
						isSearchable={isSearchable}
						theme={(theme) => ({
							...theme,
							borderRadius: "10px",
							colors: {
								...theme.colors,
								primary25: "#f4f5fa",
								primary: "#2e37a4",
							},
						})}
						tabIndex={tabIndex}
					/>
				</>
			)}
		</>
	);
};

export default ReactSelect;
