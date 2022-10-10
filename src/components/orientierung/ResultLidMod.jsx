import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useStore } from "../../store";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect } from "react";
import Modelltest from "./LiDMod";
function ResultLidMod() {
    // const { category } = useParams();

    const result = useStore((state) => state.result);
    const questions = useStore((state) => state.questions);

    const cld = new Cloudinary({
        cloud: {
            cloudName: "dsyhfgbli",
        },
    });

    const fetchImage = (publicId) => {
        const myImg = cld.image(`deutschify/${publicId}`);
        return myImg;
    };

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="w-full">
            <div
                className="bg-palette-50 m-10 w-52 md:w-96 text-center md:text-3xl text-palette-60 p-4 border-4 border-palette-80 rounded-xl shadow-outer hover:bg-palette-60 hover:text-palette-50 hover:shadow-inner"
                
            >
                <NavLink className="" to="/lernbereich/:category/modelltest" element={<Modelltest />}>
                    Test erneut starten
                </NavLink>
            </div>

            <div className="flex justify-center m-10">
                {" "}
                <div
                    className={
                        `${
                            result.includes("nicht")
                                ? "bg-palette-70 border-palette-80 text-palette-80"
                                : "bg-palette-40 border-palette-30 text-palette-30"
                        } ` +
                        "border-8 w-10/12 rounded-xl  text-4xl text-center p-8"
                    }
                >
                    {result}
                </div>
            </div>

            {questions.map((qu, index) => (
                <div className="flex justify-center" key={index}>
                    <div className=" bg-palette-80 m-4 md:w-6/12 p-4 text-palette-60  text-center border-4 border-palette-50 rounded-xl">
                        <div className="text-xl text-palette-60 flex justify-center p-4 border-4 bg-palette-50 border-palette-60 w-16 md:w-1/12 rounded-full">
                            {index + 1}
                        </div>
                        <div className="bg-palette-50 border-4 border-palette-60 rounded-xl m-8 p-4">
                            {qu.question}
                        </div>
                        <div className="flex justify-center">
                            {" "}
                            <div className="bg-palette-60 border-palette-50  w-max rounded-xl">
                                {qu.imageURL && (
                                    <AdvancedImage
                                        cldImg={fetchImage(qu.imageURL)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            {Object.values(
                                Object.fromEntries(
                                    Object.entries(qu).filter(([key]) =>
                                        key.includes("answer")
                                    )
                                )
                            ).map((choice, i) => {
                                return (
                                    <div
                                        className={`border-4 border-palette-60 rounded-xl w-4/6 m-6 p-4  ${
                                            Object.keys(qu).find(
                                                (key) => qu[key] === choice
                                            ) === qu.chosenAnswer &&
                                            Object.keys(qu).find(
                                                (key) => qu[key] === choice
                                            ) === qu.correctAnswer
                                                ? "bg-palette-30"
                                                : ""
                                        }${
                                            Object.keys(qu).find(
                                                (key) => qu[key] === choice
                                            ) !== qu.chosenAnswer &&
                                            Object.keys(qu).find(
                                                (key) => qu[key] === choice
                                            ) !== qu.correctAnswer
                                                ? "bg-palette-50"
                                                : ""
                                        } ${
                                            Object.keys(qu).find(
                                                (key) => qu[key] === choice
                                            ) === qu.correctAnswer
                                                ? "bg-palette-30"
                                                : ""
                                        }${
                                            Object.keys(qu).find(
                                                (key) => qu[key] === choice
                                            ) === qu.chosenAnswer
                                                ? "bg-palette-70"
                                                : ""
                                        }
                                      
                                        `}
                                        key={i}
                                    >
                                        {choice}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResultLidMod;
