import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "react-bootstrap";

const Textinput = ({
	icon,
	label,
	name,
	type,
	value,
	error,
	onChange,
	onBlur,
	onClick,
	id,
	className = "",
	placeholder,
	isButton = false,
	children,
	maxLength,
	disabled,
	tabIndex,
	fref,
	onKeyPress,
	inputClassName,
	defaultValue,
	buttonClass,
	min,
	accept,
	inputMode,
	max,
}) => {
	return (
		<div className={`floating-label-content ${className}`}>
			{label && (
				<label htmlFor={id}>
					<Icon icon={icon} />
					{label ? label : "Add label"}
				</label>
			)}
			<input
				ref={fref}
				className={`form-control ${inputClassName}`}
				id={id}
				name={name}
				type={type}
				value={value}
				inputMode={inputMode}
				onBlur={onBlur}
				onChange={onChange}
				maxLength={maxLength}
				placeholder={placeholder}
				disabled={disabled}
				tabIndex={tabIndex}
				onKeyPress={onKeyPress}
				defaultValue={defaultValue}
				min={min}
				max={max}
				accept={accept}
			/>

			{isButton === true ? (
				<Button variant="transparent" size="sm" className={` ${buttonClass}`} onClick={onClick}>
					{children}
				</Button>
			) : (
				children
			)}
		</div>
	);
};

export default Textinput;
