import React, { useContext, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import Display from "./Components/Display";
import { PlayerContext } from "./Context/PlayerContext";
// import generatePlaylist from "./util";
// import WebcamCapture from "./Components/WebcamCapture";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  // const [emotion, setEmotion] = useState("");

  // const generatePlaylist = (emotion) => {
  //   // Logic to generate a playlist based on the detected emotion
  //   // This could involve calling another API or selecting songs from your database
  //   console.log(`Generating playlist for emotion: ${emotion}`);
  // };

  return (
    <div className="h-screen bg-black">
      {/* <div>
        <h1>Mood-Based Playlists</h1>
        <WebcamCapture setEmotion={setEmotion} />
        {emotion && (
          <div>
            <h2>Detected Emotion: {emotion}</h2>
            <button onClick={() => generatePlaylist(emotion)}>
              Generate Playlist
            </button>
          </div>
        )}
      </div> */}

      {songsData.length !== 0 ? 
        <>
          <div className=" h-[90%] flex">
            <Sidebar></Sidebar>
            <Display />
          </div>
          <Player />
        </>
       : null}

      <audio ref={audioRef} src={track ? track.file : ""} preload="auto"></audio>
    </div>
  );
};

export default App;
