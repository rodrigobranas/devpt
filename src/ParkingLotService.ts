import ParkedCar from "./ParkedCar";
import ParkedCarRepository from "./ParkedCarRepository";

export default class ParkingLotService {
	connection: any;

	constructor (readonly parkedCarRepository: ParkedCarRepository) {
	}

	async checkin (plate: string, checkinDate: Date) {
		const parkedCar = new ParkedCar(plate, checkinDate);
		await this.parkedCarRepository.save(parkedCar);
	}

	async checkout (plate: string, checkoutDate: Date) {
		const parkedCar = await this.parkedCarRepository.get(plate);
		parkedCar.checkout(checkoutDate);
		await this.parkedCarRepository.update(parkedCar);
	}

	async getParkedCar (plate: string) {
		const parkedCar = await this.parkedCarRepository.get(plate);
		return parkedCar;
	}
}
