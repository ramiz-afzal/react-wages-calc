import React, { useEffect, useState } from "react";

export const RangeInput = ({ value = 0, min = 1, max = null, step = 1, label = "Range Input", onChange }) => {
	const [elementId] = useState(Date.now());
	const [rangeValue, setRangeValue] = useState(value);
	const [minValue, setMinValue] = useState(min || 1);
	const [maxValue, setMaxValue] = useState(max);
	const [rangeStep, setRangeStep] = useState(step || 1);
	const [labelText, setLabelText] = useState(label);

	useEffect(() => {
		if (value) {
			setRangeValue(parseInt(value));
		}
		if (min) {
			setMinValue(parseInt(min));
		}
		if (max) {
			setMaxValue(parseInt(max));
		}
		if (step) {
			setRangeStep(parseInt(step));
		}
		if (label) {
			setLabelText(label);
		}
	}, [value, min, max, step, label]);

	const onValueChange = (e) => {
		setRangeValue(parseInt(e.target.value || min));

		if (onChange && typeof onChange === "function") {
			onChange(parseInt(e.target.value || min));
		}
	};

	return (
		<div className="block relative pb-6">
			<label htmlFor={elementId} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				{labelText}
			</label>
			<input id={elementId} type="range" value={rangeValue} step={rangeStep} min={minValue} max={maxValue} onChange={onValueChange} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"></input>
			{minValue ? <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-1">Min ({minValue})</span> : ""}
			{maxValue ? <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-1">Max ({maxValue})</span> : ""}
		</div>
	);
};

export default RangeInput;
