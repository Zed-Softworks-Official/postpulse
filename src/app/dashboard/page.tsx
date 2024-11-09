import TwitterForm from '~/components/forms/twitter-form'

export default function GeneratePage() {
    return (
        <div className="px-5 w-full flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl font-bold">Generate</h1>

            <TwitterForm />
        </div>
    )
}
