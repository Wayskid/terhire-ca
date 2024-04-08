import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import {
  useEditProductMutation,
  useGetOneProductQuery,
  useGetProductsQuery,
} from "../../../services/appApi.js";
import AppBtn from "../../../components/reuseable/AppBtn.jsx";
import AppInput from "../../../components/reuseable/AppInput.jsx";
import { BsX } from "react-icons/bs";
import AppInputSelect from "../../../components/reuseable/AppInputSelect.jsx";
import appContext from "../../../context/AppContext.jsx";
import { useSocket } from "../../../context/SocketProvider.jsx";
import AppLoader from "../../../components/reuseable/AppLoader.jsx";

export default function EditProduct() {
  const socket = useSocket();
  const [setShowMenu] = useOutletContext();
  const { userInfo } = useContext(appContext);
  const { product_name } = useParams();

  //Pairs With
  const [pairsWithArray, setPairsWithArray] = useState([]);
  const { data: allProductsResult } = useGetProductsQuery({
    filter: "",
    sort: "Alphabetically_A-Z",
    search: "",
  });
  useEffect(() => {
    if (allProductsResult) {
      const theArray = allProductsResult.map((product) => ({
        option: product.name,
        value: product.name.replace(/ /g, "-"),
      }));

      setPairsWithArray(theArray);
    }
  }, [allProductsResult]);

  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    name: "",
    images: [],
    price: "",
    category: "",
    summary: "",
    description: "",
    pairs_with: "",
    weight: "",
    benefits: [],
    ingredients: [],
    how_to_use: "",
    shelf_life: "",
    first_time: "",
    additional_info: "",
    in_stock: "",
    discount: "",
  });

  //Handle get product
  const {
    data: singleProductResult,
    isError,
    error: singleProductError,
  } = useGetOneProductQuery({ product_name });

  useEffect(() => {
    if (singleProductResult)
      setUpdatedProduct({
        title: singleProductResult.title,
        name: singleProductResult.name,
        images: singleProductResult.images,
        price: singleProductResult.price,
        category: singleProductResult.category,
        summary: singleProductResult.summary,
        description: singleProductResult.description,
        pairs_with: singleProductResult.pairs_with,
        weight: singleProductResult.weight,
        benefits: singleProductResult.benefits,
        ingredients: singleProductResult.ingredients,
        how_to_use: singleProductResult.how_to_use,
        shelf_life: singleProductResult.shelf_life,
        first_time: singleProductResult.first_time,
        additional_info: singleProductResult.additional_info,
        in_stock: singleProductResult.in_stock,
        discount: singleProductResult.discount,
      });
  }, [singleProductResult]);

  function handleOnChange(e) {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  }

  function handleBlur(e) {
    setAddProductVal({
      ...addProductVal,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const [arrayVals, setArrayVals] = useState({
    ingredientsVal: "",
    benefitsVal: "",
    imagesVal: "",
  });

  //Handle add ingredients
  function handleAddIngredients(e) {
    e.preventDefault();
    if (arrayVals.ingredientsVal.trim()) {
      if (
        !updatedProduct.ingredients.includes(arrayVals.ingredientsVal.trim())
      ) {
        setUpdatedProduct({
          ...updatedProduct,
          ingredients: [
            ...updatedProduct.ingredients,
            arrayVals.ingredientsVal,
          ],
        });
        setArrayVals({
          ...arrayVals,
          ingredientsVal: "",
        });
      }
    }
  }

  //Handle add benefits
  function handleAddBenefits(e) {
    e.preventDefault();
    if (arrayVals.benefitsVal.trim()) {
      if (!updatedProduct.benefits.includes(arrayVals.benefitsVal.trim())) {
        setUpdatedProduct({
          ...updatedProduct,
          benefits: [...updatedProduct.benefits, arrayVals.benefitsVal],
        });
        setArrayVals({
          ...arrayVals,
          benefitsVal: "",
        });
      }
    }
  }

  //Handle remove ingredients
  function removeIngredient(index) {
    const array = [...updatedProduct.ingredients];
    array.splice(index, 1);

    setUpdatedProduct({
      ...updatedProduct,
      ingredients: array,
    });
  }

  //Handle remove benefits
  function removeBenefit(index) {
    const array = [...updatedProduct.benefits];
    array.splice(index, 1);

    setUpdatedProduct({
      ...updatedProduct,
      benefits: array,
    });
  }

  //Convert image to base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  //Handle add image
  // const [previewVal, setPreviewVal] = useState([]);
  // setPreviewVal([...previewVal, arrayVals.imagesVal]);
  async function handleAddImages(e) {
    e.preventDefault();
    if (arrayVals.imagesVal) {
      const base64 = await convertToBase64(arrayVals.imagesVal);
      setUpdatedProduct({
        ...updatedProduct,
        images: [...updatedProduct.images, base64],
      });
    }
  }

  //Handle remove images
  function removeImages(index) {
    const array = [...updatedProduct.images];
    array.splice(index, 1);

    setUpdatedProduct({
      ...updatedProduct,
      images: array,
    });
  }

  //Handle image preview
  // const [imgPreview, setImgPreview] = useState([]);
  // useEffect(() => {
  //   for (let i = 0; i < previewVal.length; i++) {
  //     const image = previewVal[i];
  //     if (image) {
  //       const objectUrl = URL.createObjectURL(image);
  //       setImgPreview([...imgPreview, objectUrl]);
  //     }
  //   }
  // }, [updatedProduct.images]);

  //Handle update product
  const navigate = useNavigate();
  const [editProductApi, { isLoading }] = useEditProductMutation();
  function handleUpdateProduct() {
    editProductApi({
      token: userInfo.token,
      body: updatedProduct,
      user_id: userInfo._id,
      product_id: singleProductResult && singleProductResult._id,
    })
      .unwrap()
      .then((result) => {
        socket.emit("edit_product", result);
        navigate("../products");
      });
  }

  return singleProductResult ? (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-2 md:flex mb-10 justify-between items-center">
        <div
          className="burger inline-block py-3 px-1 cursor-pointer md:hidden"
          onClick={() => setShowMenu(true)}
        >
          <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
          <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
          <div className="w-[1.9rem] h-[1.5px] bg-black"></div>
        </div>
        <p className="header text-4xl col-span-2">Edit Product</p>
        <div className="col-start-2 row-start-1 grid">
          <AppBtn
            label="All Products"
            onClick={() => navigate("../products")}
          />
        </div>
      </div>
      <div className="grid gap-7">
        <div className="grid gap-7 md:flex md:justify-between">
          <AppInput
            label="Title"
            value={updatedProduct.title}
            onChange={handleOnChange}
            name="title"
            type="text"
            onBlur={handleBlur}
          />
          <AppInput
            label="Name"
            value={updatedProduct.name}
            onChange={handleOnChange}
            name="name"
            type="text"
            onBlur={handleBlur}
          />
        </div>
        <AppInput
          label="Category"
          value={updatedProduct.category}
          onChange={handleOnChange}
          type="text"
          onBlur={handleBlur}
          name="category"
        />
        <div className="grid">
          <label htmlFor="summary" className="font-medium mb-3">
            Summary
          </label>
          <textarea
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={updatedProduct.summary}
            onChange={handleOnChange}
            name="summary"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid">
          <label htmlFor="description" className="font-medium mb-3">
            Description
          </label>
          <textarea
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={7}
            value={updatedProduct.description}
            onChange={handleOnChange}
            name="description"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid gap-7 md:flex md:justify-between">
          <AppInput
            label="Price (CAD)"
            value={updatedProduct.price}
            onChange={handleOnChange}
            type="number"
            name="price"
          />
          <AppInput
            label="Discount (%)"
            value={updatedProduct.discount}
            onChange={handleOnChange}
            type="number"
            name="discount"
          />
        </div>
        <div className="grid gap-7 md:flex md:justify-between">
          <AppInput
            label="Weight"
            value={updatedProduct.weight}
            onChange={handleOnChange}
            type="text"
            name="weight"
          />
          <AppInput
            label="In Stock"
            value={updatedProduct.in_stock}
            onChange={handleOnChange}
            type="number"
            name="in_stock"
          />
        </div>
        <div className="grid gap-7 md:flex md:justify-between">
          <div className="mb-5 items-center">
            <p className="mr-3 font-medium">Pairs With</p>
            <AppInputSelect
              selection={pairsWithArray}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  pairs_with: e.target.value,
                })
              }
              val={updatedProduct.pairs_with}
            />
          </div>
          <AppInput
            label="Shelf Life (months)"
            value={updatedProduct.shelf_life}
            onChange={handleOnChange}
            type="number"
            name="shelf_life"
          />
        </div>
        <div className="grid">
          <label htmlFor="how_to_use" className="font-medium mb-3">
            How to use
          </label>
          <textarea
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={updatedProduct.how_to_use}
            onChange={handleOnChange}
            name="how_to_use"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid">
          <label htmlFor="first_time" className="font-medium mb-3">
            First time
          </label>
          <textarea
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={updatedProduct.first_time}
            onChange={handleOnChange}
            name="first_time"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid">
          <label htmlFor="additional_info" className="font-medium mb-3">
            Additional Information
          </label>
          <textarea
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={updatedProduct.additional_info}
            onChange={handleOnChange}
            name="additional_info"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid">
          <label htmlFor="ingredients" className="font-medium ">
            Ingredients
          </label>
          <form
            className="flex border gap-2 py-2 px-2 mt-3 w-full md:w-[min(25rem,100%)] border-black"
            onSubmit={handleAddIngredients}
          >
            <input
              placeholder="Add ingredients"
              value={arrayVals.ingredientsVal}
              onChange={(e) =>
                setArrayVals({
                  ...arrayVals,
                  ingredientsVal: e.target.value,
                })
              }
              className="py-3 bg-transparent outline-none placeholder:text-black placeholder:font-light grow w-[90%]"
              onBlur={handleBlur}
            />
            <button className="bg-secondary px-5 text-white">ADD</button>
          </form>
          <ul className="grid gap-3 p-3 font-medium">
            {updatedProduct.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className=" list-disc list-inside grow flex items-center gap-3"
              >
                <BsX
                  className="text-error cursor-pointer text-xl shrink-0"
                  onClick={() => removeIngredient(index)}
                />
                <p>{ingredient}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid">
          <label htmlFor="benefits" className="font-medium ">
            Benefits
          </label>
          <form
            className="flex gap-1 border py-2 px-3 mt-3 w-[min(25rem,100%)] border-black"
            onSubmit={handleAddBenefits}
          >
            <input
              placeholder="Add benefit"
              value={arrayVals.benefitsVal}
              onChange={(e) =>
                setArrayVals({
                  ...arrayVals,
                  benefitsVal: e.target.value,
                })
              }
              className="py-3 bg-transparent outline-none placeholder:text-black placeholder:font-light grow w-[90%]"
              onBlur={handleBlur}
            />
            <button className="bg-secondary p-3 text-white w-24 ">ADD</button>
          </form>
          <ul className="grid gap-3 p-3 font-medium">
            {updatedProduct.benefits.map((benefit, index) => (
              <li
                key={index}
                className=" list-disc list-inside grow flex items-center gap-3"
              >
                <BsX
                  className="text-error cursor-pointer text-xl shrink-0"
                  onClick={() => removeBenefit(index)}
                />
                <p>{benefit}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid">
          <label htmlFor="images" className="font-medium ">
            Add Images
          </label>
          <form
            className="flex gap-1 border py-2 px-3 mt-3 w-[min(25rem,100%)] border-black items-center"
            onSubmit={handleAddImages}
          >
            <input
              type="file"
              onChange={(e) => {
                setArrayVals({
                  ...arrayVals,
                  imagesVal: e.target.files[0],
                });
              }}
              className="grow w-[90%]"
            />
            <button className="bg-secondary py-3 px-5 text-white">ADD</button>
          </form>
          <div className="grid gap-2 mt-5 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            {updatedProduct?.images.map((img, index) => (
              <div className="relative">
                <div
                  className="absolute right-0 top-0 bg-sub p-1"
                  onClick={() => removeImages(index)}
                >
                  <BsX className="text-error text-2xl" />
                </div>
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[min(40rem,100%)] mx-auto grid mt-10">
          <AppBtn
            label={isLoading ? "Saving Changes" : "Save Changes"}
            isDisabled={isLoading}
            onClick={handleUpdateProduct}
          />
        </div>
      </div>
    </div>
  ) : isError ? (
    <p className="py-10 text-center text-gray-700">{singleProductError.data}</p>
  ) : (
    <AppLoader />
  );
}
