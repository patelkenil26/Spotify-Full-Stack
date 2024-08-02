import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgColor = req.body.bgColor;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };

    const album = albumModel(albumData);
    await album.save();

    return res.status(200).json({
      success: true,
      message: "albumData uploaded",

    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "albumData not added",
    });
  }
};

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.status(200).json({
            success:true,
            albums:allAlbums
        });
    } catch (error) {
        res.status(500).json({success:false});
    }
};

const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id)
        res.status(200).json({
            success:true,
            message:"Album removed"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Album not removed"
        })
    }
};

export { addAlbum, listAlbum, removeAlbum };
