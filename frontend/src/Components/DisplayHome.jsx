import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";

const DisplayHome = () => {

  const {songsData,albumsData} = useContext(PlayerContext)

  
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-white">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-white">
          Today's biggest hits
        </h1>
        <div className="flex overflow-auto">
          {songsData.map((item, indexs) => (
            <SongItem
              key={indexs}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
