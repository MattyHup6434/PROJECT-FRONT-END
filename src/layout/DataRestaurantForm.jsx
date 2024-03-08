import React from "react";
import useSWR from "swr";
import axiosInstance from "../utils/axios";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

export default function Restaurant() {
  const { id } = useParams();
  const { user } = useAuth();

  const {
    data: restaurantData,
    error: restaurantError,
    isValidating: isRestaurantValidating,
  } = useSWR(
    user && user.role === "ADMIN" ? `/admin/getRestaurant/${id}` : null,
    async (url) => {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axiosInstance.get(url, config);

      // เรียกใช้ API เพื่อดึงข้อมูลผู้ใช้จาก userId ของ restaurant
      const userResponse = await axiosInstance.get(
        `/admin/getUser/${response.data.userId}`,
        config
      );

      return { restaurant: response.data, user: userResponse.data };
    }
  );

  if (user && user.role !== "ADMIN") {
    return <div className="text-white">Permission denied</div>;
  }

  if (isRestaurantValidating) {
    return <div className="text-white">Loading...</div>;
  }

  if (restaurantError) {
    return (
      <div className="text-white">
        Error fetching data: {restaurantError.message}
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="backG text-black">
        <h1 className="text-3xl">ร้าน : {restaurantData.restaurant.name}</h1>
        <table className="table">
          <thead>
            <tr>
              <th>เจ้าของร้านชื่อ</th>
              <th>อีเมล</th>
              <th>เบอร์โทรเจ้าของร้าน</th>

              <th>ที่อยู่ของร้าน</th>
              <th>เบอร์โทรร้าน</th>
              <th>ประเภทร้าน</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{restaurantData.user.name}</td>
              <td>{restaurantData.user.email}</td>
              <td>{restaurantData.user.phone}</td>

              <td>{restaurantData.restaurant.address}</td>
              <td>{restaurantData.restaurant.phone}</td>
              <td>{restaurantData.restaurant.type}</td>
              <td
                style={{
                  color:
                    restaurantData.restaurant.status === "OPEN"
                      ? "green"
                      : "red",
                }}
              >
                {restaurantData.restaurant.status}
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
        <br />
      </div>
      <div className="p-4"></div>
    </div>
  );
}
