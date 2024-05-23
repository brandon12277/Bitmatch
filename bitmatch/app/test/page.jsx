"use client"

import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';



export const getCroppedImg = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
  
      image.onload = () => {
        const { x, y, width, height } = croppedAreaPixels;
  
        canvas.width = width;
        canvas.height = height;
  
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
  
        // Get the base64-encoded data URL of the cropped image
        const base64Image = canvas.toDataURL('image/jpeg');
  
        resolve(base64Image);
      };
  
      image.onerror = (error) => {
        reject(error);
      };
  
      image.src = imageSrc;
    });
  };
  

function ImageCropper() {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // State to store cropped area pixels
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async () => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels); // Pass cropped area pixels to utility function
      console.log(croppedImg)
      setCroppedImage(croppedImg);
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} ref={inputRef} />
      {image && (
        <>
          <div style={{ position: 'relative', width: '300px', height: '300px' }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropperProps={{ cropSize: { width:"400px", height: "400px" } }}
            />
          </div>
          <button onClick={handleCropImage}>Crop Image</button>
        </>
      )}
      {croppedImage && (
        <div>
          <img style={{width:"400px",height:"400px"}} src={croppedImage} alt="Cropped" />
        </div>
      )}
    </div>
  );
}

export default ImageCropper;
