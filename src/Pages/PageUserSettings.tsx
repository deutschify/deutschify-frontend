import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

import axios from "axios";
import {BiImageAdd} from 'react-icons/bi'
import { IUserEditForm } from "../interfaces";
import { baseUrl, useStore } from "../store";

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Vorname soll keine Nummer haben"),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Nachname soll keine Nummer haben"),
    // password: yup.string().password().notRequired().default(),
    changePassword: yup.string(),
    password: yup.string().when("changePassword", {
        is: "password",
        then: yup.string().password(),
    }),
    repeatPassword: yup.string().oneOf([yup.ref("password"), null]),
    imagePublicId: yup
        .mixed()
        .test("type", "it should be of jpeg or png format", (value) => {
            return (value && value[0]?.type === "image/jpeg") || "image/png";
        }),
    // .test("fileSize", "The file is too large", (value) => {
    //     return value && value[0]?.size < 1800000;
    // })
});

const PageUserSettings = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<IUserEditForm>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const password = watch("password");
    const currentUser = useStore((state) => state.currentUser);

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: "dsyhfgbli",
        },
    });

    // cld.image returns a CloudinaryImage with the configuration set.
    const myImage = cld.image(currentUser.imagePublicId);
    myImage
        .resize(
            thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face()))
        );

    const onSubmit: SubmitHandler<IUserEditForm> = async (
        data: IUserEditForm
    ) => {
        const { firstName, lastName, password, imagePublicId, language } = data;
        // const sendRequest = await axios.post(`${baseUrl}/${currentUser.username}`)
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="relative h-40 w-40">
                        <AdvancedImage cldImg={myImage} className="rounded-full absolute"/>
                        <div className="absolute bottom-0 right-0">
                            <input
                                id="avatar"
                                type="file"
                                {...register("imagePublicId")}
                                accept=".jpeg, .jpg, .png, .svg"
                                hidden
                            />
                            <label htmlFor="avatar"><BiImageAdd size='50px' style={{color:'blue'}}/></label>
                        </div>
                        {errors.imagePublicId && (
                            <p>{errors.imagePublicId?.message}</p>
                        )}
                    </div>
                    <div>
                        {currentUser.firstName + " " + currentUser.lastName}
                    </div>
                </div>
                <div>
                    <div>
                        <h2>User Information</h2>
                    </div>
                    <div>
                        <h4>change your name</h4>
                        <input
                            defaultValue=""
                            {...register("firstName")}
                            placeholder="firstName"
                        />
                        {errors.firstName && (
                            <p>{errors?.firstName?.message}</p>
                        )}
                    </div>
                    <div>
                        <input
                            defaultValue=""
                            {...register("lastName")}
                            placeholder="lastName"
                        />
                        {errors.lastName && <p>{errors?.lastName?.message}</p>}
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <h4>change Password</h4>
                        </div>
                        <input
                            defaultValue={password}
                            {...register("password")}
                            placeholder="password"
                        />
                        {errors.password && <p>{errors?.password?.message}</p>}
                    </div>
                    {password && (
                        <div>
                            <input
                                placeholder="repeat-password"
                                defaultValue=""
                                {...register("repeatPassword")}
                            />
                            {errors.repeatPassword && (
                                <p>Password don't match!</p>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <h4>change the language</h4>
                    </div>
                    <div>
                        <select
                            {...register("language")}
                            defaultValue={currentUser.language}
                        >
                            <option disabled>Language</option>
                            <option value="deutsch">deutsch</option>
                        </select>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Save" />
                </div>
            </form>
        </div>
    );
};

export default PageUserSettings;