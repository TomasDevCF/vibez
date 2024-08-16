interface Props {
  type: "text" | "password" | "date" | "email"
  id: string
  disabled?: boolean
  value?: string
  placeholder: string
  children: React.ReactNode
}

export default function FormInput({ type, id, disabled, value, placeholder, children }: Props) {
  return (
    <div className="relative w-full">
      <div
        className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
      >
        {children}
      </div>
      <input
        required
        type={type}
        id={id}
        readOnly={disabled}
        value={value}
        name={id}
        minLength={id === "name" || id === "username" ? 5 : 0}
        maxLength={id === "name" || id === "username" ? 18 : 100}
        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 focus:bg-white/10 bg-white/10 border-white/20 placeholder-gray-400 text-gray-200 focus:outline-none disabled:bg-white/20 disabled:text-gray-400 disabled:placeholder-gray-400 read-only:bg-white/20 read-only:text-gray-400 read-only:placeholder-gray-400 autofill:bg-white/10"
        placeholder={placeholder}
      />
    </div>

  )
}