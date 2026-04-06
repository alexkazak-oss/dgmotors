import type {CollectionConfig} from 'payload'
import {isAdminOrPublished} from '../access'
import {publishedField, seoFields, slugField} from '../fields'

export const Cars: CollectionConfig = {
	slug: 'cars',
	labels: {singular: 'Автомобиль', plural: 'Автомобили'},
	admin: {
		useAsTitle: 'title',
		defaultColumns: [
			'title',
			'brand',
			'model',
			'price',
			'status',
			'isPublished',
		],
	},
	access: {
		read: isAdminOrPublished,
	},
	fields: [
		{
			name: 'title',
			label: 'Название',
			type: 'text',
			required: true,
		},
		slugField,
		{
			name: 'brand',
			label: 'Бренд',
			type: 'relationship',
			relationTo: 'brands',
			required: true,
			hasMany: false,
		},
		{
			name: 'model',
			label: 'Модель',
			type: 'relationship',
			relationTo: 'models',
			required: true,
			hasMany: false,
			filterOptions: ({data}) => {
				if (data?.brand) {
					return {brand: {equals: data.brand}}
				}
				return true
			},
		},
		{
			name: 'price',
			label: 'Цена',
			type: 'number',
			required: true,
			min: 0,
		},
		{
			name: 'oldPrice',
			label: 'Старая цена',
			type: 'number',
			min: 0,
		},
		{
			name: 'status',
			label: 'Статус',
			type: 'select',
			required: true,
			defaultValue: 'in_stock',
			options: [
				{label: 'В наличии', value: 'in_stock'},
				{label: 'Под заказ', value: 'on_order'},
				{label: 'Продано', value: 'sold'},
				{label: 'Зарезервировано', value: 'reserved'},
			],
		},
		{
			name: 'vin',
			label: 'VIN',
			type: 'text',
			admin: {position: 'sidebar'},
		},
		{
			name: 'stockNumber',
			label: 'Складской номер',
			type: 'text',
			admin: {position: 'sidebar'},
		},
		// Specifications
		{
			name: 'specifications',
			label: 'Характеристики',
			type: 'group',
			fields: [
				{name: 'year', type: 'number', label: 'Год'},
				{name: 'mileage', type: 'number', min: 0, label: 'Пробег (км)'},
				{
					name: 'engineType',
					label: 'Тип двигателя',
					type: 'select',
					options: [
						{label: 'Бензин', value: 'petrol'},
						{label: 'Дизель', value: 'diesel'},
						{label: 'Электро', value: 'electric'},
						{label: 'Гибрид', value: 'hybrid'},
						{label: 'Плагин-гибрид', value: 'phev'},
					],
				},
				{name: 'power', type: 'number', label: 'Мощность (л.с.)'},
				{name: 'battery', type: 'text', label: 'Батарея'},
				{name: 'range', type: 'number', label: 'Запас хода (км)'},
				{
					name: 'drivetrain',
					label: 'Привод',
					type: 'select',
					options: [
						{label: 'Передний', value: 'fwd'},
						{label: 'Задний', value: 'rwd'},
						{label: 'Полный', value: 'awd'},
					],
				},
				{
					name: 'transmission',
					label: 'КПП',
					type: 'select',
					options: [
						{label: 'Автомат', value: 'automatic'},
						{label: 'Механика', value: 'manual'},
						{label: 'Робот', value: 'robot'},
						{label: 'Вариатор', value: 'cvt'},
					],
				},
				{name: 'color', type: 'text', label: 'Цвет'},
				{name: 'interiorColor', type: 'text', label: 'Цвет салона'},
			],
		},
		// Gallery
		{
			name: 'gallery',
			label: 'Галерея',
			type: 'array',
			fields: [
				{
					name: 'image',
					label: 'Изображение',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
			],
		},
		{
			name: 'mainImage',
			label: 'Главное изображение',
			type: 'upload',
			relationTo: 'media',
		},
		// Location
		{
			name: 'location',
			label: 'Локация',
			type: 'relationship',
			relationTo: 'locations',
			hasMany: false,
		},
		// Description
		{
			name: 'shortDescription',
			label: 'Краткое описание',
			type: 'textarea',
		},
		{
			name: 'description',
			label: 'Описание',
			type: 'richText',
		},
		// Tags
		{
			name: 'tags',
			label: 'Теги',
			type: 'select',
			hasMany: true,
			options: [
				{label: 'Новинка', value: 'new'},
				{label: 'Хит продаж', value: 'bestseller'},
				{label: 'Акция', value: 'promo'},
				{label: 'Эксклюзив', value: 'exclusive'},
			],
		},
		{
			name: 'isFeatured',
			label: 'Рекомендуемый',
			type: 'checkbox',
			defaultValue: false,
			admin: {position: 'sidebar'},
		},
		publishedField,
		...seoFields,
	],
}
