import { signIn } from "@/lib/auth"

export default function Page() {

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-[1px] border-[#ffffff10] p-8 rounded-[12px]">
        <p className="font-[700] text-[24px]">Login</p>
        <form action={async () => {
          "use server"
          await signIn("google")
        }}>
          <button className="w-[340px] mt-[36px] rounded-[8px] bg-[#ffffff20] py-[18px] text-[15px] font-[500] flex items-center  gap-[50px] px-[18px]"><GoogleIcon />Continue with Google</button>
        </form>
      </div>
    </div>
  )
}

const GoogleIcon = () => {
  return <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M15.5475 8.30327C14.6407 7.49361 13.4329 7 12.1089 7C9.28696 7 7 9.23899 7 12C7 14.761 9.28696 17 12.1089 17C15.5781 17 16.86 14.4296 17 12.4167H12.841" stroke="#fff" stroke-width="1.5"></path><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
}
