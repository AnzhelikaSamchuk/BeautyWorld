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

});