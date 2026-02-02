import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const logInFormSchema = z.object({
  email: z.string().regex(emailRegex, {
    error: "Correo Invalido",
  }),
  password: z
    .string()
    .min(8, {
      error: "La contraseña debe tener un minino de 8 caracteres.",
    })
    .regex(passwordRegex, {
      error:
        "La contrseña debe contener al menos una mayuscula, una minuscula, un numero, y un cracter especial.",
    }),
  rememberMe: z.boolean(),
});

export const signUpFormSchema = z
  .object({
    fullName: z.string("El nombre es obligatorio.").min(5, {
      error: "El nombre es invalido",
    }),
    email: z.string("El correo es obligatoio.").regex(emailRegex, {
      error: "Correo Invalido",
    }),
    password: z
      .string("La contraseña es obligatoria.")
      .min(8, {
        error: "La contraseña debe tener un minino de 8 caracteres.",
      })
      .regex(passwordRegex, {
        error:
          "La contrseña debe contener al menos una mayuscula, una minuscula, un numero, y un cracter especial.",
      }),

    passwaord_validation: z
      .string("La confimacion de la contraseña es olbigatoria")
      .min(8, {
        error: "La contraseña debe tener un minino de 8 caracteres.",
      }),
  })
  .superRefine(({ passwaord_validation, password }, ctx) => {
    if (passwaord_validation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "La contraseña no coinciden.",
        path: ["passwaord_validation"],
      });
    }
  });

export const forgotPasswordSchema = z.object({
  email: z.string().regex(emailRegex, {
    error: "Correo Invalido",
  }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string("La contraseña es obligatoria.")
    .min(8, {
      error: "La contraseña debe tener un minino de 8 caracteres.",
    })
    .regex(passwordRegex, {
      error:
        "La contrseña debe contener al menos una mayuscula, una minuscula, un numero, y un cracter especial.",
    }),

  passwaord_validation: z
    .string("La confimacion de la contraseña es olbigatoria")
    .min(8, {
      error: "La contraseña debe tener un minino de 8 caracteres.",
    }),

  token: z.string("Token Invalido"),
});
