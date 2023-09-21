import { Image } from "../../screens/Home"

const ImageCard = ({alt_description, urls, user}: Image) => {
  return (
    <div className="bg-white p-3 rounded-md shadow-lg hover:shadow-xl flex flex-col items-center space-y-4">
        <img src={urls.full} alt={alt_description} className="w-64 h-72 object-cover" />
        <p className="font-semibold">{user.name}</p>
    </div>
  )
}

export default ImageCard