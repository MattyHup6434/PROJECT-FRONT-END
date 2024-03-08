import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import axiosInstance from "../utils/axios";
import useAuth from "../hooks/useAuth";

export default function Restaurant() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { user } = useAuth();
  const { data, error, isValidating } = useSWR(
    user && user.role === "ADMIN" ? "/admin/getRestaurant" : null,
    async (url) => {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axiosInstance.get(url, config);

      return response.data;
    }
  );

  const [editingId, setEditingId] = useState(null);
  const [formEditData, setFormEdirData] = useState({
    name: "",
    address: "",
    phone: "",
    type: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    type: "",
  });

  const handleToggleForm = async () => {
    setShowForm(!showForm);
  };

  const handleChangeForEdit = (e) => {
    const { name, value } = e.target;
    setFormEdirData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      await axiosInstance.post("/admin/createRestaurant", formData, config);
      mutate("/admin/getRestaurant");
      setFormData({
        name: "",
        address: "",
        phone: "",
        type: "",
      });
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  const handleEdit = (restaurant) => {
    setFormEdirData({
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
      type: restaurant.type,
    });
    setEditingId(restaurant.id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      await axiosInstance.put(
        `/admin/updateRestaurant/${editingId}`,
        formEditData,
        config
      );
      mutate("/admin/getRestaurant");
      setFormEdirData({
        id: "",
        name: "",
        address: "",
        phone: "",
        type: "",
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/admin/delRestaurant/${id}`, config);
      mutate("/admin/getRestaurant");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };
  const handleReset = () => {
    setFormEdirData({
      name: "",
      address: "",
      phone: "",
      type: "",
    });
  };

  useEffect(() => {
    if (data) {
      setFormData((prevState) => ({
        ...prevState,
        ...data,
      }));
    }
  }, [data]);

  if (user && user.role !== "ADMIN") {
    return <div className="text-white">Permission denied</div>;
  }

  if (isValidating) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-white">
        Error fetching restaurant data: {error.message}
      </div>
    );
  }

  // Paginate the data
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentData = data && data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="text-white">
      {user && (
        <>
          <div>ROLE: {user.role}</div>
          <div className="max-center-btn">
            <button
              className="btn btn-outline text-white  btn-max"
              onClick={handleToggleForm}
            >
              เพิ่มร้าน
            </button>
          </div>
          {showForm && (
            <form onSubmit={handleSubmit} className="text-black ml-16">
              <input
                type="text"
                className="input input-bordered  me-2"
                placeholder="ชื่อร้าน"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input input-bordered me-2"
                placeholder="ที่อยู่ของร้าน"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input input-bordered  me-2"
                placeholder="เบอร์โทร"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input input-bordered min-w-100  me-2"
                placeholder="ประเภทร้าน"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
              <button
                className="btn-new btn-success text-white hover:bg-white hover:text-black w-28 my-4 "
                type="submit"
              >
                ตกลง
              </button>

              <button
                className="btn-new  text-yellow-400 hover:bg-amber-500 hover:text-white w-28 my-4 "
                type="button"
                onClick={handleReset}
              >
                รีข้อมูล
              </button>
            </form>
          )}
        </>
      )}

      <div className="backG  text-black ">
        <table className="table ">
          <thead>
            <tr>
              <th>ดูรายละเอียด</th>
              <th>ลำดับ</th>
              <th>ชื่อร้าน</th>
              <th>ที่อยู่ของร้าน</th>
              <th>เบอร์โทร</th>
              <th>ประเภทร้าน</th>
              <th>แก้ไข/ลบ ข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((restaurant, index) => (
                <tr className="res-data trsty" key={restaurant.id}>
                  <td>
                    <Link to={`/restaurantData/${restaurant.id}`}>
                      <button
                        type="button"
                        className="btn-new btn-outline text-blue-500 hover:btn-info mt-5 my-2"
                      >
                        ดูรายละเอียด
                      </button>
                    </Link>
                  </td>
                  <td>{index + 1 + (currentPage - 1) * perPage}</td>

                  <td>
                    {editingId === restaurant.id ? (
                      <input
                        type="text"
                        className="input input-bordered bg-gray-50"
                        placeholder="ชื่อร้าน"
                        name="name"
                        value={formEditData.name}
                        onChange={handleChangeForEdit}
                      />
                    ) : (
                      restaurant.name
                    )}
                  </td>

                  <td>
                    {editingId === restaurant.id ? (
                      <input
                        type="text"
                        className="input input-bordered bg-gray-50"
                        placeholder="ที่อยู่"
                        name="address"
                        value={formEditData.address}
                        onChange={handleChangeForEdit}
                      />
                    ) : (
                      restaurant.address
                    )}
                  </td>

                  <td>
                    {editingId === restaurant.id ? (
                      <input
                        type="text"
                        className="input input-bordered bg-gray-50"
                        placeholder="เบอร์โทร"
                        name="phone"
                        value={formEditData.phone}
                        onChange={handleChangeForEdit}
                      />
                    ) : (
                      restaurant.phone
                    )}
                  </td>

                  <td>
                    {editingId === restaurant.id ? (
                      <input
                        type="text"
                        className="input input-bordered bg-gray-50"
                        placeholder="ประเภทร้าน"
                        name="type"
                        value={formEditData.type}
                        onChange={handleChangeForEdit}
                      />
                    ) : (
                      restaurant.type
                    )}
                  </td>

                  <td>
                    {editingId === restaurant.id ? (
                      <button
                        type="button"
                        onClick={handleUpdate}
                        className="btn-new btn-outline text-blue-500 hover:btn-info mt-5 my-2"
                      >
                        อัปเดต
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(restaurant)}
                        className="btn-new btn-outline text-yellow-500 hover:btn-warning mt-5 my-2"
                      >
                        แก้ไข
                      </button>
                    )}

                    {editingId === restaurant.id ? (
                      <button
                        type="button"
                        className="btn-new btn-outline text-orange-500 hover:btn-error mt-5 my-2"
                        onClick={() => {
                          setEditingId(null);
                        }}
                      >
                        ยกเลิก
                      </button>
                    ) : (
                      <button
                        className="btn-new btn-outline text-red-600 hover:btn-error mt-5 my-2"
                        onClick={() => {
                          if (
                            window.confirm(
                              "คุณแน่ใจหรือไม่ว่าต้องการลบร้านอาหารนี้?"
                            )
                          ) {
                            handleDelete(restaurant.id);
                          }
                        }}
                      >
                        ลบ
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {data && data.length > perPage && (
          <div className="pagination">
            {[...Array(Math.ceil(data.length / perPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="p-4"></div>
    </div>
  );
}
