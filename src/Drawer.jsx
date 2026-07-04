import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import image1 from '../src/assets/Group 61.png'
import { useTranslation } from 'react-i18next';

export default function BasicMenu() {
  const { t } = useTranslation();
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const categories = [
    'insulation',
    'sheetMaterial',
    'roofingDrainage',
    'fences',
    'constructionBlock',
    'dryMixProfiles',
    'membranes',
    'bitumen',
    'concreteCement',
    'metalFiberglass',
    'hardware1',
    'hardware2',
    'gardenYard',
    'pvcWindows',
    'heatedFloor',
    'lumber',
  ];

  return (
    <div>
      <Button
      color='black'
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
      >
        <Box sx={{display: "flex", gap : "15px", alignItems : "center" ,fontSize : "15px" , backgroundColor :"#167FFE" , padding : "10px 20px" , borderRadius : "5px" , color : "white"}}>
          <img src={image1} alt="" />
          {t('drawer.catalog')}
        </Box>
      </Button>

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        {categories.map((key, i) => (
          <MenuItem key={`${key}-${i}`} onClick={handleClose}>
            {t(`drawer.categories.${key}`)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
