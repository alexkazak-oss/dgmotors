export const CAR_STATUS_LABELS: Record<string, string> = {
	in_stock: 'В наличии',
	on_order: 'Под заказ',
	sold: 'Продано',
	reserved: 'Зарезервировано',
}

export const ENGINE_TYPE_LABELS: Record<string, string> = {
	petrol: 'Бензин',
	diesel: 'Дизель',
	electric: 'Электро',
	hybrid: 'Гибрид',
	phev: 'Плагин-гибрид',
}

export const DRIVETRAIN_LABELS: Record<string, string> = {
	fwd: 'Передний',
	rwd: 'Задний',
	awd: 'Полный',
}

export const TRANSMISSION_LABELS: Record<string, string> = {
	automatic: 'Автомат',
	manual: 'Механика',
	robot: 'Робот',
	cvt: 'Вариатор',
}

export const LEAD_TYPE_LABELS: Record<string, string> = {
	callback: 'Обратный звонок',
	contact: 'Контакт',
	car_inquiry: 'Запрос по авто',
	credit: 'Кредит',
	leasing: 'Лизинг',
}
