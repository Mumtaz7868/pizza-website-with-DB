$(function () {
  $(".add-to-card").click(updateCart);
});
function updateCart(pizza) {
  $.ajax({
    url: "/update-cart",
    method: "POST",
    success: (res) => {
      cartCounter.innerText = res.totalQty;
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

// addToCart.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     let pizza = JSON.parse(btn.dataset.pizza);
//     console.log("zzz");
//     updateCart(pizza);
//   });
