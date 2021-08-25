import REACT from 'react';
import CustomInput from "./Input.component/Input.jsx.js";

const ImageUpload = () => {
  reutrn(
    <form>
      <CustomInput
        type='file'
        name='file'
        accept='image/*'
        onChange={handleFileChange}
        placeholder='upload image'
        isRequired={true}
      />
    </form>
  );
};

export default ImageUpload;