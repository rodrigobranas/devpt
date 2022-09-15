import ParkedCar from "../src/ParkedCar";

test("Deve testar um carro estacionado", function () {
	const parkedCar = new ParkedCar("asdfgh123546", new Date("2021-03-10T10:00:00-03:00"));
	parkedCar.checkout(new Date("2021-03-10T12:00:00-03:00"));
	expect(parkedCar.price).toBe(20);
});
