import ParkedCar from "./ParkedCar";

export default interface ParkedCarRepository {
	get (plate: string): Promise<ParkedCar>;
	save (parkedCar: ParkedCar): Promise<void>;
	update (parkedCar: ParkedCar): Promise<void>;
}
