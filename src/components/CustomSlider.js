import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function ValueText(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 250000,
    label: '$250,000'
  },
  {
    value: 1500000,
    label: '$1.5 Mil'
  },
  {
    value: 3000000,
    label: '$3 Mil'
  },
];

const minDistance = 200000;

// nice job adapting this MUI component for your own use!
export default function CustomSlider({ setSignUpData, signUpData, low_price, high_price, setPriceRange, priceRange }) {
    
  const [value2, setValue2] = React.useState([0, 400000]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.max(newValue[0], 100000 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
    
    {if (setSignUpData){
      setSignUpData({
        ...signUpData,
        low_price: value2[0],
        high_price: value2[1]
      });} else if (setPriceRange){
      setPriceRange({
        ...priceRange, 
        low_price: value2[0],
        high_price: value2[1],
      });
    } }
  };

  React.useEffect(() => {
    if (low_price & high_price){
      setValue2([low_price, high_price]);
    }
  }, [high_price, low_price]);

  return (
    <Box sx={{ width: 300, display: 'flex' }}>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={ValueText}
        disableSwap
        min={0}
        max={3000000}
        step={50000}
        sx={{ color: '#40798c', marginLeft: '10px', padding: '10px', '& .MuiSlider-thumb': {
          borderRadius: '20px', border: '#40798c 3px solid', color: 'white'
        }, '& .MuiSlider-valueLabel' :{ fontSize: '25px', color: '#70a9a1', background: '#1f363d' }, '& .MuiSlider-marked' :{ color: '#70a9a1' }, 
        '& .MuiSlider-markLabel' :{ color: '#cfe0c3', paddingBottom: '10px', fontWeight: 'bolder' },
        '& .MuiSlider-rail' :{ color: '#40798c', height: '6px', opacity: '0.67' },
        '& .MuiSlider-track' :{ color: '#70a9a1', height: '6px', opacity: '0.67' }
        }}
        marks={marks}
      />
    </Box>
  );
}