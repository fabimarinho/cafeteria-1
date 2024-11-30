
$(document).ready(function() {
    // Adicionar item ao carrinho
    $('.btn-add-to-cart').click(function() {
      var item = $(this).data('item');
      var price = parseFloat($(this).data('price'));
      var image = $(this).data('image');
      addToCart(item, price, image);
    });
  
    function addToCart(item, price, image) {
      var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      var existingItem = cartItems.find(function(cartItem) {
        return cartItem.item === item;
      });
  
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({ item: item, price: price, quantity: 1, image: image });
      }
  
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCart();
      updateTotal();
    }
  
// Função para atualizar o carrinho na página de carrinho
function updateCart() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartItemsHtml = '';

    cartItems.forEach(function(item, index) {
        var imagePath = window.location.origin + '/assets/' + item.image;
        cartItemsHtml += `
            <li class="cart-item">
                <img src="${imagePath}" alt="${item.item}">
                <div class="cart-item-info">
                    <p>${item.item}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="btn-remove-from-cart" data-index="${index}">Remover</button>
                </div>
            </li>
        `;
    });

    $('#cart-items').html(cartItemsHtml);
}
  
  // Atualizar o valor total do carrinho
function updateTotal() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var total = cartItems.reduce(function(acc, item) {
      return acc + (item.price * item.quantity);
    }, 0);
    $('#cart-total-value').text(total.toFixed(2));
  }
  
  // Executar a função de atualização do carrinho ao carregar a página
  $(document).ready(function() {
    updateCart();
    updateTotal();
  });
  
    // Atualizar o valor total do carrinho
    function updateTotal() {
      var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      var total = cartItems.reduce(function(acc, item) {
        return acc + (item.price * item.quantity);
      }, 0);
      $('#cart-total-value').text(total.toFixed(2));
    }
  
    // Remover item do carrinho
    $(document).on('click', '.btn-remove-from-cart', function() {
      var index = $(this).data('index');
      removeFromCart(index);
    });
  
    function removeFromCart(index) {
      var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      var item = cartItems[index];
  
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartItems.splice(index, 1);
      }
  
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCart();
      updateTotal();
    }
  
    // Executar a função de atualização do carrinho ao carregar a página
    updateCart();
    updateTotal();
  });
  


