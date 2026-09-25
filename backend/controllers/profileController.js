const crypto = require("crypto");
const pool = require("../db/db");
const cloudinary = require("../config/cloudinary");

async function uploadProfilePicture(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: { message: "Profile picture is required" },
      });
    }

    const userResult = await pool.query(
      `SELECT id, profile_picture_url, profile_picture_public_id
       FROM users
       WHERE id = $1`,
      [req.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        error: { message: "User not found" },
      });
    }

    const oldPicturePublicId =
      userResult.rows[0].profile_picture_public_id;

    const publicId =
      `studyroute/profiles/user_${req.userId}_${crypto.randomUUID()}`;

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          resource_type: "image",
          transformation: [
            {
              width: 500,
              height: 500,
              crop: "fill",
              gravity: "face",
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    await pool.query(
      `UPDATE users
       SET profile_picture_url = $1,
           profile_picture_public_id = $2,
           updated_at = NOW()
       WHERE id = $3`,
      [
        uploadResult.secure_url,
        uploadResult.public_id,
        req.userId,
      ]
    );

    if (oldPicturePublicId) {
      try {
        await cloudinary.uploader.destroy(oldPicturePublicId);
      } catch (cleanupError) {
        console.error(
          "Old profile picture cleanup error:",
          cleanupError
        );
      }
    }

    return res.json({
      message: "Profile picture updated successfully",
      profilePicture: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Profile picture upload error:", error);

    return res.status(500).json({
      error: { message: "Unable to upload profile picture" },
    });
  }
}

module.exports = {
  uploadProfilePicture,
};
