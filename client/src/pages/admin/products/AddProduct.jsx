import React, { useContext, useEffect, useState } from "react";
import {
  useAddProductsMutation,
  useGetProductsQuery,
} from "../../../services/appApi";
import AppInput from "../../../components/reuseable/AppInput.jsx";
import AppBtn from "../../../components/reuseable/AppBtn.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import AppInputSelect from "../../../components/reuseable/AppInputSelect";
import appContext from "../../../context/AppContext.jsx";
import { useSocket } from "../../../context/SocketProvider.jsx";
import { BsX } from "react-icons/bs";

export default function AddProduct() {
  const [setShowMenu] = useOutletContext();
  const { userInfo } = useContext(appContext);
  const [arrayVals, setArrayVals] = useState({
    ingredientsVal: "",
    benefitsVal: "",
    imagesVal: "",
  });

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

  const [addProductVal, setAddProductVal] = useState({
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
    discount: 0,
  });

  function handleOnChange(e) {
    setAddProductVal({
      ...addProductVal,
      [e.target.name]: e.target.value,
    });
  }

  function handleBlur(e) {
    setAddProductVal({
      ...addProductVal,
      [e.target.name]: e.target.value.trim(),
    });
  }

  //Handle add ingredients
  function handleAddIngredients(e) {
    e.preventDefault();
    if (arrayVals.ingredientsVal.trim()) {
      if (
        !addProductVal.ingredients.includes(arrayVals.ingredientsVal.trim())
      ) {
        setAddProductVal({
          ...addProductVal,
          ingredients: [...addProductVal.ingredients, arrayVals.ingredientsVal],
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
      if (!addProductVal.benefits.includes(arrayVals.benefitsVal.trim())) {
        setAddProductVal({
          ...addProductVal,
          benefits: [...addProductVal.benefits, arrayVals.benefitsVal],
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
    const array = [...addProductVal.ingredients];
    array.splice(index, 1);

    setAddProductVal({
      ...addProductVal,
      ingredients: array,
    });
  }

  //Handle remove benefits
  function removeBenefit(index) {
    const array = [...addProductVal.benefits];
    array.splice(index, 1);

    setAddProductVal({
      ...addProductVal,
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
  async function handleAddImages(e) {
    e.preventDefault();
    if (arrayVals.imagesVal) {
      const base64 = await convertToBase64(arrayVals.imagesVal);
      setAddProductVal({
        ...addProductVal,
        images: [...addProductVal.images, base64],
      });
    }
  }

  function removeImages(index) {
    const array = [...addProductVal.images];
    array.splice(index, 1);

    setAddProductVal({
      ...addProductVal,
      images: array,
    });
  }

  //Handle create product
  const navigate = useNavigate();
  const [addProductApi, { isLoading }] = useAddProductsMutation();
  const socket = useSocket();
  function handleAddProduct() {
    addProductApi({
      token: userInfo.token,
      body: addProductVal,
      user_id: userInfo._id,
    })
      .unwrap()
      .then((result) => {
        socket.emit("add_product", result);
        navigate("../products");
      });
  }

  return (
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
        <p className="header text-4xl col-span-2">Add Product</p>
        <div className="col-start-2 row-start-1 grid">
          <AppBtn
            label="All Products"
            onClick={() => navigate("../products")}
          />
        </div>
      </div>
      <div className="grid gap-7">
        <div className="grid gap-7 md:flex md:[&>*]:grow">
          <AppInput
            label="Title"
            name="title"
            value={addProductVal.title}
            onChange={handleOnChange}
            type="text"
            onBlur={handleBlur}
          />
          <AppInput
            label="Name"
            name="name"
            value={addProductVal.name}
            onChange={handleOnChange}
            type="text"
            onBlur={handleBlur}
          />
        </div>
        <AppInput
          label="Category"
          name="category"
          value={addProductVal.category}
          onChange={handleOnChange}
          type="text"
          onBlur={handleBlur}
        />
        <div className="grid">
          <label htmlFor="summary" className="font-medium mb-3">
            Summary
          </label>
          <textarea
            name="summary"
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={addProductVal.summary}
            onChange={handleOnChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="grid">
          <label htmlFor="description" className="font-medium mb-3">
            Description
          </label>
          <textarea
            name="description"
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={7}
            value={addProductVal.description}
            onChange={handleOnChange}
          />
        </div>
        <div className="grid gap-7 md:flex md:[&>*]:grow">
          <AppInput
            label="Price (CAD)"
            name="price"
            value={addProductVal.price}
            onChange={handleOnChange}
            type="number"
          />
          <AppInput
            label="Discount (%)"
            name="discount"
            value={addProductVal.discount}
            onChange={handleOnChange}
            type="number"
          />
        </div>
        <div className="grid gap-7 md:flex md:[&>*]:grow">
          <AppInput
            label="Weight"
            name="weight"
            value={addProductVal.weight}
            onChange={handleOnChange}
            type="text"
          />
          <AppInput
            label="In Stock"
            name="in_stock"
            value={addProductVal.in_stock}
            onChange={handleOnChange}
            type="number"
          />
        </div>
        <div className="grid gap-7 md:flex md:[&>*]:grow">
          <div className="grid mb-5 md:mb-0 item-center">
            <p className="mr-3 font-medium">Pairs With</p>
            <AppInputSelect
              selection={pairsWithArray}
              onChange={(e) =>
                setAddProductVal({
                  ...addProductVal,
                  pairs_with: e.target.value,
                })
              }
              val={addProductVal.pairs_with}
            />
          </div>
          <AppInput
            label="Shelf Life (months)"
            name="shelf_life"
            value={addProductVal.shelf_life}
            onChange={handleOnChange}
            type="number"
          />
        </div>
        <div className="grid">
          <label htmlFor="how_to_use" className="font-medium mb-3">
            How to use
          </label>
          <textarea
            name="how_to_use"
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={addProductVal.how_to_use}
            onChange={handleOnChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="first_time" className="font-medium mb-3">
            First time
          </label>
          <textarea
            name="first_time"
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={addProductVal.first_time}
            onChange={handleOnChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="additional_info" className="font-medium mb-3">
            Additional Information
          </label>
          <textarea
            name="additional_info"
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={addProductVal.additional_info}
            onChange={handleOnChange}
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
          <ul className="grid gap-2 p-3 font-medium">
            {addProductVal.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="list-disc list-inside grow flex items-center gap-3"
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
            <button className="bg-secondary p-3 text-white w-24">ADD</button>
          </form>
          <ul className="grid gap-2 p-3 font-medium">
            {addProductVal.benefits.map((benefit, index) => (
              <li
                key={index}
                className="list-disc list-inside grow flex items-center gap-3"
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
            {addProductVal.images.map((img, index) => (
              <div className="relative" key={index}>
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
            label={isLoading ? "Publishing" : "Publish"}
            onClick={handleAddProduct}
            isDisabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
