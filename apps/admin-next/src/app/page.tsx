import { Button } from '@workspace/ui/components/button'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Hello World</h1>
            <div className="flex gap-2">
              <Button>Button</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
