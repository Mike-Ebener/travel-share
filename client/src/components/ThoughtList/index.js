import React from 'react';
import { Link } from 'react-router-dom';
import InputImage from '../InputImage'
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
 

const ThoughtList = ({ thoughts, title }) => {
    if (!thoughts.length) {
        return <h3>Nothing Shared Yer</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {thoughts &&
                thoughts.map(thought => (
                    <div key={thought._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/profile/${thought.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                <div style={{
      display: 'flex',
      margin: 'auto',
      width: 400,
      flexWrap: 'wrap',
    }}>
      <div style={{ width: '100%', float: 'left' }}>
        <h3>WILL THE BUTTON WORK</h3> <br />
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <h3>  OR  </h3>
      <input accept="image/*" id="icon-button-file"
        type="file" style={{ display: 'none' }} />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture"
        component="span">
          <PhotoCamera />
        </IconButton>
        </label>
            </div>              
              {thought.username}
                            </Link>{' '}
                            thought on {thought.createdAt}
                        </p>
                        <div className="card-body">
  <Link to={`/thought/${thought._id}`}>
    <p>{thought.thoughtText}</p>
    <p className="mb-0">
      Reactions: {thought.reactionCount} || Click to{' '}
      {thought.reactionCount ? 'see' : 'start'} the discussion!
    </p>
  </Link>
</div>
                    </div>
                ))}
        </div>
    );
};

export default ThoughtList;