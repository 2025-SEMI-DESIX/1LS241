(() => {
  const App = (() => {
    const htmlElements = {
      table: document.querySelector(".products-table"),
    }

    const handlers = {};

    const methods = {
      fetchProducts: async () => {
        const response = await fetch("http://localhost:3000/api/v1/products");
        const data = await response.json();
        return data;
      },
      renderProducts: ({ data, count }) => {
        htmlElements.table.innerHTML = data.map((product) => `
            <tr>
                <td>${product.id}</td>
                <td>${product.category.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
            </tr>
        `).join("");
      }
    }

    return {
      init: async () => {
        const { data, count } = await methods.fetchProducts();
        methods.renderProducts({ data, count });
      }
    }
  })();
  App.init();
})();
