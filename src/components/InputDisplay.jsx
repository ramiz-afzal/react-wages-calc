import React, { useEffect, useState } from "react";

const InputDisplay = ({ value = 0.0, symbol = "", onChange }) => {
	const applyFloatFormatting = (num) => {
		return Math.round((parseFloat(num) + Number.EPSILON) * 100) / 100;
	};

	const [displayValue, setDisplayValue] = useState(applyFloatFormatting(value) || 0.0);
	const [isEditing, setIsEditing] = useState(false);

	const toggleEditMode = (state) => {
		setIsEditing(state === true ? true : false);
	};

	const onValueChange = (e) => {
		setDisplayValue(applyFloatFormatting(e.target.value));
		if (onChange && typeof onChange === "function") {
			onChange(parseInt(e.target.value || 0));
		}
	};

	const onKeyDown = (e) => {
		let inputKey = String(e.key).toLowerCase() || null;
		if (inputKey === "enter") {
			toggleEditMode(false);
		}
	};

	useEffect(() => {
		if (value) {
			setDisplayValue(applyFloatFormatting(value));
		}
	}, [value]);
	return (
		<p className="w-full border rounded text-center text-lg leading-none py-4 px-6 flex items-center">
			{symbol ? <span>{symbol}</span> : ""}
			{isEditing ? (
				<input className="w-full focus:ring-slate-200 outline-none border-0 rounded text-center text-lg leading-none p-0 ml-2" type="number" value={value} autoFocus={true} onBlur={() => toggleEditMode(false)} onKeyDown={onKeyDown} onChange={onValueChange}></input>
			) : (
				<span className="w-full" onClick={() => toggleEditMode(true)}>
					{displayValue}
				</span>
			)}
		</p>
	);
};

export default InputDisplay;
