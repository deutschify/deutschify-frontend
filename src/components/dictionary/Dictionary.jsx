import { useState } from "react";


import ResultList from "./ResultList";
import { useStore } from "../../store";
import { Navigate } from "react-router";



import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import ImageDictionary from "../../../public/images/dictionary1.png";


const Dictionary = () => {
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState("");

    const currentUser = useStore((state) => state.currentUser);

    const handleInputChange = (e) => setValue(e.target.value);

    const handleSubmit = () => {
        setInputValue(value);
        setValue("");
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            setInputValue(value);
            setValue("");
        }
    };

    return (
        <>
            {currentUser.accessGroups?.includes("loggedInUsers") ? (
                <div className="    xl:grid grid-cols-2 w-full gap-[15rem] ml-2 ">
                    <div className=" h-100% container mx-auto px-3 py-8">
                        <h1 className="text-3xl font-bold  text-white">
                            Simple Dictionary
                        </h1>
                        <p className=" mt-1 mb-10 text-slate-300 text-lg">
                            Find definisions for word
                        </p>
                        <input
                            className=" md:hidden py-2 px-2 ml-6 w-[6rem]  "
                            type="tex  "
                            placeholder="language"
                        />
                        <input
                            className="md:hidden py-2 px-2 ml-6 w-[6rem]  "
                            type="text "
                            placeholder="language"
                        />
                        <div className="flex items-start justify-start mt-5">
                            <div className="flex border-2 border-gray-200 rounded">
                                <input
                                    className="px-4 py-2 md:w-80"
                                    type="text"
                                    placeholder="Search..."
                                    onChange={handleInputChange}
                                    value={value}
                                    onKeyDown={handleInputKeyDown}
                                />
                                <button
                                    className="bg-blue-400 border-l px-4 py-2 text-white"
                                    onClick={handleSubmit}
                                >
                                    Search
                                </button>
                            </div>
                            <input
                                className="hidden md:block py-2 ml-6 w-[6rem]"
                                type="text "
                                placeholder="language"
                            />
                            <input
                                className="hidden md:block py-2 ml-6 w-[6rem]"
                                type="text "
                                placeholder="language"
                            />
                        </div>

                        {inputValue && (
                            <>
                                <h3 className="text-gray-50  mt-4">
                                    Result for:{" "}
                                    <span className="text-white font-bold">
                                        {inputValue}
                                    </span>
                                </h3>
                                <ResultList inputValue={inputValue} />
                            </>
                        )}
                    </div>
                    <div className="flex  justify-end items-center mr-4 mt-40 ">
                        <div className="">
                            <img
                                className="hidden xl:block    "
                                src={Image}
                                alt=""
                            />
                        </div>
                    </div>{" "}
                </div>
            ) : (
                <>
                    <p>Login to see the dictionary</p>
                    <Navigate replace to="/login" />

                </>
            )}
        </>
    );

};

export default Dictionary;
