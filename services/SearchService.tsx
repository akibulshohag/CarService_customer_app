import request from "../utils/request";

async function getLocation() {
  const res = await request(`/customer/location-list`, {
    method: "OPTIONS",
    // data: data,
  });
  return res;
}
async function getCarSeat() {
  const res = await request(`/customer/car-seat-list`, {
    method: "OPTIONS",
  });
  return res;
}
async function getCarList() {
  const res = await request(`/customer/car-list`, {
    method: "OPTIONS",
  });
  return res;
}

async function carFilter(data: any) {
  const res = await request(`/customer/booking-search`, {
    method: "POST",
    data: data,
  });
  return res;
}

export default { getLocation, getCarSeat, getCarList, carFilter };
