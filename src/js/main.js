$(document).ready(function () {

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


});