import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import saphireCityIcon from './images/saphire-city-icon.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default class MediaControlCard extends React.Component {
  render() {
    const { audioControl, onAudioPlayButton, onAudioStopButton } = this.props;
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Saphire City
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Leonel Cassio
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="play/pause">
            { audioControl ? <PlayArrowIcon onClick={onAudioPlayButton} sx={{ height: 38, width: 38 }} /> : <PauseIcon onClick={onAudioStopButton} sx={{ height: 38, width: 38 }} />}
          </IconButton>
          <IconButton aria-label="next">
            <SkipNextIcon />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, pl: 8.5, pb: 2 }}
        image={saphireCityIcon}
        alt="Live from space album cover"
      />
    </Card>
  );
 }
}