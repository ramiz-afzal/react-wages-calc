import React, { useEffect, useState } from "react";
import RangeInput from "./components/RangeInput";
import InputDisplay from "./components/InputDisplay";
function App() {
	const [workDays, setWorkDays] = useState(5);
	const [workHours, setWorkHours] = useState(8);
	const [hourlyRate, setHourlyRate] = useState(35);
	const [monthlySalary, setMonthlySalary] = useState(5600);
	const [yearlySalary, setYearlySalary] = useState(67200);

	const applyFloatFormatting = (num) => {
		return Math.round((parseFloat(num) + Number.EPSILON) * 100) / 100;
	};

	useEffect(() => {
		setHourlyRate(applyFloatFormatting(monthlySalary / (workDays * workHours * 4)));
	}, [workDays, workHours]);

	useEffect(() => {
		setMonthlySalary(applyFloatFormatting(workDays * workHours * hourlyRate * 4));
	}, [hourlyRate]);

	useEffect(() => {
		setYearlySalary(applyFloatFormatting(monthlySalary * 12));
	}, [monthlySalary]);
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
							<RangeInput label="Work Days" value={workDays} min={1} step={1} max={7} onChange={(value) => setWorkDays(value)} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={workDays} onChange={(value) => setWorkDays(value)} />
						</div>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Work Hours" value={workHours} min={1} step={1} max={24} onChange={(value) => setWorkHours(value)} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={workHours} onChange={(value) => setWorkHours(value)} />
						</div>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Hourly Rate" value={hourlyRate} min={1} onChange={(value) => setHourlyRate(value)} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={hourlyRate} symbol="$" onChange={(value) => setHourlyRate(value)} />
						</div>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Monthly Salary" value={monthlySalary} min={1} onChange={(value) => setMonthlySalary(value)} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={monthlySalary} symbol="$" onChange={(value) => setMonthlySalary(value)} />
						</div>
					</div>

					<div className="md:w-1/2 w-11/12 flex flex-row gap-3 mb-6">
						<div className="basis-3/4">
							<RangeInput label="Yearly Salary" value={yearlySalary} min={1} onChange={(value) => setYearlySalary(value)} />
						</div>
						<div className="basis-1/4 flex justify-center items-center">
							<InputDisplay value={yearlySalary} symbol="$" onChange={(value) => setYearlySalary(value)} />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
