import "./App.css";
import React, { useState, useEffect } from "react";
import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

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
		setCountry(countryCode);
	};

	return (
		<div className="app">
			<div class="app__left">
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

				<div class="app__stats">
					<InfoBox title="Coronavirus Cases" cases={111} total={2000} />
					<InfoBox title="Recovered" cases={111} total={2000} />
					<InfoBox title="Deaths" cases={111} total={2000} />
				</div>
				<Map />
			</div>
			<Card class="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>

					<h3>Worldwide new cases</h3>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
