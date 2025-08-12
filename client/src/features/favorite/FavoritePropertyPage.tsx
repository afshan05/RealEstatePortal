import { Box,  IconButton, Paper, Typography } from "@mui/material";
import {  useRemoveFromFavoriteMutation } from "./favoriteApi";
import { currencyFormat } from "../../lib/util";
import {  Close } from "@mui/icons-material";
import type { FavoriteItem } from "../../app/models/favorite";

type Props = {
    favoriteItem: FavoriteItem
}

export default function FavoritePropertyPage({favoriteItem}:Props) {

     const [removeFromFrovite] = useRemoveFromFavoriteMutation();
       

  return (
    <Paper sx={{
            height: 140,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
        }}>
            <Box display='flex' alignItems='center'>
                <Box
                    component='img'
                    src={favoriteItem.imageUrl}
                    alt={favoriteItem.title}
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '4px',
                        mr: 8,
                        ml: 4
                    }}
                />

                <Box display='flex' flexDirection='column' gap={1}>
                    <Typography variant="h6">{favoriteItem.title}</Typography>

                    <Box display='flex' alignItems='center' gap={3}>
                      
                        <Typography sx={{fontSize: '1.1rem'}} color='primary'>
                            {currencyFormat(favoriteItem.price )}
                        </Typography>
                    </Box>

                   
                </Box>
            </Box>
            <IconButton
                onClick={() => removeFromFrovite({propertyId: favoriteItem.propertyId})}
                color='error'
                size="small" 
                sx={{
                    border: 1, 
                    borderRadius: 1, 
                    minWidth: 0, 
                    alignSelf: 'start',
                    mr: 1,
                    mt: 1
                }}
            >
                <Close />
            </IconButton>
        </Paper>
  )
}