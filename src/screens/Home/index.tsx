/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageCard from "../../components/Card/ImageCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type User = {
  name: string;
  accessToken?: string;
};

type URLs = {
  full: string;
};

export type Image = {
  id: string;
  color: string;
  urls: URLs;
  user: User;
  alt_description: string;
};

const Home = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const filterImages = () => {
    if (query != "" && images.length > 0) {
      return images?.filter((image) =>
        image.user.name.toLowerCase().includes(query)
      );
    } else {
      return images;
    }
  };

  console.log(
    images?.filter((image) => image.user.name.toLowerCase().includes("m"))
  );

  let filteredImages: Image[] = filterImages();

  const getImages = () => {
    axios
      .get(
        `https://api.unsplash.com/photos?client_id=_mS8dwVZAKCzu0RDpKqeaxF1CA4Mao5PjI2HMULIGBc`,
        {}
      )
      .then((response) => {
        console.log(response);
        setImages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedImages = [...filteredImages];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedImage] = reorderedImages.splice(sourceIndex, 1);
      reorderedImages.splice(destinationIndex, 0, removedImage);

      return (filteredImages = reorderedImages);
    }

    // console.log(results);
  };

  const checkUser = () => {
    const user = localStorage.getItem('user')

    if (user) {
        navigate('/signin')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    checkUser()
    getImages();
  }, []);

  return (
    <div className="p-5 flex flex-col items-center space-y-4">
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-2">
            <p className="font-semibold underline underline-offset-4">
              {localStorage.getItem("user")}
            </p>
            <button
              onClick={handleLogout}
              className="bg-black h0ver:bg-gray-900 text-white font-medium p-1 rounded-md"
            >
              Log out
            </button>
          </div>
          <form className="w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="block w-full md:w-3/4 lg:w-1/2 mx-auto outline-none py-1 px-2 border-2 border-gray-500 rounded-md"
            />
          </form>
        </div>
        {loading ? (
          <div className="h-[80vh] flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mx-auto animate-spin"
              id="Outline"
              viewBox="0 0 24 24"
              fill="#000"
            >
              <path d="M12,2a10.032,10.032,0,0,1,7.122,3H16a1,1,0,0,0-1,1h0a1,1,0,0,0,1,1h4.143A1.858,1.858,0,0,0,22,5.143V1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1V3.078A11.981,11.981,0,0,0,.05,10.9a1.007,1.007,0,0,0,1,1.1h0a.982.982,0,0,0,.989-.878A10.014,10.014,0,0,1,12,2Z" />
              <path d="M22.951,12a.982.982,0,0,0-.989.878A9.986,9.986,0,0,1,4.878,19H8a1,1,0,0,0,1-1H9a1,1,0,0,0-1-1H3.857A1.856,1.856,0,0,0,2,18.857V23a1,1,0,0,0,1,1H3a1,1,0,0,0,1-1V20.922A11.981,11.981,0,0,0,23.95,13.1a1.007,1.007,0,0,0-1-1.1Z" />
            </svg>
          </div>
        ) : (
          <Droppable
            droppableId="Root"
            //   direction="horizontal"
            type="group"
            //   className="p-5 mx-auto grid grid-cols-3 gap-4"
          >
            {(provided: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredImages?.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided: any) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <ImageCard key={image.id} {...image} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
            {/* {images?.map((image) => (
          <ImageCard key={image.id} {...image} />
        ))} */}
          </Droppable>
        )}
      </DragDropContext>
    </div>
  );
};

export default Home;
