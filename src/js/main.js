import $ from 'jquery';
import 'slick-carousel';
import 'inputmask';
import { Fancybox } from "@fancyapps/ui";

import { TabsManager } from './tabs.js';

$(document).ready(function () {
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
	//$('#phone').inputmask({"mask": "+7 (999) 999-9999"});

	/*Форма*/
	const formConntact = document.getElementById('form-contact');
	const loaderContact = document.getElementById('loader-contact');
	const successContact = document.getElementById('success-contact');

	const formExtended = document.getElementById('form-extended');
	const loaderExtended = document.getElementById('loader-extended');
	const successExtended = document.getElementById('success-extended');

	formConntact.addEventListener('submit', event => {
		event.preventDefault();

		changedForm(event, loaderContact, successContact, formConntact);
	});

	formExtended.addEventListener('submit', event => {
		event.preventDefault();

		changedForm(event, loaderExtended, successExtended, formExtended);
	});

	function changedForm(event, loader, success, form) {
		const formData = Array
			.from(event.target.elements)
			.filter(el => el.name)
			.map(el => {
			const {value, name} = el;
			return { [name] : value};
			});

		console.log(formData);

		loader.style.display = 'block';
			sendRequest(() => {
				//после того как получили ответ блокируем лоадер
				loader.style.display = 'none';
				form.reset(); //сброс формы
				success.style.display = 'block';
				timeout(() => {
					success.style.display = 'none';
				}, 3000);

			});
	}

	function timeout(callback, time) {
		setTimeout(callback, time);
	}

	//якобы отправляется запрос на сервер
	function sendRequest(callback) {
		setTimeout(callback, 2000);
	}


});