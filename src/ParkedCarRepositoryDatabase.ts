import ParkedCar from "./ParkedCar";
import ParkedCarRepository from "./ParkedCarRepository";
import pgp from "pg-promise";

export default class ParkingLotRepositoryDatabase implements ParkedCarRepository {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	}

	async get(plate: string): Promise<ParkedCar> {
		const [parkedCarData] = await this.connection.query("select * from branas.parked_car where plate = $1", [plate]);
		const parkedCar = new ParkedCar(parkedCarData.plate, parkedCarData.checkin_date);
		parkedCar.checkoutDate = parkedCarData.checkout_date;
		parkedCar.price = parseFloat(parkedCarData.price);
		return parkedCar;
	}

	async save(parkedCar: ParkedCar): Promise<void> {
		await this.connection.query("insert into branas.parked_car (plate, checkin_date) values ($1, $2)", [parkedCar.plate, parkedCar.checkinDate]);
	}

	async update(parkedCar: ParkedCar): Promise<void> {
		await this.connection.query("update branas.parked_car set checkout_date = $1, price = $2 where plate = $3", [parkedCar.checkoutDate, parkedCar.price, parkedCar.plate]);
	}

}
