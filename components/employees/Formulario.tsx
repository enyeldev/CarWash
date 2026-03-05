"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { createEmployeesFromType } from "@/src/types/employees";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployeesFromSchema } from "@/src/schema/employees";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { crearEmployeesAction } from "@/src/actions/employees";
import { boolean } from "zod";

const Formulario = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const registroDefaulValue: createEmployeesFromType = {
    name: "",
    phone: "",
    document: "",
    isActive: false,
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<createEmployeesFromType>({
    defaultValues: registroDefaulValue,
    resolver: zodResolver(createEmployeesFromSchema),
  });

  const onSubmit = async (data: createEmployeesFromType) => {
    const response = await crearEmployeesAction(data);

    if (!response.ok) {
      if (response.error.code === "VALIDATION_ERROR") {
        response.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }

      toast.error(response.error.message);
      return;
    }
    toast.success("Empleado creado correctamente");

    router.refresh();
    setIsDialogOpen(false);
    reset();
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full sm:w-auto"
      >
        <Plus className="h-4 w-4 mr-2" />
        Agregar Empleado
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {/* {editingEmployee ? "Editar Empleado" : "Agregar Empleado"} */}
              agregrar Empleado
            </DialogTitle>
            <DialogDescription>
              Completa la información del empleado
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid gap-4 py-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <div className="grid gap-2">
                        <FieldLabel htmlFor="name">Nombre Completo</FieldLabel>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Daniel Peres"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="document"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <div className="grid gap-2">
                        <FieldLabel htmlFor="name">Documento</FieldLabel>
                        <Input {...field} type="text" placeholder="?" />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="809-123-456"
                          />
                        </div>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <div className="grid gap-2">
                          <FieldLabel>Estado</FieldLabel>

                          <Select
                            value={field.value ? "true" : "false"}
                            onValueChange={(value) =>
                              field.onChange(value === "true")
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Activo</SelectItem>
                              <SelectItem value="false">Inactivo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
            </FieldGroup>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  reset();
                  setIsDialogOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin size-6" />
                ) : (
                  "Guardar"
                )}{" "}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Formulario;
