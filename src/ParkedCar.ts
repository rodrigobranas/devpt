export default class ParkedCar {
	checkoutDate?: Date;
	price = 0;

	constructor (readonly plate: string, readonly checkinDate: Date) {
	}

	checkout (checkoutDate: Date) {
		this.checkoutDate = checkoutDate;
		const diff = this.checkoutDate.getTime() - this.checkinDate.getTime();
		const period = diff/(1000*60*60);
		this.price = period * 10;
	}
}
