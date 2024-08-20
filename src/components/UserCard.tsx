interface Props {
  image: string | null;
  name: string;
  username: string
  userId?: number
}

export default function UserCard({ username, image, name, userId }: Props) {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex-shrink-0">
        <img className="w-8 h-8 rounded-full" src={image ? image : `https://ui-avatars.com/api/?name=${name.charAt(0)}&background=random&bold=true`} alt={name} />
      </div>
      <div className="flex-auto min-w-0">
        <p className="text-sm font-medium truncate text-white">
          {name}
        </p>
        <p className="text-sm truncate text-gray-400">
          @{username}
        </p>
      </div>
      {userId && <div className="flex-shrink-0">
        <button className="text-white bg-blue-500 hover:bg-blue-600/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center items-center focus:ring-blue-600/55 w-full">
          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

        </button>
      </div>}
    </div>
  )
}