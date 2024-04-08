import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import io from "socket.io-client";

const BASE_URL = `${import.meta.env.VITE_TERHIRE_SERVER}/api`;

export const appApi = createApi({
  reducerPath: "AppAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    //PRODUCTS--------------------------------------
    //---  GET PRODUCTS  ---//
    getProducts: builder.query({
      query: ({ filter, sort, search }) => ({
        url: `/product?filter_by=${filter}&sort_by=${sort}&search=${search}`,
        method: "get",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(import.meta.env.VITE_TERHIRE_SERVER);
        try {
          await cacheDataLoaded;

          socket.onAny((eventName, result) => {
            if (eventName === "update_product") {
              updateCachedData((draft) => {
                draft.push(result);
              });
            }
            if (eventName === "delete_update") {
              updateCachedData((draft) => {
                const updated = draft.filter(
                  (product) => product._id !== result.product_id
                );
                return (draft = updated);
              });
            }
            if (eventName === "update_edited_product") {
              updateCachedData((draft) => {
                const updated = draft.forEach((product, i) => {
                  if (product._id === result._id) {
                    draft[i] = result;
                  }
                });
                return (draft = updated);
              });
            }
          });
        } catch {}
        await cacheEntryRemoved;
      },
    }),

    //---  GET ONE PRODUCT  ---//
    getOneProduct: builder.query({
      query: ({ product_name }) => ({
        url: `/product/${product_name}`,
        method: "get",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(import.meta.env.VITE_TERHIRE_SERVER);
        try {
          await cacheDataLoaded;

          socket.on("update_edited_product", (arg) => {
            updateCachedData((draft) => {
              Object.assign(draft, arg);
            });
          });
        } catch {}
        await cacheEntryRemoved;
      },
    }),

    //---  ADD PRODUCT  ---//
    addProducts: builder.mutation({
      query: ({ token, body, user_id }) => ({
        url: `/product/add/${user_id}`,
        method: "post",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),

    //---  EDIT PRODUCT  ---//
    editProduct: builder.mutation({
      query: ({ token, body, user_id, product_id }) => ({
        url: `/product/edit/${user_id}/${product_id}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),

    //---  DELETE PRODUCT  ---//
    deleteProduct: builder.mutation({
      query: ({ token, user_id, product_id }) => ({
        url: `/product/delete/${user_id}/${product_id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    //USERS -----------------------------------------
    //---  REGISTER USER  ---//
    registerUser: builder.mutation({
      query: ({ body }) => ({
        url: `/user/register`,
        method: "post",
        body,
      }),
    }),

    //---  LOGIN USER  ---//
    loginUser: builder.mutation({
      query: ({ body }) => ({
        url: `/user/login`,
        method: "post",
        body,
      }),
    }),

    //---  GET USER INFO  ---//
    getUserInfo: builder.query({
      query: ({ user_id, customer_id, token }) => ({
        url: `/user/${user_id}/${customer_id}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    //Blog---------------------------------------
    //---  GET POSTS  ---//
    getPosts: builder.query({
      query: () => ({
        url: `/blog`,
        method: "get",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(import.meta.env.VITE_TERHIRE_SERVER);
        try {
          await cacheDataLoaded;

          socket.onAny((eventName, result) => {
            if (eventName === "update_added_post") {
              updateCachedData((draft) => {
                draft.push(result);
              });
            }
            if (eventName === "update_deleted_post") {
              updateCachedData((draft) => {
                const updated = draft.filter(
                  (product) => product._id !== result.product_id
                );
                return (draft = updated);
              });
            }
          });
        } catch {}
        await cacheEntryRemoved;
      },
    }),

    //---  GET ONE POST  ---//
    getOnePost: builder.query({
      query: ({ post_id }) => ({
        url: `/blog/post/${post_id}`,
        method: "get",
      }),
    }),

    //---  ADD POST  ---//
    addPost: builder.mutation({
      query: ({ token, body, user_id }) => ({
        url: `/blog/create/${user_id}`,
        method: "post",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),

    //---  DELETE POST  ---//
    deletePost: builder.mutation({
      query: ({ token, user_id, post_id }) => ({
        url: `/blog/delete/${user_id}/${post_id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    //Subscribers---------------------------------
    //---  SUBSCRIBE USER  ---//
    subscribeUser: builder.mutation({
      query: ({ email }) => ({
        url: `/user/subscriber/create`,
        method: "post",
        body: { email },
      }),
    }),

    //---  GET SUBSCRIBERS  ---//
    getSubscribers: builder.query({
      query: ({ user_id, token }) => ({
        url: `/user/subscriber/${user_id}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    //ORDERS -----------------------------------------
    //---  CHECKOUT ORDER  ---//
    checkout: builder.mutation({
      query: ({ body }) => ({
        url: "/stripe/create-checkout-session",
        method: "post",
        body,
      }),
    }),

    //---  ORDER SUCCESSFUL  ---//
    session: builder.query({
      query: ({ id }) => ({
        url: `/stripe/success/${id}`,
        method: "get",
      }),
    }),

    //---  GET ALL ORDERS  ---//
    getOrders: builder.query({
      query: ({ user_id, token, filter_by }) => ({
        url: `/order/${user_id}?filter_by=${filter_by}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    //---  GET ORDER DETAILS  ---//
    getOrderDetails: builder.query({
      query: ({ order_no }) => ({
        url: `/order/details/${order_no}`,
        method: "get",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(import.meta.env.VITE_TERHIRE_SERVER);
        try {
          await cacheDataLoaded;

          socket.on("update_edited_product", (arg) => {
            updateCachedData((draft) => {
              Object.assign(draft, arg);
            });
          });
        } catch {}
        await cacheEntryRemoved;
      },
    }),

    //---  EDIT ORDER  ---//
    editOrder: builder.mutation({
      query: ({ token, user_id, order_id, body }) => ({
        url: `/order/edit/${user_id}/${order_id}`,
        method: "PATCH",
        body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    //---  GET USER ORDERS  ---//
    getUserOrders: builder.query({
      query: ({ user_id, token }) => ({
        url: `/order/history/${user_id}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    //REVIEWS -----------------------------------------
    //---  GET PRODUCT REVIEWS  ---//
    getProductReviews: builder.query({
      query: ({ product_name, keyword }) => ({
        url: `/review/${product_name}?keyword=${keyword}`,
        method: "get",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(import.meta.env.VITE_TERHIRE_SERVER);
        try {
          await cacheDataLoaded;

          socket.onAny((eventName, result) => {
            if (eventName === "update_review") {
              updateCachedData((draft) => {
                draft.push(result);
              });
            }
          });
        } catch {}
        await cacheEntryRemoved;
      },
    }),

    //---  ADD REVIEW  ---//
    addReview: builder.mutation({
      query: ({ product_name, user_id, body }) => ({
        url: `/review/add/${product_name}/${user_id}`,
        method: "post",
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useEditProductMutation,
  useAddProductsMutation,
  useDeleteProductMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserInfoQuery,
  useGetPostsQuery,
  useGetOnePostQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useSubscribeUserMutation,
  useGetSubscribersQuery,
  useCheckoutMutation,
  useSessionQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useEditOrderMutation,
  useGetUserOrdersQuery,
  useGetProductReviewsQuery,
  useAddReviewMutation,
} = appApi;
