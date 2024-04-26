import React, { useReducer } from "react";
import RangeInput from "./components/RangeInput";
import InputDisplay from "./components/InputDisplay";
function App() {
	const applyFloatFormatting = (num) => {
		return Math.round((parseFloat(num) + Number.EPSILON) * 100) / 100;
	};

	const paramsReducer = (state, action) => {
		switch (action.type) {
			case "WORK_DAY":
				let currentWorkDays = action.value;
				return {
					...state,
					workDays: currentWorkDays,
					hourlyRate: applyFloatFormatting(state.monthlySalary / (currentWorkDays * state.workHours * 4)),
					monthlySalary: applyFloatFormatting(currentWorkDays * state.workHours * state.hourlyRate * 4),
					yearlySalary: applyFloatFormatting(state.monthlySalary * 12),
				};
			case "WORK_HOUR":
				let currentWorkHour = action.value;
				return {
					...state,
					workHours: currentWorkHour,
					hourlyRate: state.hourlyRate,
					monthlySalary: applyFloatFormatting(state.workDays * currentWorkHour * state.hourlyRate * 4),
					yearlySalary: applyFloatFormatting(state.monthlySalary * 12),
				};
			case "HOURLY_RATE":
				let currentHourlyRates = action.value;
				return {
					...state,
					hourlyRate: currentHourlyRates,
					monthlySalary: applyFloatFormatting(state.workDays * state.workHours * currentHourlyRates * 4),
					yearlySalary: applyFloatFormatting(state.monthlySalary * 12),
				};
			case "MONTHLY_SALARY":
				let currentMonthlySalary = action.value;
				return {
					...state,
					hourlyRate: applyFloatFormatting(currentMonthlySalary / (state.workDays * state.workHours * 4)),
					monthlySalary: currentMonthlySalary,
					yearlySalary: applyFloatFormatting(currentMonthlySalary * 12),
				};
			case "YEARLY_SALARY":
				let currentYearlySalary = action.value;
				return {
					...state,
					hourlyRate: applyFloatFormatting(currentYearlySalary / 12 / (state.workDays * state.workHours * 4)),
					monthlySalary: applyFloatFormatting(currentYearlySalary / 12),
					yearlySalary: currentYearlySalary,
				};
			default:
				return state;
		}
	};

	const defaultParameters = {
		workDays: 5,
		workHours: 8,
		hourlyRate: 35,
		monthlySalary: 5600,
		yearlySalary: 67200,
	};
	const [parameters, dispatch] = useReducer(paramsReducer, defaultParameters);
	return (
		<>
			<main className="container mx-auto py-6">
				<div className="w-full flex flex-col justify-center items-center">
					<div className="md:w-1/2 w-11/12 mb-6">
						<h1 className="text-4xl font-bold text-center mb-4">Dynamic wages calculator</h1>
						<p className="text-center">Plug in your values below to calculate your wages at different scale</p>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Work Days" value={parameters.workDays} min={1} step={1} max={7} onChange={(value) => dispatch({ type: "WORK_DAY", value: value })} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={parameters.workDays} onChange={(value) => dispatch({ type: "WORK_DAY", value: value })} />
						</div>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Work Hours" value={parameters.workHours} min={1} step={1} max={24} onChange={(value) => dispatch({ type: "WORK_HOUR", value: value })} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={parameters.workHours} onChange={(value) => dispatch({ type: "WORK_HOUR", value: value })} />
						</div>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Hourly Rate" value={parameters.hourlyRate} min={1} max={1000} onChange={(value) => dispatch({ type: "HOURLY_RATE", value: value })} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={parameters.hourlyRate} symbol="$" onChange={(value) => dispatch({ type: "HOURLY_RATE", value: value })} />
						</div>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Monthly Salary" value={parameters.monthlySalary} min={1} max={100000} onChange={(value) => dispatch({ type: "MONTHLY_SALARY", value: value })} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={parameters.monthlySalary} symbol="$" onChange={(value) => dispatch({ type: "MONTHLY_SALARY", value: value })} />
						</div>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Yearly Salary" value={parameters.yearlySalary} min={1} max={1000000} onChange={(value) => dispatch({ type: "YEARLY_SALARY", value: value })} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={parameters.yearlySalary} symbol="$" onChange={(value) => dispatch({ type: "YEARLY_SALARY", value: value })} />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
