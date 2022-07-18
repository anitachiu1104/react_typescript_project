import { styled, ToggleButtonGroup } from '@mui/material';

const DetachedToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    marginRight: theme.spacing(2),
    border: 0,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    textTransform: 'unset',
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:last-of-type': {
      marginRight: 0,
    },
  },
}));

export default DetachedToggleButtonGroup;
