$(function () {
  $(".add-to-card").click(updateCart);
});
function updateCart(pizza) {
  $.ajax({
    url: "/update-cart",
    method: "POST",
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
      cartCounter.innerText = res.totalQty;
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
