import React from "react";
import { useForm } from "react-hook-form";

export const YoutubeForm = () => {
  console.log("YoutubeForm re-render");

  const { register } = useForm();

  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username1")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>
    </div>
  );
};
