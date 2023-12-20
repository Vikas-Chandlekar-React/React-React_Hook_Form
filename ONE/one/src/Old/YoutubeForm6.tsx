import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type TFormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YoutubeForm6 = () => {
  console.log("YoutubeForm re-render");
  renderCount++;

  const { register, control, handleSubmit, formState } = useForm<TFormValues>();

  const { errors } = formState;

  const onSubmit = (data: TFormValues) => {
    console.log("Form submitted = ", data);
  };

  return (
    <div>
      <h1>Youtube Form : ({renderCount})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <div className="form-control">
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required!",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <label htmlFor="email">E-mail</label>
        <div className="form-control">
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              // POINT : Single custom validation rule
              // validate: (fieldValue) => {
              //   // console.log("fieldValue = ", fieldValue);

              //   return (
              //     fieldValue !== "admin@example.com" ||
              //     "Enter a different email address"
              //   );
              // },

              // POINT : One and more custom validation rules
              validate: {
                isAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <label htmlFor="channel">Channel</label>
        <div className="form-control">
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required!",
              },
              minLength: 3,
              maxLength: {
                value: 8,
                message: "Must be less than 8 characters long",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
