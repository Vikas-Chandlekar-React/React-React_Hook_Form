import React, { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type TFormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export const YoutubeForm21 = () => {
  console.log("YoutubeForm re-render");
  renderCount++;

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = useForm<TFormValues>({
    defaultValues: {
      username: "Karan",
      email: "",
      channel: "ReactJS",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  // console.log({ touchedFields, dirtyFields, isDirty, isValid });
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  // const useFieldObj = useFieldArray({
  //   name: "phNumbers",
  //   control,
  // });

  // console.log("useFieldObj = ", useFieldObj);

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  // console.log("fields = ", fields);

  const onSubmit = async (data: TFormValues) => {
    // FAKE 5 seconds delay
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Form submitted = ", data);
  };

  const onError = (errors: FieldErrors<TFormValues>) => {
    console.log("Form Errors : ", errors);
  };

  // POINT : Watch single field
  // const watchUsername = watch("username");
  // POINT : Watch multiple fields
  // const watchMultipleValues = watch(["username", "age"]);
  // POINT : Watch whole form
  // const watchWholeForm = watch();

  // POINT : This wil watch entire form and not re-render on any change in form
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     // console.log(`Value has changed to ${JSON.stringify(value)}`);
  //     console.log("value = ", value);
  //   });

  //   return () => {
  //     return subscription.unsubscribe();
  //   };
  // }, [watch]);

  const handleGetValues = () => {
    // POINT : It retrieve all fields values
    // console.log("Get Values = ", getValues());
    // POINT : It retrieve single field value
    // console.log("Get Values of single field Values = ", getValues("social"));
    // POINT : It retrieve multiple fields values
    console.log(
      "Get Values of multiple fields Values = ",
      getValues(["channel", "social"])
    );
  };

  const handleSetValue = () => {
    /** POINT : It will set value
     * but validate : false, touched : false, dirty : false
     */
    // setValue("username", "");

    /** POINT : It will set value
     * but validate : true, touched : true, dirty : true
     */
    setValue("username", "", {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      // [ ] : Explore Reset as yourself
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <h1>Youtube Form : ({renderCount})</h1>
      {/* <h3>Watch Username Value : {watchUsername}</h3> */}
      {/* <h3>Watch Multiple Values = {watchMultipleValues}</h3> */}
      {/* <h4>Watch Whole Form : {JSON.stringify(watchWholeForm)}</h4> */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // disabled
            {...register("username", {
              required: "Username is required!",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
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
                  console.log("isAdmin validation run");
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  console.log("notBlackListed validation run");
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  console.log("emailAvailable validation run");
                  const URL = `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`;
                  const response = await fetch(URL);
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
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
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "Please provide your twitter",
              },
              // disabled: true,
              // POINT : Condition disabled field :
              disabled: watch("channel") === "",
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: {
                value: true,
                message: "Please provide your facebook",
              },
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Primary Phone is required!",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "Secondary Phone is required!",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <div>
          <label htmlFor="">List of Phone Numbers : </label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add Phone Number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              /** NOTE : If you don't pass valueAsNumber = true
               * then age value is string.
               * Hence, you pass it so age value is number */
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required!",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              /** NOTE : If you don't pass valueAsDate = true
               * then dob value is string.
               * Hence, you pass it so dob value is Date */
              valueAsDate: true,
              required: { value: true, message: "Date of Birth is required" },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        {/* <button>Submit</button> */}
        {/* <button disabled={!isValid || !isDirty}>Submit</button> */}
        {/* <button disabled={!isValid || !isDirty || isSubmitting}>Submit</button> */}
        <button disabled={!isDirty || isSubmitting}>Submit</button>
        <button onClick={() => reset()}>Reset</button>

        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>

        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
