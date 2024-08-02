import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import albumModel from "../models/albumModel.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    // console.log(name, desc, album, audioUpload, imageUpload);
    const songData = await songModel.create({
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    });
    // const song = songModel(songData);
    // await song.save();

    return res
      .status(200)
      .json({ success: true, message: "Song Added", data: songData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Can not add data into databse" });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.status(200).json({
      success:true,
      message:"All Song mil gaye hai",
      songs:allSongs,
    })
  } catch (error) {
     res.status(500).json({
      success:false,
      message:"All Song nahi mil rahe hai",
    });
  }
}

const removeSong = async(req,res)=>{
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success:true,
      message:"Song Removed"
    });
  } catch (error) {
    res.status(400).json({
      success:false,
      message:"Can not remove Song"
    })
  }
}

export { addSong, listSong,removeSong };
