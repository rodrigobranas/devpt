import axios from "axios";
// given, when, then
test("Deve entrar um carro no estacionamento", async function () {
	const plate = Math.random().toString(36).slice(2, 7);
	await axios({
		url: "http://localhost:3000/checkin",
		method: "post",
		data: {
			plate,
			checkinDate: "2021-03-10T10:00:00-03:00"
		}
	});
	const response = await axios({
		url: `http://localhost:3000/parked_cars/${plate}`,
		method: "get"
	});
	const parkedCar = response.data;
	expect(parkedCar.plate).toBe(plate);
});

test("Deve sair um carro no estacionamento", async function () {
	const plate = Math.random().toString(36).slice(2, 7);
	await axios({
		url: "http://localhost:3000/checkin",
		method: "post",
		data: {
			plate,
			checkinDate: "2021-03-10T10:00:00-03:00"
		}
	});
	await axios({
		url: "http://localhost:3000/checkout",
		method: "post",
		data: {
			plate,
			checkoutDate: "2021-03-10T12:00:00-03:00"
		}
	});
	const response = await axios({
		url: `http://localhost:3000/parked_cars/${plate}`,
		method: "get"
	});
	const parkedCar = response.data;
	expect(parkedCar.price).toBe(20);
});
