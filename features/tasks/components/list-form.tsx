import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertListSchema } from "@/db/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = insertListSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};

export const ListForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Nome
                        </FormLabel>
                        <FormControl>
                            <Input 
                            disabled={disabled} 
                            placeholder="ex. Dia, Evento, Intervalo de Tempo" 
                            {...field} />
                        </FormControl>
                    </FormItem>
                )} />
                <Button className="w-full" disabled={disabled} >
                    {id ? "Save changes" : "Criar lista"}
                </Button>
                {!!id && (
                    <Button 
                    type="button" 
                    disabled={disabled} 
                    onClick={handleDelete} 
                    className="w-full" 
                    variant={"outline"}>
                        <Trash className="size-4 mr-2" />
                        Deletar lista
                    </Button>
                )
                }
            </form>
        </Form>
    )
}
