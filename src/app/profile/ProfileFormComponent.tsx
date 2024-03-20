"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateProfile } from "./actions";
import { profileFormSchema } from "./profileSchema";

export function ProfileForm({ user }: { user: User }) {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const res = await updateProfile(values);
    if (res.error.length > 0) {
      toast.error(res.error.map((e) => e.message).join("\n"));
    } else {
      toast.success("Profil erfolgreich aktualisiert.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First and Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="First and Last Name"
                  {...field}
                  value={field.value!}
                />
              </FormControl>
              <FormDescription>First and Last Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
