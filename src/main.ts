import express from "express";
import ParkingLotRepositoryDatabase from "./ParkedCarRepositoryDatabase";
import ParkingLotService from "./ParkingLotService";
const app = express();
app.use(express.json());

const parkingLotRepository = new ParkingLotRepositoryDatabase();
const parkingLotService = new ParkingLotService(parkingLotRepository);

app.post("/checkin", async function (req, res) {
	await parkingLotService.checkin(req.body.plate, new Date(req.body.checkinDate));
	res.end();
});

app.post("/checkout", async function (req, res) {
	await parkingLotService.checkout(req.body.plate, new Date(req.body.checkoutDate));
	res.end();
});

app.get("/parked_cars/:plate", async function (req, res) {
	const parkedCar = await parkingLotService.getParkedCar(req.params.plate);
	if (parkedCar) {
		res.json(parkedCar);
	} else {
		res.status(404).end();
	}
});

app.listen(3000);
