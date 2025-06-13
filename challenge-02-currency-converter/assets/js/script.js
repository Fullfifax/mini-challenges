const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultInput = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");
const reverseBtn = document.getElementById("reverseBtn");
const flagEmojiSpan = document.getElementById("flagEmoji");

const currencies = [
  { code: "USD", name: "United States Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound Sterling", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩" },
  { code: "PLN", name: "Polish Zloty", flag: "🇵🇱" },
  { code: "HUF", name: "Hungarian Forint", flag: "🇭🇺" },
  { code: "CZK", name: "Czech Koruna", flag: "🇨🇿" },
  { code: "ILS", name: "Israeli Shekel", flag: "🇮🇱" },
  { code: "AED", name: "United Arab Emirates Dirham", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰" },
  { code: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩" },
  { code: "VND", name: "Vietnamese Dong", flag: "🇻🇳" },
  { code: "ARS", name: "Argentine Peso", flag: "🇦🇷" },
  { code: "CLP", name: "Chilean Peso", flag: "🇨🇱" },
  { code: "COP", name: "Colombian Peso", flag: "🇨🇴" },
  { code: "PEN", name: "Peruvian Sol", flag: "🇵🇪" },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "BHD", name: "Bahraini Dinar", flag: "🇧🇭" },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲" },
  { code: "TWD", name: "New Taiwan Dollar", flag: "🇹🇼" },
  { code: "UAH", name: "Ukrainian Hryvnia", flag: "🇺🇦" },
  { code: "RON", name: "Romanian Leu", flag: "🇷🇴" },
  { code: "MAD", name: "Moroccan Dirham", flag: "🇲🇦" },
  { code: "MGA", name: "Malagasy Ariary", flag: "🇲🇬" },
];

function populateSelect(select) {
  currencies.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.code;
    option.textContent = `${c.flag} ${c.code} - ${c.name}`;
    select.appendChild(option);
  });
}

populateSelect(fromCurrency);
populateSelect(toCurrency);

// Default selections
fromCurrency.value = "MGA";
toCurrency.value = "EUR";

document.addEventListener("DOMContentLoaded", () => {
  updateExchangeRate();

  fromCurrency.addEventListener("change", updateExchangeRate);
  toCurrency.addEventListener("change", updateExchangeRate);
});

function showResultWithFlag(flag, amount, currency) {
  flagEmojiSpan.textContent = flag || "";
  resultInput.value = amount ? `${amount} ${currency}` : "";
}

async function updateExchangeRate() {
  const from = fromCurrency.value;
  const to = toCurrency.value;

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/be4b8e9d46276b96fb82a54a/latest/${from}`);
    const data = await response.json();
    const rate = data.conversion_rates[to];

    document.getElementById("exchangeRate").textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  } catch (error) {
    document.getElementById("exchangeRate").textContent = "Taux indisponible pour le moment.";
  }
}

async function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || isNaN(amount) || amount <= 0) {
    showResultWithFlag("", "");
    resultInput.placeholder = "Please enter a valid amount";
    return;
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/be4b8e9d46276b96fb82a54a/latest/${from}`
    );
    const data = await response.json();

    if (data.result !== "success" || !data.conversion_rates[to]) {
      showResultWithFlag("", "");
      resultInput.placeholder = "Conversion rate not available";
      return;
    }

    const rate = data.conversion_rates[to];
    const converted = (amount * rate).toFixed(2);

    const currencyInfo = currencies.find((c) => c.code === to);
    const flag = currencyInfo ? currencyInfo.flag : "";

    showResultWithFlag(flag, converted, to);

    document.getElementById("exchangeRate").textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  } catch (error) {
    showResultWithFlag("", "");
    resultInput.placeholder = "Failed to fetch exchange rate";
  }
}

convertBtn.addEventListener("click", convert);

reverseBtn.addEventListener("click", () => {
  const tempFrom = fromCurrency.value;
  const tempTo = toCurrency.value;

  fromCurrency.value = tempTo;
  toCurrency.value = tempFrom;

  const resultVal = parseFloat(resultInput.value);
  const amountVal = parseFloat(amountInput.value);

  if (!isNaN(amountVal) && !isNaN(resultVal)) {
    amountInput.value = resultVal;
    resultInput.value = "";
  }

  updateExchangeRate();
  convert();
});