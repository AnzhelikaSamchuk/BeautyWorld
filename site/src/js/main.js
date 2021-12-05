import $ from 'jquery';
import { TabsManager } from './tabs.js';
import { OrderForm } from './forms/order-form.js';

function init() {

	/*Мобильное меню*/
	humb.addEventListener('click', () => {
		mobileMenu.classList.add('visible');
	});

	closeHumb.addEventListener('click', () => {
		mobileMenu.classList.remove('visible');
	});

	const navigationsHumb = document.querySelectorAll('#navigation-humb');
	for (let link of navigationsHumb) {
		link.addEventListener('click', event => {
			console.log('click');
			mobileMenu.classList.remove('visible');
		})
	}

	/*Плавный скролл*/
	const navigation = document.querySelector('.navigation');

	document.addEventListener('scroll', event => {
		console.log(event.target.scrollTop)
	});

	const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

	for (let link of smoothScrollLinks) {
		link.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;
			const elementToScroll = document.querySelector(target.getAttribute('href'));
			elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	/*Наши работы*/
	$('.ourworks').on('init reInit', function (e, slick) {
		if (slick.slideCount <= slick.options.slidesToShow) {
			slick.slickAdd(slick.$slides.clone())
		}
	})

	$('.ourworks').slick({
		prevArrow: '.btn-prev',
		nextArrow: '.btn-next',
		slidesToShow: 4,
		infinite: true, //бесконечный слайдер
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					infinite: true,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					infinite: true,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					infinite: true,
					slidesToScroll: 1
				}
			}
		]
	});

	/*pricetabs*/
	const tabs = new TabsManager(document.getElementById('pricetabs'));

	/*Форма - inputmask*/
	/*const selector = document.getElementById('phone');

	const im = new Inputmask("+7 (999) 999-9999");
	im.mask(selector);*/
	//$('#phone').inputmask({"mask": "+7 (999) 999-9999"});

	$("#form-contact").validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			phone: {
				required: true,
				maxlength: 11,
				minlength: 11
			}
		},
		messages: {
			name: {
				required: "Поле 'Ваше Имя' обязательно к заполнению",
				minlength: "Введите не менее 2-х символов в поле 'Ваше Имя'"
			},
			phone: {
				required: "Поле 'телефон' обязательно к заполнению",
				minlength: "Введите не менее 11-х символов в поле 'Телефон'",
				maxlength: "Введите не более 11-х символов в поле 'Телефон'"
			}
		}
	});

	$("#form-extended").validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			phone: {
				required: true,
				maxlength: 11,
				minlength: 11
			}
		},
		messages: {
			name: {
				required: "Поле 'Ваше Имя' обязательно к заполнению",
				minlength: "Введите не менее 2-х символов в поле 'Ваше Имя'"
			},
			phone: {
				required: "Поле 'телефон' обязательно к заполнению",
				minlength: "Введите не менее 11-х символов в поле 'Телефон'",
				maxlength: "Введите не более 11-х символов в поле 'Телефон'"
			}
		}
	});

	/*Форма*/
	const formConntact = document.getElementById('form-contact');
	const loaderContact = document.getElementById('loader-contact');
	const successContact = document.getElementById('success-contact');

	const formExtended = document.getElementById('form-extended');
	const loaderExtended = document.getElementById('loader-extended');
	const successExtended = document.getElementById('success-extended');

	const form = new OrderForm();

	formConntact.addEventListener('submit', event => {
		event.preventDefault();

		if ($("#form-contact").valid()) {
			form.changedForm(event, loaderContact, successContact, formConntact);
		}
	});

	formExtended.addEventListener('submit', event => {
		event.preventDefault();

		if ($("#form-extended").valid()) {
			form.changedForm(event, loaderExtended, successExtended, formExtended);
		}
	});

}

$(document).ready(init);