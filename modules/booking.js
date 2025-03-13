import { loadData } from "./dataFunctions.js";
async function book() {
  const data = await loadData();
  const html_field_id =
    document.getElementById("details-body").field_booking_id;
  const field = data.find((field) => field.field_id === html_field_id);
  const date = document.getElementById("booking-date");
  const fromHour = document.getElementById("booking-from-hour");
  const toHour = document.getElementById("booking-to-hour");
  // console.log(field.field_id);
  // console.log(date.value);
  // console.log(parseInt(fromHour.value), parseInt(toHour.value));
}
export { book };
