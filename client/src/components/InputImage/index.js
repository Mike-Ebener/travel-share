import React from 'react';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';

const InputImage = (props) => {
    if (props.uploading) {
        return(
            <div>
                <i className = ""></i>
                <button className="btn btn-sending mt-3">Sending</button>
            </div>
        );
    } else if (props.image) {
        return(
            <div>
                <DropZone
                multiple={false}
                accept="image/png image/url image/png image/jpeg"
                onDrop = {props.onDrop}>
                    <p> Drop an Image or select from a folder</p>
                    
                </DropZone>
                <button className = "btn btn-send mt-3" 
                Onclick = {props.onSend}> Send Image </button>
            </div>
        )
    }
};

InputImage.propTypes = {
    image: PropTypes.object,
    uploading: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
    onSned: PropTypes.func.isRequired,
};

InputImage.defaultProps = {
    uploading: false,
};

export default InputImage;