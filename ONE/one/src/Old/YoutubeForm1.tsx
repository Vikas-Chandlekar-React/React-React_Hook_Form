import React from "react";
import { useForm } from "react-hook-form";

export const YoutubeForm1 = () => {
  console.log("YoutubeForm re-render");
  const form = useForm();

  // console.log("Form values = ", form);
  // console.log(Object.keys(form).length); // * : 15

  const { register } = form;
  // const random = register("username");
  // console.log(`🚀 ~ file: YoutubeForm.tsx:13 ~ YoutubeForm ~ random:`, random);

  const { name, onBlur, onChange, ref } = register("username");

  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        {/* <input type="text" name="username" id="username" /> */}
        {/* DESC :❌ Bad way to register */}
        <input
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        />

        <label htmlFor="email">E-mail</label>
        {/* DESC :✅ Good way to register */}
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>
    </div>
  );
};
