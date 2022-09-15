drop table branas.parked_car;

create table branas.parked_car (
	id serial primary key,
	plate text not null,
	checkin_date timestamp default now(),
	checkout_date timestamp null,
	price numeric null default 0
);
