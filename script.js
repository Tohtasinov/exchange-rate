const API_BASE_URL = "https://v6.exchangerate-api.com/v6/b6daf2359649d1c860e2e7d3";

async function displayExchangeRates() {
  try {
    const response = await fetch(`${API_BASE_URL}/latest/USD`);
    const rates = await response.json();

    const table = document.getElementById("exchangeRatesTable");
    table.innerHTML = `
      <tr>
        <th>Валюта</th>
        <th>Курс от KGS</th>
      </tr>
    `;

    const kgsRate = rates.conversion_rates["KGS"];
    const selectedCurrencies = ["RUB", "KGS", "KZT", "USD", "EUR"];

    selectedCurrencies.forEach((currency) => {
      if (currency !== "KGS") {
        const rateRow = document.createElement("tr");
        rateRow.innerHTML = `
          <td>${currency}</td>
          <td>${(kgsRate / rates.conversion_rates[currency]).toFixed(2)}</td>
        `;
        table.appendChild(rateRow);
      }
    });

    const kgsRow = document.createElement("tr");
    kgsRow.innerHTML = `
      <td>KGS</td>
      <td>${(rates.conversion_rates["USD"] / kgsRate).toFixed(2)}</td>
    `;
    table.appendChild(kgsRow);
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
  }
}

displayExchangeRates();

async function convertCurrency() {
  const amount = parseFloat(document.querySelector(".input").value);
  const fromCurrency = document.querySelector(".form-select-1:nth-child(1)").value;
  const toCurrency = document.querySelector(".form-select-1:nth-child(2)").value;

  try {
    const response = await fetch(`${API_BASE_URL}/pair/${fromCurrency}/${toCurrency}/${amount}`);
    const data = await response.json();
    const convertedAmount = data.conversion_result;
    document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    document.getElementById("result").textContent = "Введите число!!";
  }
}
