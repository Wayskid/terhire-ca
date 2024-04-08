import React, { useContext, useEffect, useRef, useState } from "react";
import { useAddPostMutation } from "../../../services/appApi.js";
import AppInput from "../../../components/reuseable/AppInput.jsx";
import AppBtn from "../../../components/reuseable/AppBtn.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import appContext from "../../../context/AppContext.jsx";
import { useSocket } from "../../../context/SocketProvider.jsx";
import { Editor } from "@tinymce/tinymce-react";

export default function AddPost() {
  const [setShowMenu] = useOutletContext();
  const { userInfo } = useContext(appContext);

  const [addPostVal, setAddPostVal] = useState({
    post_title: "",
    post_summary: "",
    post_body: "",
    post_image: "",
  });

  const editorRef = useRef(null);
  function handleOnChange(e) {
    setAddPostVal({
      ...addPostVal,
      [e.target.name]: e.target.value,
    });
  }

  //Convert image to base64
  // function convertToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // }

  //Handle add image
  // const [previewVal, setPreviewVal] = useState([]);
  // async function handleAddImages(e) {
  //   e.preventDefault();
  //   if (arrayVals.imagesVal) {
  //     setPreviewVal([...previewVal, arrayVals.imagesVal]);
  //     const base64 = await convertToBase64(arrayVals.imagesVal);
  //     setAddPostVal({
  //       ...addPostVal,
  //       images: [...addPostVal.images, base64],
  //     });
  //   }
  // }

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
  // }, [addPostVal.images]);

  //Handle create product
  const navigate = useNavigate();
  const [addPostApi] = useAddPostMutation();
  const socket = useSocket();
  function handleAddPost() {
    addPostApi({
      token: userInfo.token,
      body: {
        ...addPostVal,
        post_body: editorRef.current && editorRef.current.getContent(),
      },
      user_id: userInfo._id,
    })
      .unwrap()
      .then((result) => {
        socket.emit("add_post", result);
        navigate("../blog");
      });
  }

  return (
    <div className="p-4 md:p-6">
      <div className="md:flex mb-10 justify-between items-center">
        <div
          className="burger inline-block py-3 px-1 cursor-pointer md:hidden"
          onClick={() => setShowMenu(true)}
        >
          <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
          <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
          <div className="w-[1.9rem] h-[1.5px] bg-black"></div>
        </div>
        <p className="header text-4xl">Add Post</p>
        <AppBtn label="All Posts" onClick={() => navigate("../blog")} />
      </div>
      <div className="grid gap-7">
        <AppInput
          label="Title"
          name="post_title"
          value={addPostVal.post_title}
          onChange={handleOnChange}
          type="text"
        />
        <div className="grid">
          <label htmlFor="summary" className="font-medium mb-3">
            Summary
          </label>
          <textarea
            name="post_summary"
            className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
            rows={5}
            value={addPostVal.post_summary}
            onChange={handleOnChange}
          />
        </div>
        <div className="h-[350px]">
          <Editor
            apiKey="ltb4d4thwo6ihvut45a5v0053p3ap887qkumr2z82xlunpzl"
            init={{
              height: "100%",
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
            initialValue="Write new blog post..."
            onInit={(evt, editor) => (editorRef.current = editor)}
          />
        </div>
        <div className="grid">
          <label htmlFor="images" className="font-medium ">
            Add Images
          </label>
          <form
            className="flex gap-1 border py-2 px-3 mt-3 w-[min(25rem,100%)] border-black items-center"
            // onSubmit={handleAddImages}
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
          <div className="flex gap-2 mt-5">
            {/* {imgPreview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="w-28 h-24 object-cover"
              />
            ))} */}
          </div>
        </div>
        <div className="w-[min(40rem,100%)] mx-auto grid mt-10">
          <AppBtn label="Publish" onClick={handleAddPost} />
        </div>
      </div>
    </div>
  );
}
