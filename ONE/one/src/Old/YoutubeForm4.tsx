import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type TFormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YoutubeForm4 = () => {
  console.log("YoutubeForm re-render");
  renderCount++;

  const { register, control, handleSubmit } = useForm<TFormValues>();

  const onSubmit = (data: TFormValues) => {
    console.log("Form submitted = ", data);
  };

  return (
    <div>
      <h1>Youtube Form : ({renderCount})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Username is required!",
          })}
        />

        <label htmlFor="email">E-mail</label>
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
          })}
        />

        <label htmlFor="channel">Channel</label>
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

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
