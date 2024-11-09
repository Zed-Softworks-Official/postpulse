'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

import { api, type RouterOutputs } from '~/trpc/react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { toast } from 'sonner'
import { Separator } from '../ui/separator'

const schema = z.object({
    tweet_url: z.string().url(),
    winner_count: z.number().min(1),
    must_follow: z.array(z.string())
})

type SchemaType = z.infer<typeof schema>

export default function TwitterForm() {
    const [generatedResult, setGeneratedResult] =
        useState<RouterOutputs['twitter']['generate']>(null)

    const mutation = api.twitter.generate.useMutation({
        onSuccess: (data) => {
            setGeneratedResult(data)

            toast.success('Generated successfully')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const form = useForm<SchemaType>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        defaultValues: {
            tweet_url: '',
            winner_count: 1,
            must_follow: []
        }
    })

    const handle_submit = async (data: SchemaType) => {
        console.log(data)
        mutation.mutate(data)
    }

    return (
        <div className="container mx-auto max-w-xl space-y-5">
            <DisplayGeneratedResult result={generatedResult} />
            <Form {...form}>
                <form
                    className="flex flex-col gap-5 w-full"
                    onSubmit={form.handleSubmit(handle_submit)}
                >
                    <FormField
                        control={form.control}
                        name="tweet_url"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel htmlFor={field.name}>
                                    Tweet URL
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter a tweet URL"
                                        className="w-full"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="winner_count"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel htmlFor={field.name}>
                                    Winner Count
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="5"
                                        className="w-full"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value) || 1
                                            )
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="must_follow"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel htmlFor={field.name}>
                                    Must Follow
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="@Jack @ZedSoftworks"
                                        className="w-full"
                                        value={field.value?.join(' ') || ''}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    .split(' ')
                                                    .filter(Boolean)
                                            )
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" size={'lg'}>
                            Generate
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

function DisplayGeneratedResult(props: {
    result: RouterOutputs['twitter']['generate']
}) {
    if (!props.result) return null

    return (
        <div>
            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre>{JSON.stringify(props.result, null, 2)}</pre>
                </CardContent>
            </Card>
        </div>
    )
}
