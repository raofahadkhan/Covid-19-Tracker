import "./App.css";
import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
function App() {
	const [country, setCountry] = useState("worldwide");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					setCountries(countries);
				});
		};

		getCountriesData();
	}, []);

	const onCountryChange = (event) => {
		const countryCode = event.target.value;

		console.log(countryCode);

		setCountry(countryCode);
	};

	return (
		<div className="app">
			<div class="app__header">
				<h1>COVID-19 TRACKER</h1>
				<FormControl class="app__dropdown">
					<Select variant="outlined" onChange={onCountryChange} value={country}>
						<MenuItem value="worldwide">Worldwide</MenuItem>
						{countries.map((country) => (
							<MenuItem value={country.value}>{country.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		</div>
	);
}

export default App;
