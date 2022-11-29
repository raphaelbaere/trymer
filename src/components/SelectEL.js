import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Component } from 'react';

export default class SelectEL extends Component {

  render() {
    const { theme, handleChange } = this.props;
  return (
    <div className="select">
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Theme</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={theme}
          label="Theme"
          onChange={handleChange}
        >
          <MenuItem value={'default'}>Default</MenuItem>
          <MenuItem value={'black'}>Black</MenuItem>
          <MenuItem value={'pink'}>Pink</MenuItem>
          <MenuItem value={'blue'}>Blue</MenuItem>
          <MenuItem value={'purple'}>Purple</MenuItem>
          <MenuItem value={'red'}>Red</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </div>
    );
  }
}