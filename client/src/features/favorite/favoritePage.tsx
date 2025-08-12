import { Grid2, Typography } from "@mui/material";
import { useFetchFavoriteQuery } from "./favoriteApi";
import FavoritePropertyPage from "./FavoritePropertyPage";

export default function FavoritePage() {
     const {data, isLoading} = useFetchFavoriteQuery();
    
        if (isLoading) return <Typography>Loading favorites...</Typography>
    
        if (!data || data.favoriteItems.length === 0) return <Typography variant="h3">You have no favoritye Property</Typography>
    

  return (
      <Grid2 container spacing={2}>
            <Grid2 size={8}>
                {data.favoriteItems.map(item => (
                    <FavoritePropertyPage favoriteItem={item} key={item.propertyId} />
                ))}
            </Grid2>
            
        </Grid2>
  )
}