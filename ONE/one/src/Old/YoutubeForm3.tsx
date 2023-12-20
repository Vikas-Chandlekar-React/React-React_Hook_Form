import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type TFormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YoutubeForm3 = () => {
  console.log("YoutubeForm re-render");
  renderCount++;

  const { register, control, handleSubmit } = useForm<TFormValues>();

  const onSubmit = (data: TFormValues) => {
    console.log("Form submitted = ", data);
  };

  return (
    <div>
      <h1>Youtube Form : ({renderCount})</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
