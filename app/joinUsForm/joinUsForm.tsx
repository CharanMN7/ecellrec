"use client";

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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const joinUsFormSchema = z.object({
    name: z
        .string({ required_error: "Name is required." })
        .min(3, { message: "Name must be at least 3 characters." }),
    rollNumber: z
        .string({ required_error: "Roll number is required." })
        .min(5, { message: "Roll number must be at least 5 characters." }),
    branch: z
        .string({ required_error: "Branch is required." }) 
        .min(2, { message: "Branch must be at least 2 characters." }),
    college: z
        .string({ required_error: "College name is required." })
        .min(3, { message: "College name must be at least 3 characters." }),
    yearOfStudy: z.enum(["Select Year","1st Year", "2nd Year", "3rd Year", "4th Year"], {
        required_error: "Year of study is required.",
    }),
    email: z
        .string({ required_error: "Email is required." })
        .email({ message: "Invalid email address." }),
    reasonForJoining: z
        .string()
        .max(200, { message: "Reason must not exceed 200 characters." })
        .min(10, { message: "Reason must be at least 10 characters." }),
});

const defaultValues: JoinUsFormValues = {
    name: "",
    rollNumber: "",
    branch: "",
    college: "",
    yearOfStudy: "Select Year",
    email: "",
    reasonForJoining: "",
};

type JoinUsFormValues = z.infer<typeof joinUsFormSchema>;

const JoinUsForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<JoinUsFormValues>({
        resolver: zodResolver(joinUsFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const onSubmit = async (data: JoinUsFormValues) => {
        console.log(data);
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/joinUsForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data, null, 2),
            });

            const result = await response.json();
            if (result.success) {
                router.push("/joinUsForm/result");
            } else {
                console.error("Error submitting form:", result.error);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="border-zinc-300" />
                            </FormControl>
                            <FormDescription>
                                Please enter your full name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} className="border-zinc-300" />
                            </FormControl>
                            <FormDescription>
                                Please enter your email address.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rollNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Roll Number</FormLabel>
                            <FormControl>
                                <Input {...field} className="border-zinc-300" />
                            </FormControl>
                            <FormDescription>
                                Please enter your roll number.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Branch</FormLabel>
                            <FormControl>
                                <Input {...field} className="border-zinc-300" />
                            </FormControl>
                            <FormDescription>
                                Please enter your branch of study.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>College</FormLabel>
                            <FormControl>
                                <Input {...field} className="border-zinc-300" />
                            </FormControl>
                            <FormDescription>
                                Please enter your college name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="yearOfStudy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year of Study</FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="border-zinc-300 w-full p-2 rounded-md outline-dashed"
                                >
                                    <option value="">Select Year</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </select>
                            </FormControl>
                            <FormDescription>
                                Please select your current year of study.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reasonForJoining"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reason for Joining</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className="border-zinc-300"
                                    placeholder="Why do you want to join the club?"
                                />
                            </FormControl>
                            <FormDescription>
                                Please share your reason for joining the club.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Submitting..." : "Join Us"}
                </Button>
            </form>
        </Form>
    );
};

export default JoinUsForm;
