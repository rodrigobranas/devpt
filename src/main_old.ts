import express from "express";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

const parkedCars: { plate: string, checkinDate: Date, checkoutDate?: Date }[] = [];
const connection = pgp()("postgres://postgres:123456@localhost:5432/app");

app.post("/checkin", async function (req, res) {
	// parkedCars.push({ plate: req.body.plate, checkinDate: new Date(req.body.checkinDate) });
	await connection.query("insert into branas.parked_car (plate, checkin_date) values ($1, $2)", [req.body.plate, req.body.checkinDate]);
	res.end();
});

app.post("/checkout", async function (req, res) {
	await connection.query("update branas.parked_car set checkout_date = $1 where plate = $2", [new Date(req.body.checkoutDate), req.body.plate]);
	const [parkedCar] = await connection.query("select * from branas.parked_car where plate = $1", [req.body.plate]);
	const diff = parkedCar.checkout_date.getTime() - parkedCar.checkin_date.getTime();
	const period = diff/(1000*60*60);
	const price = period * 10;
	await connection.query("update branas.parked_car set price = $1 where plate = $2", [price, req.body.plate]);
	// const parkedCar = parkedCars.find(parkedCar => parkedCar.plate === req.body.plate);
	// if (parkedCar) {
	// 	parkedCar.checkoutDate = new Date(req.body.checkoutDate);
	// }
	res.end();
});

app.get("/parked_cars/:plate", async function (req, res) {
	// const parkedCar = parkedCars.find(parkedCar => parkedCar.plate === req.params.plate);
	const [parkedCar] = await connection.query("select * from branas.parked_car where plate = $1", [req.params.plate]);
	if (parkedCar) {
		res.json(parkedCar);
	} else {
		res.status(404).end();
	}
});

app.listen(3000);
