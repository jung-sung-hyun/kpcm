"use client";
import { useRef, useState, useMemo, useEffect } from "react";

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// from https://hanna-log.tistory.com/entry/nextjs%EC%97%90%EC%84%9C-reactquill-useRef-%EC%82%AC%EC%9A%A9#%EA%B0%9C%EC%84%A0-1
// from http://shinejaram.tistory.com/71
// from https://stackoverflow.com/questions/60458247

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill")

        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />; // ref with dynamically => forwardedRef
    },
    {
        ssr: false,
    }
)

// const QuillRef = useRef < ReactQuill > (false);

// useEffect(() => {
//     if (props.isEdit) {
//         if (QuillRef.current) {
//             const quill = QuillRef.current.getEditor();
//             quill?.clipboard.dangerouslyPasteHTML(0, "test")
//         }
//     }
// }, [QuillRef])

async function uploadFile(fileInput) {
    var formdata = new FormData();
    formdata.append("file", fileInput.files[0]);

    var requestOptions = {method: 'POST', body: formdata };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cm/cmsc99010000/uploadFile`, requestOptions);
    const result = await response.json();
    //console.log(result);

    return result;
}

export default function QuillWrapper({ value, onChange, ...props }) {
    const quillRef = useRef(false);
    
    const [contents, setContents] = useState("");

    const imageHandler = () => {
        console.log("start imageHandler");
        const quill = quillRef.current.getEditor();
        let fileInput = quill.root.querySelector("input.ql-image[type=file]");

        if (fileInput === null) {
            fileInput = document.createElement("input");
            fileInput.setAttribute("type" ,"file");
            fileInput.setAttribute(
                "accept",
                "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
            );
            fileInput.classList.add("ql-image");

            fileInput.addEventListener("change", () => {
                const files = fileInput.files;
                const range = quill.getSelection(true);

                console.log("files.length::"+files.length)

                if (!files || !files.length) {
                    console.log("No files selected");
                    return;
                }

                uploadFile(fileInput)
                    .then((response) => {
                        const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/cm/cmsc99010000/downloadFile/` + response.url;
                        //console.log("image url::", imageUrl)
                        quill.enable(true);
                        quill.insertEmbed(range.index, "image", imageUrl);
                        quill.setSelection(range.index + 1);
                        fileInput.value = "";
                    })
                    .catch((error) => {
                        console.log("quill image upload failed");
                        console.log(error);
                        quill.enable(true);
                    })
            });
            quill.root.appendChild(fileInput);
        }
        fileInput.click();
    }

    // the editor keeps rerendered resulting in losing focus
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                    [
                        "link",
                        "image",
                        //"video"
                    ],
                    ["clean"], // remove formatting button
                ],
                handlers: { image: imageHandler }, // custom image handler
            },
        }), []
    );

    return (
        <ReactQuill
            forwardedRef={quillRef}
            value={contents}
            onChange={setContents}
            modules={modules}
            theme="snow"
            placeholder="내용을 입력해주세요."
        />
    );

}