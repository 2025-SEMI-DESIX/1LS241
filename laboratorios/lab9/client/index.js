(() => {
    const App = (() => {
        const state = {
            products: 0,
            prices: ''
        };

        const htmlElements = {
            input: document.getElementById('input'),
            add: document.getElementById('add'),
            sub: document.getElementById('sub'),
            price: document.getElementById('price'),
            createProduct: document.getElementById('create-product'),
            createCheckoutSession: document.getElementById('create-checkout-session'),
        };

        const handlers = {
            onAdd(e) {
                state.products += 1;
                render.product({ quantity: state.products });
            },
            onSub(e) {
                state.products -= 1;
                if (state.products < 0) {
                    state.products = 0;
                }
                render.product({ quantity: state.products });
            },
            async onCreateProduct(e) {
                const name = htmlElements.input.value || 'Producto';
                const response = await fetch('/api/v1/products', {
                    method: 'POST',
                    body: JSON.stringify({ name, amount: 100 }), // $1.00 instead of $0.01
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                state.prices = data.price.id;
            },
            async onCreateCheckoutSession(e) {
                const response = await fetch('/api/v1/create-checkout-session', {
                    method: 'POST',
                    body: JSON.stringify({ quantity: state.products, price: state.prices }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                window.location.href = data.url;
            }
        }

        const render = {
            product(p) {
                htmlElements.price.innerHTML = templates.product(p);
            }
        }

        const templates = {
            product({ quantity }) {
                return `<span>Qty: ${quantity}</span>`
            }
        }

        return {
            init() {
                htmlElements.add.addEventListener('click', handlers.onAdd)
                htmlElements.sub.addEventListener('click', handlers.onSub)
                htmlElements.createProduct.addEventListener('click', handlers.onCreateProduct)
                htmlElements.createCheckoutSession.addEventListener('click', handlers.onCreateCheckoutSession)
            }
        };
    })();
    App.init();
})();
