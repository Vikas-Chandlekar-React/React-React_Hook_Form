import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

export const YoutubeForm2 = () => {
  console.log("YoutubeForm re-render");
  renderCount++;

  const { register, control } = useForm();

  return (
    <div>
      <h1>Youtube Form : ({renderCount})</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username1")} />

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
