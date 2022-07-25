import request from "../utils/request";

async function carBooking(data: any) {
  const res = await request(`/customer/booking-store`, {
    method: "POST",
    data: data,
  });
  return res;
}
async function bookingList(id: any) {
  const res = await request(`/customer/booking-list?customer_id=${id}`, {});
  return res;
}
async function bookingDelete(data: any) {
  const res = await request(`/customer/booking-delete`, {
    method: "DELETE",
    data: data,
  });
  return res;
}

export default { carBooking, bookingList, bookingDelete };
