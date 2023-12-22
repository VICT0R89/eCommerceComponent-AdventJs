const $MENU = document.getElementById('menu')
const $CART = document.getElementById('cart-summary')

const menuItem = props => {
	const { id, image, alt, name, price, count } = props
  return `
		<li>
			<div class="plate">
				<img src="images/${image}" alt="${alt}" class="plate" />
			</div>
			<div class="content">
				<p class="menu-item">${name}</p>
				<p class="price">${price}</p>
				<button class=${count > 0 ? 'in-cart' : 'add'} id="${id}">
				${count > 0 ?
					(`<img src="images/check.svg" alt="Check" />`,
					'In Cart') :
					'Add to Cart'
				}
				</button>
			</div>
		</li>
	`
}

const cartItem = props => {
	const { id, image, alt, name, price, count } = props
	return `
		<li>
			<div class="plate">
				<img src="images/${image}" alt="${alt}" class="plate" />
				<div class="quantity">${count}</div>
			</div>
			<div class="content">
				<p class="menu-item">${name}</p>
				<p class="price">${price}</p>
			</div>
			<div class="quantity__wrapper">
				<button class="decrease" id="${id}">
					<img src="images/chevron.svg" />
				</button>
				<div class="quantity">${count}</div>
				<button class="increase" id="${id}">
					<img src="images/chevron.svg" />
				</button>
			</div>
			<div class="subtotal">
				${price*count}
			</div>
		</li>
	`
}

const addMenuItems = menu => {
	return ($MENU.innerHTML =
		menu.map(item => {
			return menuItem(item)
		}).join("")
	)
}

const addCartItems = menu => {
	const cartMenu = menu.filter(item => item.count > 0)
	cartMenu.length > 0 ?
		($CART.innerHTML =
			cartMenu.map(item => {
				return cartItem(item)
			}).join("")
	) : 
	$CART.innerHTML = `<p class="empty">Your cart is empty.</p>`
}

const addBtns = () => {
	const addBtns = document.querySelectorAll('.add')
	addBtns.forEach(btn => {
		btn.addEventListener('click', e =>{
			const id = e.target.id
			const item = data.filter(el => el.id == id)
			addToCart(item)
		})
	})
}

const addToCart = item => {
	data.map(el => {
		if (el.id == item[0].id) {
			el.count = 1
		}
	})
	init()
}

const removeBtns = () => {
	const decreaseBtns = document.querySelectorAll('.decrease')
	if (decreaseBtns.length > 0) {
		decreaseBtns.forEach(btn => {
			btn.addEventListener('click', e =>{
				const id = e.target.id
				const item = data.filter(el => el.id == id)
				removeFromCart(item)
			})
		})
	}
}

const removeFromCart = item => {
	data.map(el => {
		if (el.id == item[0].id) {
			if(el.count == 1){
				el.count = 0
			} else {
				el.count--
			}
		}
	})
	init()
}

const increseBtns = () => {
	const increaseBtns = document.querySelectorAll('.increase')
	if (increaseBtns.length > 0) {
		increaseBtns.forEach(btn => {
			btn.addEventListener('click', e =>{
				const id = e.target.id
				const item = data.filter(el => el.id == id)
				increseCount(item)
			})
		})
	}
}

const increseCount = () => {
	data.map(el => {
		if (el.id == item[0].id) {
			el.count++
		}
	})
	init()
}

const init = () => {
	addMenuItems(data)
	addCartItems(data)
	addBtns()
	removeBtns()
	increseBtns()
}
init()