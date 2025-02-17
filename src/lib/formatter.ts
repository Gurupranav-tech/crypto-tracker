export const dollarFormatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
});

export const ruppeeFormatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 4,
});

export const euroFormatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 4,
});

export const dateFormatter = new Intl.DateTimeFormat("en-US");
