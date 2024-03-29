
type NavProps = {
  avatar: string;
  name: string;
}

export const Nav: React.FC<NavProps> = ({ name, avatar }) => {
  return (
    <div className="flex w-full items-center justify-between mt-8 border-b-[1px] border-[#ffffff20] pb-4">
      <p className="font-[600]">Counsellor GPT</p>
      <span className="flex gap-[8px] items-center text-[15px]">{name} <img src={avatar} className="h-[30px] rounded-full" /></span>
    </div>
  )
}
