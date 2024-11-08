import Form from 'next/form'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function GeneratePage() {
    return (
        <div className="container mx-auto px-5 flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Generate</h1>
            <Form action={''}>
                <div className="flex flex-col gap-2">
                    <Label>Label</Label>
                    <Input type="text" placeholder="Enter a prompt" />
                </div>
            </Form>
        </div>
    )
}
