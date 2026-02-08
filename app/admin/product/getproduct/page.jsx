"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa";


const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const router = useRouter();

  // 🔹 Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
      );
      const result = await res.json();
      setProducts(result.data || []);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Open delete popup
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  // 🔹 Confirm delete
  const confirmDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${deleteId}`,
        { method: "DELETE" }
      );
      setDeleteId(null);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // 🔹 DataGrid columns
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="product"
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => (
        <span className="font-semibold">₹{params.value}</span>
      ),
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() =>
              router.push(`/admin/product/editproduct/${params.row.id}`)
            }
          >
            <FaEdit className="text-lg" />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <FaTrash className="text-lg" />
          </IconButton>
          
          <IconButton
            
             onClick={() =>
              router.push(`/admin/product/productdetails/${params.row.id}`)
            }
          >
            <FaRegEye  className="text-lg text-black" />
          </IconButton>
        </>
      ),
    },
  ];

  // 🔹 Rows mapping
  const rows = products.map((product) => ({
    id: product._id,
    name: product.name,
    image: product.images?.[0] || "/placeholder.png",
    price: product.variants?.[0]?.price,
    weight: `${product.variants?.[0]?.weight} ${product.variants?.[0]?.unit}`,
  }));

  return (
    <div className="md:p-6">
      <h1 className="text-xl font-semibold mb-4">All Products</h1>

      <div className="bg-white rounded-lg shadow">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
            },
          }}
        />
      </div>

      {/* 🔴 DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Product
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this product?
              
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetProduct;
