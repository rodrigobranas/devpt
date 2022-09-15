import ParkingLotRepositoryDatabase from "../src/ParkedCarRepositoryDatabase";
import ParkingLotService from "../src/ParkingLotService";

test("Deve sair um carro no estacionamento", async function () {
	const plate = Math.random().toString(36).slice(2, 7);
	const parkingLotRepositoryDatabase = new ParkingLotRepositoryDatabase();
	const parkingLotService = new ParkingLotService(parkingLotRepositoryDatabase);
	await parkingLotService.checkin(plate, new Date("2021-03-10T10:00:00-03:00"));
	await parkingLotService.checkout(plate, new Date("2021-03-10T12:00:00-03:00"));
	const parkedCar = await parkingLotService.getParkedCar(plate);
	expect(parkedCar.price).toBe(20);
});
