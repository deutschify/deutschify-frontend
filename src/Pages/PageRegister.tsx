import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { IUserLoginForm, IUserRegistrationForm } from "../interfaces";
import { Routes, Route } from "react-router";
import { NavLink } from "react-router-dom";
import PageLogin from "./PageLogin";
import { useStore } from "../store";

interface IPageRegistrationProps {
    baseUrl: string;
    // setCurrentUser: React.Dispatch<React.SetStateAction<IUserLoginForm>>;
}

interface ILanguage {
    code: number;
    name: string;
}
interface ICountry {
    name: string;
}

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Vorname soll keine Nummer haben")
        .required(),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Nachname soll keine Nummer haben")
        .required(),
    email: yup.string().email().required(),
    password: yup.string().min(3).max(12).required(),
    repeatPassword: yup.string().oneOf([yup.ref("password"), null]),
    nationality: yup.string().required("Required"),
    language: yup.string().required("Required"),
});

const PageRegister = (props: IPageRegistrationProps) => {
    const [success, setSuccess] = useState(false);
    const [notification, setNotification] = useState("");
    const { baseUrl } = props;
    const fetchLanguages = useStore((state) => state.fetchLanguages);
    const languages = useStore((state) => state.languages);
    const countries = useStore((state) => state.countries);

    // useEffect(() => {
    //     fetchLanguages();
    // }, []);

    const {
        setValue,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IUserRegistrationForm>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IUserRegistrationForm> = async (
        data: IUserRegistrationForm
    ) => {
        const { firstName, lastName, email, password, language, nationality } =
            data;

        const toSend = await axios.post(
            `${baseUrl}/register`,
            {
                firstName,
                lastName,
                email,
                password,
                language,
                nationality,
                safeOriginCode: import.meta.env.VITE_SAFE_ORIGIN_CODE,
            },
            { withCredentials: true }
        );
        if (toSend.data.message === "Email is registered!") {
            setNotification("Account already in use.");
            console.log(toSend);
            console.log(errors);
            console.log(notification);
        } else {
            setSuccess(true);
            console.log(toSend.data.message);
            // navigate('/login')
        }
    };

    return (
        <div>
            <h1 className="text-2xl">Welcome to Register</h1>
            {success ? (
                <p>go to your Email to verify your account.</p>
            ) : (
                notification
            )}

            <form
                className="bg-white shadow-md rounded flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <input
                        defaultValue=""
                        {...register("firstName")}
                        placeholder="firstName"
                    />
                    {errors.firstName && <p>{errors?.firstName?.message}</p>}
                </div>
                <div>
                    <input
                        defaultValue=""
                        {...register("lastName")}
                        placeholder="lastName"
                    />
                    {errors.lastName && <p>{errors?.lastName?.message}</p>}
                </div>
                <div>
                    <input
                        defaultValue=""
                        {...register("email")}
                        placeholder="email"
                    />
                    {errors.email && <p>{errors?.email?.message}</p>}
                </div>
                <div>
                    <input
                        defaultValue=""
                        {...register("password")}
                        placeholder="password"
                    />
                    {errors.password && <p>{errors?.password?.message}</p>}
                </div>
                <div>
                    <input
                        placeholder="repeat-password"
                        defaultValue=""
                        {...register("repeatPassword")}
                    />
                    {errors.repeatPassword && <p>Password don't match!</p>}
                </div>
                <div>
                    <select
                        {...register("language")}
                        onChange={(e) =>
                            setValue("language", e.target.value, {
                                shouldValidate: true,
                            })
                        } // Using setValue
                        defaultValue=""
                        name="language"
                    >
                        {languages.map((language: ILanguage) => {
                            return (
                                <option
                                    key={language.code}
                                    value={`${language.code}`}
                                >
                                    {" "}
                                    {language.name}
                                </option>
                            );
                        })}
                        {/* <option disabled>Language</option>
                        <option value="deutsch">deutsch</option> */}
                    </select>
                </div>
                <div>
                    <select 
                            {...register("nationality")}
                        onChange={(e) =>
                            setValue("nationality", e.target.value, {
                                shouldValidate: true,
                            })
                        } // Using setValue
                        defaultValue=""
                        name="nationality"
                    >
                        {countries.map((country: ICountry) => {
                            return (
                                <option
                                    key={country.name}
                                    value={`${country.name}`}
                                >
                                    {" "}
                                    {country.name.substring(0, 18)}
                                </option>
                            );
                        })}
                        {/* <option disabled>Nationality</option>
                        <option value="deutsche">Deutsche</option> */}
                    </select>
                </div>
                <div>
                    <input type="submit" value="Sign Up" />
                </div>
            </form>
            <div className="form-group">
                <span className="mx-8">
                    Already have an Account?
                    <span className="line">
                        <NavLink
                            to="/login"
                            className="text-palette-40 mx-4 underline"
                        >
                            Sign In
                        </NavLink>
                    </span>
                    <Routes>
                        <Route
                            path="/login"
                            element={<PageLogin baseUrl="" />}
                        />
                    </Routes>
                </span>
            </div>
        </div>
    );
};

export default PageRegister;
function setValue(
    arg0: string,
    value: string,
    arg2: { shouldValidate: boolean }
): void {
    throw new Error("Function not implemented.");
}
