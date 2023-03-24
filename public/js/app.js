$(function () {
	// $(".add-to-card").click(updateCart);
	// alert(moment().format("hh:mm A"));
});
function updateCart(pizza) {
	$.ajax({
		url: "/update-cart",
		method: "POST",
		data: pizza,
		success: (res) => {
			cartCounter.innerText = res.totalQty;
			var notyf = new Notyf({
				duration: 1000,
				position: {
					x: "right",
					y: "top",
				},
			});
			notyf.success("Item added to cart successfully!");
		},
		error: (res) => {
			var notyf = new Notyf({
				duration: 1000,
				position: {
					x: "right",
					y: "top",
				},
			});
			notyf.error("Someting went wrong!");
		},
	});
}

window.addEventListener("DOMContentLoaded", (event) => {
	document.querySelectorAll(".add-to-card").forEach((btn) => {
		btn.addEventListener("click", function (e) {
			let pizza = JSON.parse(btn.dataset.pizza);
			updateCart(pizza);
		});
	});
});

const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
	setTimeout(() => {
		alertMsg.remove;
	}, 2000);
}

initAdmin();
